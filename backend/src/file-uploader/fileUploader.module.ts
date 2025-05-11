import { Module } from "@nestjs/common";
import { GoogleDriveService } from "./google.drive.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [GoogleDriveService,  PrismaService],
  exports: [GoogleDriveService],
})
export class FileUploaderModule {}
