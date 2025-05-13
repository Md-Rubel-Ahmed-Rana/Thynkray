import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PinoLogger } from 'src/common/logger/pino-logger.service';
import { GoogleDriveService } from 'src/file-uploader/google.drive.service';

@Injectable()
export class UpdateUserProfileImage implements NestMiddleware {
  constructor(
    private readonly googleDriveService: GoogleDriveService,
    private readonly logger: PinoLogger
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const file = req.file as Express.Multer.File;
    try {
      const url = await this.googleDriveService.uploadSingleFile(file)
      req.body.profile_image = url
      next()
    } catch (error: any) {
      this.logger.error(`Failed to update user profile image. Error: ${error?.message}`)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to update user profile image.",
        success: false
      })
    }
  }
}
