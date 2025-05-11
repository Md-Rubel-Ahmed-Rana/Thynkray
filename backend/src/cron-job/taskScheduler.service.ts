import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RedisCacheService } from 'src/cache/cache.service';
import { PinoLogger } from 'src/common/logger/pino-logger.service';
import { GetPostDto } from 'src/post/dto/get-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MeiliSearchService } from 'src/search-library/meilisearch.service';

@Injectable()
export class TasksService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: RedisCacheService,
    private readonly meilisearchService: MeiliSearchService,
    private readonly logger: PinoLogger,
  ) {}

  // run the cron job at every 5 minutes to keep data consistence
  @Cron('0 */5 * * * *')
  async keepDbCacheMeilisearchDataConsistence() {
    const postsFromDbRaw = await this.prisma.post.findMany({
      include: {
        author: true,
        content: true,
         _count: {
          select: {
            comments: true
          }
         }
      },
    });
    const postsFromDb = GetPostDto.fromEntities(postsFromDbRaw)
    const postsFromCache = (await this.cacheService.get('posts') || []) as GetPostDto[]
    const postsFromMeilisearch = (await this.meilisearchService.getAllPosts()).data

    console.log({
      from :"Cron job service",
      message: "Data retrieved from 3 resources",
      actionFiredAt: new Date().toLocaleString(),
      data: {
        db: {total: postsFromDb?.length, ids: postsFromDb.map((post) => post?.id)},
        cache: {total: postsFromCache?.length, ids: postsFromCache.map((post) => post?.id)},
        search: {total: postsFromMeilisearch?.length, ids: postsFromMeilisearch.map((post) => post?.id)}
      }
    })

    await this.ensureConsistency(postsFromDb, postsFromCache, postsFromMeilisearch);

    this.logger.log('Cron job ran to check consistency');
  }

  // refresh full posts data on cache and meilisearch at every 1 hour
  @Cron('0 0 * * * *') 
  async refreshHotPostsInCacheAndSearch() {
    console.log({
      from: "Cron job service",
      message: "Refreshing full posts data on cache and meilisearch"
    });
    await this.cacheService.setAllPosts();
    await this.meilisearchService.deleteFullDocuments()
    await this.meilisearchService.addAllPostsOnMeilisearch()
  }

  private async ensureConsistency(
    dbPosts: any[],
    cachePosts: any[],
    searchPosts: any[],
  ) {
    const dbMap = new Map(dbPosts.map(post => [post.id, post]));
    const cacheMap = new Map(cachePosts.map(post => [post.id, post]));
    const searchMap = new Map(searchPosts.map(post => [post.id, post]));

    const inconsistentCachePosts: any[] = [];
    const inconsistentSearchPosts: any[] = [];

    // Check for inconsistencies in cache and MeiliSearch
    for (const [id, dbPost] of dbMap.entries()) {

      if (!cacheMap.has(id)) {
        inconsistentCachePosts.push(dbPost);
        this.logger.debug(`Post ${id} missing in Redis cache`);
      }
    
      if (!searchMap.has(id)) {
        inconsistentSearchPosts.push(dbPost);
        this.logger.debug(`Post ${id} missing in Meilisearch`);
      }
    }

    // Fix cache inconsistency
    if (inconsistentCachePosts.length > 0) {
      await this.cacheService.set('posts', dbPosts);
      this.logger.warn(`Fixed Redis cache inconsistency with ${inconsistentCachePosts.length} posts`);
    }

    // Fix MeiliSearch inconsistency
    if (inconsistentSearchPosts.length > 0) {
      await this.meilisearchService.updatePosts(inconsistentSearchPosts);
      this.logger.warn(`Fixed MeiliSearch inconsistency with ${inconsistentSearchPosts.length} posts`);
    }

    // remove unused data from cache and meilisearch
    const staleCache = cachePosts.filter(post => !dbMap.has(post.id));
    const staleSearch = searchPosts.filter(post => !dbMap.has(post.id));

    if (staleCache.length > 0) {
      await this.cacheService.set('posts', dbPosts);
      this.logger.warn(`Removed ${staleCache.length} stale cache posts`);
    }

    if (staleSearch.length > 0) {
      const staleIds = staleSearch.map(p => p.id);
      await this.meilisearchService.deletePosts(staleIds);
      this.logger.warn(`Removed ${staleSearch.length} stale MeiliSearch posts`);
      
    }
  }
}
