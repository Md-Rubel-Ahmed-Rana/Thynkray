import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from 'src/db';
import { GetUserDto } from './dto/get-user.dto';
import { googleDriveService } from 'src/file-uploader/google.drive.service';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const isExist = await prisma.user.findUnique({
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

    await prisma.user.create({
      data: createUserDto
    });
    return {
      message: 'User register successfully!',
      statusCode: 201
    };
  }

  async findAll(): Promise<{ message: string; data: Partial<GetUserDto>[] }> {
    const users = await prisma.user.findMany({});

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
    const user = await prisma.user.findUnique({
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
    const user = await prisma.user.findUnique({
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
    await prisma.user.update({
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
    const imageUrl = await googleDriveService.uploadSingleFile(file);
    const user = await prisma.user.update({
      where: { id },
      data: { profile_image: imageUrl }
    });

    // Delete the old image from Google Drive 
    if(user?.profile_image) {
      await googleDriveService.deleteFile(user?.profile_image);
    }

    return {
      message: 'User updated successfully!'
    };
  }

  async remove(id: string) {
    await prisma.user.delete({
      where: { id }
    });
    return {
      message: 'User deleted successfully!'
    };
  }
}
