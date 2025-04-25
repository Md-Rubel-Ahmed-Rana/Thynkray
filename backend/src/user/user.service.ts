import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GoogleDriveService } from 'src/file-uploader/google.drive.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly googleDriveService: GoogleDriveService, private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    });

    if (isExist) {
      return {
        message: 'User logged in successfully!',
        statusCode: 200
      };
    }

    await this.prisma.user.create({
      data: createUserDto
    });
    return {
      message: 'User register successfully!',
      statusCode: 201
    };
  }

  async findAll(): Promise<{ message: string; data: Partial<GetUserDto>[] }> {
    const users = await this.prisma.user.findMany({});

    const userDtos = users.map((user) =>
      new GetUserDto(
        user.id,
        user.name,
        user.email,
        user.role,
        user.bio,
        user.profile_image,
        user.created_at,
        user.updated_at
      ).getBasicInfo()
    );

    return {
      message: 'Users retrieved successfully!',
      data: userDtos
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (!user) {
      return {
        message: 'User not found!',
        statusCode: 404
      };
    }
    const userDto = new GetUserDto(
      user.id,
      user.name,
      user.email,
      user.role,
      user.bio,
      user.profile_image,
      user.created_at,
      user.updated_at
    ).getFullInfo();
    return {
      message: 'User retrieved successfully!',
      data: userDto
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return {
        message: 'User not found!',
        statusCode: 404
      };
    }
    const userDto = new GetUserDto(
      user.id,
      user.name,
      user.email,
      user.role,
      user.bio,
      user.profile_image,
      user.created_at,
      user.updated_at
    ).getFullInfo();
    return {
      message: 'User retrieved successfully!',
      data: userDto
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });

    return {
      message: 'User updated successfully!'
    };
  }

  async updateProfileImage(
  id: string,
  file: any
): Promise<{ message: string }> {
  const existingUser = await this.prisma.user.findUnique({ where: { id } });
  const oldImageUrl = existingUser?.profile_image;

  const newImageUrl = await this.googleDriveService.uploadSingleFile(file);

  await this.prisma.user.update({
    where: { id },
    data: { profile_image: newImageUrl }
  });

  if (oldImageUrl) {
    await this.googleDriveService.deleteFile(oldImageUrl);
  }

  return {
    message: 'User updated successfully!'
  };
}


  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id }
    });
    return {
      message: 'User deleted successfully!'
    };
  }
}
