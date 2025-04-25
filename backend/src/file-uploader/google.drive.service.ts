import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
 
@Injectable()
export class GoogleDriveService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  private drive;

  constructor(private readonly configService: ConfigService) {
    const rawCredentials = this.configService.get<string>(
      'GOOGLE_DRIVE_CREDENTIALS'
    );

    const credentials = rawCredentials && JSON.parse(rawCredentials);
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: this.SCOPES
    });

    this.drive = google.drive({ version: 'v3', auth });
  }

  async uploadSingleFile(file: any): Promise<string> {
    const folderId = this.configService.get<string>('GOOGLE_DRIVE_FOLDER_ID');
    try {
      const fileMetadata = {
        name: file.originalname,
        parents: [folderId]
      };

      const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path)
      };

      const uploadRes = await this.drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id'
      });

      const fileId = uploadRes.data.id;

      // Make file public
      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      // Return public viewable link
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } catch (error) {
      console.error('Google Drive upload error:', error);
      throw new Error('Failed to upload file to Google Drive');
    } finally {
      fs.unlink(file.path, () => {});
    }
  }

  async uploadMultipleFiles(files: any[]): Promise<string[]> {
  const uploadResults: string[] = [];

  for (const file of files) {
    try {
        const fileUrl = await this.uploadSingleFile(file);
        uploadResults.push(fileUrl);
      } catch (error) {
        console.error(`Failed to upload file ${file.originalname}:`, error);
      }
    }

    return uploadResults;
  }

  async deleteFile(link: string): Promise<void> {
    const fileId =  this.extractFileIdFromLink(link)

    if(!fileId) {
      console.log('Invalid file link provided', link);
      return
    }

    try {
      await this.drive.files.delete({
        fileId
      });
    } catch (error) {
      console.error('Google Drive delete error:', error);
      throw new Error('Failed to delete file from Google Drive');
    }
  }

  async deleteMultipleFiles(links: string[]): Promise<void> {
    for (const link of links) {
      try {
        await this.deleteFile(link);
      } catch (error) {
        console.error(`Failed to delete file with link ${link}:`, error);
      }
    }
  }

  extractFileIdFromLink(link: string): string | null {
  try {
    const url = new URL(link);
    const idParam = url.searchParams.get('id');
    if (idParam) return idParam;

    const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) return match[1];

      return null;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  }

}

