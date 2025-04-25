import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { GoogleDriveService } from 'src/file-uploader/google.drive.service';

@Injectable()
export class ManipulatePostMiddleware implements NestMiddleware {
  constructor(private readonly googleDriveService: GoogleDriveService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[];

    try {
      if (typeof req.body.tags === 'string') {
        req.body.tags = JSON.parse(JSON.stringify(req?.body?.tags));
      }
    } catch {
      req.body.tags = [];
    }

    let content = [];
    try {
      content = typeof req.body?.content === 'string' ? JSON.parse(JSON.stringify(req?.body?.content)) : req.body.content || [];
    } catch {
      content = [];
    }

    const thumbnailFile = files.find(file => file.fieldname === 'thumbnail');
    if (thumbnailFile) {
      const url = await this.googleDriveService.uploadSingleFile(thumbnailFile);
      req.body.thumbnail = url;
    } else if (typeof req.body.thumbnail !== 'string') {
      req.body.thumbnail = '';
    }

    const imageFiles = files.filter(file => file.fieldname !== 'thumbnail');

    content.forEach(section => {
      if (!section.images) section.images = [];
    });

    for (const file of imageFiles) {
      const match = file.fieldname.match(/^content\[(\d+)]\[images]/);
      if (match) {
        const sectionIndex = parseInt(match[1]);
        if (!isNaN(sectionIndex) && content[sectionIndex]) {
          if (!Array.isArray(content[sectionIndex].images)) {
            content[sectionIndex].images = [];
          }
          content[sectionIndex].images.push(file);
        }
      }
    }

    for (const section of content) {
      const images = section.images;
      const fileImages: Express.Multer.File[] = [];
      const urlImages: string[] = [];

      for (const img of images) {
        if (typeof img === 'string') {
          urlImages.push(img);
        } else {
          fileImages.push(img);
        }
      }

      if (fileImages.length > 0) {
        const uploadedUrls = await this.googleDriveService.uploadMultipleFiles(fileImages);
        section.images = [...urlImages, ...uploadedUrls];
      } else {
        section.images = urlImages;
      }
    }

    const bodyData = {
      title: req.body?.title,
      slug: req.body?.slug,
      thumbnail: req.body?.thumbnail,
      authorId: req.body?.authorId,
      category: req.body?.category,
      tags: req.body?.tags,
      content: content.map((section: any) => ({
        postId: section?.postId,
        title: section?.title,
        images: section?.images,
        description: section?.description,
      })),
    };

    req.body = { ...bodyData };
    next();
  }
}
