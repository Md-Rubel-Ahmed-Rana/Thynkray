import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

class GoogleDriveService {
  private readonly SCOPES = ['https://www.googleapis.com/auth/drive.file'];
  private drive;

  constructor(private readonly configService: ConfigService) {
    const rawCredentials = this.configService.get<string>(
      'GOOGLE_DRIVE_CREDENTIALS'
    );
    const credentials = JSON.parse(rawCredentials);
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
}

export const googleDriveService = new GoogleDriveService(new ConfigService());
