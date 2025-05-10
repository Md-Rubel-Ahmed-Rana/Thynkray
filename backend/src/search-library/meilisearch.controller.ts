import { Controller, Get, Query } from "@nestjs/common";
import { MeiliSearchService } from "./meilisearch.service";
import { SkipThrottle } from "@nestjs/throttler";
import { buildMeiliSearchFilters } from "src/utility/parseFiltersQuery";

@Controller("meilisearch")
export class MeilisearchController {
    constructor(private readonly meilisearchService: MeiliSearchService){}

    @Get("configure/index/posts")
    async configureIndex(){
        return this.meilisearchService.configureIndex()
    }

    @Get("add/posts")
    async addAllPostsOnMeilisearch(){
        return this.meilisearchService.addAllPostsOnMeilisearch()
    }

    @SkipThrottle()
    @Get("/posts/search")
    search(@Query("q") q: string, @Query("filters") filters: string) {
    const parsedFilters = buildMeiliSearchFilters(filters);
    return this.meilisearchService.search(q, parsedFilters);
    }
}