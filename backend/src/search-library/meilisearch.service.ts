import { MeiliSearchClient } from "src/config/meilisearch";
import { MeiliSearchDto } from "./meilisearch.dto";
import { OnEvent } from "@nestjs/event-emitter";
import { PrismaService } from "src/prisma/prisma.service";
import { GetPostDto } from "src/post/dto/get-post.dto";
import { PinoLogger } from "src/common/logger/pino-logger.service";

export class MeiliSearchService {
  private index: any;

  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: PinoLogger
  ) {
    this.index = MeiliSearchClient.index("thynkray-blogs");
  }

  async configureIndex(): Promise<{ statusCode: number; message: string }> {
    try {
      await this.index.updateSearchableAttributes([
        "titles",
        "content",
        "tags",
        "author",
        "category",
        "published",
      ]);
      await this.index.updateFilterableAttributes([
        "author",
        "tags",
        "published",
        "category",
      ]);
      return {
        statusCode: 201,
        message: "MeiliSearch index configured successfully.",
      };
    } catch (error: any) {
      this.logger.error(
        `Error configuring MeiliSearch index. Error:${error?.message}`
      );
    }
  }

  async addAllPostsOnMeilisearch(): Promise<{
    statusCode: number;
    message: string;
    response: any;
  }> {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          author: true,
          content: true,
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });
      const postDtos = GetPostDto.fromEntities(posts);
      const documents = postDtos
        .map((post) => {
          try {
            return MeiliSearchDto.fromPost(post);
          } catch (e: any) {
            this.logger.warn(`Skipping post due to error: ${e?.message}`);
            return null;
          }
        })
        .filter(Boolean);

      const response = await this.index.addDocuments(documents);
      return {
        statusCode: 200,
        message: "Documents added to MeiliSearch",
        response,
      };
    } catch (error: any) {
      this.logger.error(
        `Error adding full documents to MeiliSearch. Error: ${error?.message}`
      );
    }
  }

  async search(
    searchText: string,
    filters: string[] = []
  ): Promise<{ statusCode: number; message: string; data: any[] }> {
    try {
      const response = await this.index.search(searchText, {
        filter: filters,
        attributesToHighlight: ["title", "titles", "description", "content"],
        attributesToRetrieve: [
          "id",
          "thumbnail",
          "title",
          "slug",
          "description",
          "tags",
          "author",
          "category",
          "published",
        ],
      });

      if (response?.hits?.length) {
        return {
          message: "Posts retrieved successfully from Meilisearch!",
          statusCode: 200,
          data: response.hits,
        };
      }

      this.logger.warn(
        "No results from Meilisearch. Falling back to Prisma DB search."
      );
      const fallbackResults = await this.prismaFallbackSearch(
        searchText,
        filters
      );
      return {
        message: "Posts retrieved from DB fallback.",
        statusCode: 200,
        data: fallbackResults,
      };
    } catch (error: any) {
      this.logger.error(
        `Error searching in Meilisearch. Error: ${error?.message}`
      );
      // Fallback if Meilisearch fails
      const fallbackResults = await this.prismaFallbackSearch(
        searchText,
        filters
      );
      return {
        message: "Posts retrieved from DB fallback after Meilisearch error.",
        statusCode: 200,
        data: fallbackResults,
      };
    }
  }

  async getAllPosts(): Promise<{
    statusCode: number;
    message: string;
    data: GetPostDto[];
  }> {
    const posts = await this.index.getDocuments({ limit: 10000 });
    return {
      statusCode: 200,
      message: "All the posts retrieved from meilisearch",
      data: posts?.results,
    };
  }

  async updatePosts(posts: any[]) {
    const postDtos = GetPostDto.fromEntities(posts);
    const documents = postDtos.map((post) => MeiliSearchDto.fromPost(post));
    return this.index.addDocuments(documents);
  }

  async deletePosts(ids: string[]) {
    return this.index.deleteDocuments(ids);
  }

  async deleteFullDocuments() {
    const response = await this.index.deleteAllDocuments();
    return {
      statusCode: 200,
      message: "All the documents deleted from meilisearch",
      data: response,
    };
  }

  private async prismaFallbackSearch(
    searchText: string,
    filters: string[]
  ): Promise<MeiliSearchDto[]> {
    const whereClause: any = {
      OR: [
        { title: { contains: searchText, mode: "insensitive" } },
        { description: { contains: searchText, mode: "insensitive" } },
        { content: { contains: searchText, mode: "insensitive" } },
      ],
    };

    if (filters.length > 0) {
      whereClause.AND = filters.map((f) => ({
        tags: {
          has: f,
        },
      }));
    }

    const posts = await this.prisma.post.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        tags: true,
        author: true,
        category: true,
        createdAt: true,
        thumbnail: true,
      },
    });
    const postDtos = GetPostDto.fromEntities(posts);
    const documents = postDtos
      .map((post) => {
        try {
          return MeiliSearchDto.fromPost(post);
        } catch (e: any) {
          this.logger.warn(`Skipping post due to error: ${e?.message}`);
          return null;
        }
      })
      .filter(Boolean);

    return documents;
  }

  @OnEvent("post.created")
  async postCreatedEvent(newPost: GetPostDto) {
    const response = await this.index.addDocuments([newPost]);
    console.log({
      message: "New post added to MeiliSearch",
      data: newPost,
      response,
    });
  }

  @OnEvent("post.updated")
  async postUpdatedEvent(updatedPost: any) {
    delete updatedPost?._old;
    const response = await this.index.updateDocuments([updatedPost]);
    console.log({
      message: "Post updated to MeiliSearch",
      data: updatedPost,
      response,
    });
  }

  @OnEvent("post.deleted")
  async postDeletedEvent(id: string) {
    const response = this.index.deleteDocument(id);
    console.log({
      message: "Post deleted from MeiliSearch",
      data: { id },
      response,
    });
  }
}
