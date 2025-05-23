import { Controller, Get } from "@nestjs/common";
import { RedisCacheService } from "./cache.service";
import { ApiExcludeController } from "@nestjs/swagger";

@ApiExcludeController()
@Controller("cache")
export class CacheController {
    constructor(private readonly cacheService: RedisCacheService){}

    @Get("delete-all")
    async deleteAllPosts(){
        return this.cacheService.deleteAllPosts()
    }
    
    @Get("set-all")
    async setAllPosts(){
        return this.cacheService.setAllPosts()
    }
}