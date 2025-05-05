import { MeiliSearchClient } from "src/config/meilisearch";
import { MeiliSearchDto } from "./meilisearch.dto";


class MeiliSearchService {
  private index: any;

  constructor() {
    this.index = MeiliSearchClient.index('thynkray-blogs');
  }

   async configureIndex(): Promise<void> {
    try {
      await this.index.updateSearchableAttributes(["titles" ,"content", "tags", "author", "category", "published"]);
      await this.index.updateFilterableAttributes(["author", "tags", "published", "category"]);
      console.log("MeiliSearch index configured successfully.");
    } catch (error) {
      console.error("Error configuring MeiliSearch index:", error);
      throw error;
    }
  }

  async addBlogsToMeiliSearch(blogs: any[] = []): Promise<void> {

    try {
        const blogDtos = blogs.map((blog) => {
            return MeiliSearchDto.fromPost(blog);
        })
        console.log({blogs, blogDtos});
      const response = await this.index.addDocuments(blogDtos);
      console.log({
        message: "Documents added to MeiliSearch",
        response
      });
    } catch (error) {
      console.error('Error adding documents to MeiliSearch:', error);
      throw error;
    }
  }

  async search(searchText: string, filters: string[] = []): Promise<any> {
    try {
      const response = await this.index.search(searchText, {
        filter: filters,
        attributesToHighlight: ['title', "titles", "description", 'content'],
        attributesToRetrieve: ['id', 'title', 'description', 'tags', 'author', 'category', 'published'],
      });
      return response;
    } catch (error) {
      console.error('Error searching in MeiliSearch:', error);
      throw error;
    }
  }

  async deleteBlogFromMeiliSearch(id: string): Promise<void> {
    try {
      const response = await this.index.deleteDocuments([id]);
      console.log({
        message: "Documents deleted from MeiliSearch",
        response
      });
    } catch (error) {
      console.error('Error deleting documents from MeiliSearch:', error);
      throw error;
    }
  }
}

export const meiliSearchService = new MeiliSearchService();
