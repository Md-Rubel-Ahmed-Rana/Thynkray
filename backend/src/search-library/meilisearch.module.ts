import { Module } from "@nestjs/common";
import { MeiliSearchService } from "./meilisearch.service";
import { MeilisearchController } from "./meilisearch.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [MeilisearchController],
    providers: [MeiliSearchService, PrismaService]
})


export class MeilisearchModule {}