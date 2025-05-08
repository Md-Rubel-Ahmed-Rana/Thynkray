import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { GoogleDriveService } from 'src/file-uploader/google.drive.service';

@Injectable()
export class ManipulatePatchMiddleware implements NestMiddleware {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[];

    try {
      if (typeof req.body.tags === 'string') {
        req.body.tags = JSON.parse(req.body.tags);
      }
    } catch {
      req.body.tags = [];
    }

    let content = [];
    try {
      content = typeof req.body.content === 'string'
        ? JSON.parse(req.body.content)
        : req.body.content || [];
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

    const imageFiles = files.filter(file => file.fieldname.startsWith('content[') && file.fieldname.includes('[images]'));
    

    content.forEach(section => {
      if (!Array.isArray(section.images)) section.images = [];
    });

    for (const file of imageFiles) {
      const match = file.fieldname.match(/^content\[(\d+)]\[images]/);
      if (match) {
        const index = parseInt(match[1]);
        if (!isNaN(index) && content[index]) {
          content[index].images = content[index].images || [];
          content[index].images.push(file);
        }
      }
    }

    for (const section of content) {
      const images = section.images || [];
      const fileImages: Express.Multer.File[] = [];
      const existingUrls: string[] = [];

      for (const img of images) {
        if (typeof img === 'string') {
          existingUrls.push(img);
        } else {
          fileImages.push(img);
        }
      }

      const uploadedUrls = fileImages.length > 0
        ? await this.googleDriveService.uploadMultipleFiles(fileImages)
        : [];

      section.images = [...existingUrls, ...uploadedUrls];
    }

    req.body = {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      authorId: req.body.authorId,
      category: req.body.category,
      tags: req.body.tags,
      content: content.map(section => ({
        title: section.title,
        description: section.description,
        images: section.images,
      })),
    };

    next();
  }
}
