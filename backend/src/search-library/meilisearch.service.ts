import { MeiliSearchClient } from "src/config/meilisearch";
import { MeiliSearchDto } from "./meilisearch.dto";
import { OnEvent } from "@nestjs/event-emitter";
import { PrismaService } from "src/prisma/prisma.service";
import { GetPostDto } from "src/post/dto/get-post.dto";


export class MeiliSearchService {
  private index: any;

  constructor(private readonly prisma: PrismaService) {
    this.index = MeiliSearchClient.index('thynkray-blogs')
  }

  async configureIndex(): Promise<{statusCode: number, message: string}> {
    try {
      await this.index.updateSearchableAttributes(["titles" ,"content", "tags", "author", "category", "published"]);
      await this.index.updateFilterableAttributes(["author", "tags", "published", "category"]);
      return {
        statusCode: 201,
        message: "MeiliSearch index configured successfully.",
      }
    } catch (error) {
      console.error("Error configuring MeiliSearch index:", error);
      throw error;
    }
  }

  async addAllPostsOnMeilisearch(): Promise<{statusCode: number, message: string, response: any}> {
    try {
        const posts =  await this.prisma.post.findMany({
           include: {
            author: true,
            content: true,
            _count: {
              select: {
                comments: true
              }
             }
          }
        })
        const postDtos = GetPostDto.fromEntities(posts)
        const documents = postDtos.map((post) => MeiliSearchDto.fromPost(post))
        const response = await this.index.addDocuments(documents);
        return {
          statusCode: 200,
          message: "Documents added to MeiliSearch",
          response
        }
    } catch (error) {
      console.error('Error adding full documents to MeiliSearch:', error);
    }
  }

  async search(searchText: string, filters: string[] = []): Promise<{statusCode: number, message: string, data: any}> {
    try {
      const response = await this.index.search(searchText, {
        filter: filters,
        attributesToHighlight: ['title', "titles", "description", 'content'],
        attributesToRetrieve: ['id', "thumbnail", 'title', "slug", 'description', 'tags', 'author', 'category', 'published'],
      });
      return {
      message: 'Posts retrieved successfully!',
      statusCode: 200,
      data: response?.hits
    }
    } catch (error) {
      console.error('Error searching in MeiliSearch:', error);
    }
  }

  async getAllPosts(): Promise<{statusCode: number, message: string ,data: GetPostDto[]}>{
    const posts = await this.index.getDocuments({ limit: 10000 })
    return {
      statusCode: 200,
      message: "All the posts retrieved from meilisearch",
      data: posts?.results
    }
  }

  async updatePosts(posts: any[]) {
    const postDtos = GetPostDto.fromEntities(posts)
    const documents = postDtos.map((post) => MeiliSearchDto.fromPost(post))
    return this.index.addDocuments(documents);
  }
  
  async deletePosts(ids: string[]) {
    return this.index.deleteDocuments(ids);
  }

  async deleteFullDocuments(){
    const response = await this.index.deleteAllDocuments()
    return {
      statusCode: 200,
      message: "All the documents deleted from meilisearch",
      data: response
    }
  }


  @OnEvent('post.created')
  async postCreatedEvent(newPost: GetPostDto){
    const response = await this.index.addDocuments([newPost]);
      console.log({
        message: "New post added to MeiliSearch",
        data: newPost,
        response
      });
  }

  @OnEvent('post.updated')
  async postUpdatedEvent(updatedPost: GetPostDto){
     const response = await this.index.updateDocuments([updatedPost]);
      console.log({
        message: "Post updated to MeiliSearch",
        data: updatedPost,
        response
      });
  }

  @OnEvent('post.deleted')
  async postDeletedEvent(id: string){
    const response = this.index.deleteDocument(id)
      console.log({
        message: "Post deleted from MeiliSearch",
        data: {id},
        response
      });
  }
}

