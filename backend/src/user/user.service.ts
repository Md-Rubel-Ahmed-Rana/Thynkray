import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
  const { email } = createUserDto;

  let user = await this.prisma.user.findUnique({
    where: { email }
  });

  let statusCode: number;
  let message: string;

  if (user) {
    statusCode = 200;
    message = 'User logged in successfully!';
  } else {
    user = await this.prisma.user.create({
      data: createUserDto
    });
    statusCode = 201;
    message = 'User registered successfully!';
  }

  const payload = {
    id: user.id,
    email: user.email
  };

  const { access_token } = await this.authService.generateAccessToken(payload);

  return { message, statusCode, access_token };
  }


  async findAll(): Promise<{ statusCode: number, message: string; data: Partial<GetUserDto>[] }> {
    const users = await this.prisma.user.findMany({});

    const userDtos = users.map((user) =>
      new GetUserDto(
        user.id,
        user.name,
        user.email,
        user.role,
        user.bio,
        user.designation,
        user.profile_image,
        0,
        user.created_at,
        user.updated_at
      ).getBasicInfo()
    );

    return {
       statusCode: 200,
      message: 'Users retrieved successfully!',
      data: userDtos
    };
  }

  async findAuthors(){
    const users = await this.prisma.user.findMany({
      include: {
        _count: {select: {posts: true}}
      }
    });

    const userDtos = users.map((user) =>
      new GetUserDto(
        user.id,
        user.name,
        user.email,
        user.role,
        user.bio,
        user.designation,
        user.profile_image,
        user._count.posts,
        user.created_at,
        user.updated_at
      ).getAuthorsProfile()
    );

    return {
       statusCode: 200,
      message: 'Users retrieved successfully!',
      data: userDtos
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
    });
    if (!user) {
     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userDto = new GetUserDto(
      user.id,
      user.name,
      user.email,
      user.role,
      user.bio,
      user.designation,
      user.profile_image,
      0,
      user.created_at,
      user.updated_at
    ).getFullInfo();
    return {
       statusCode: 200,
      message: 'User retrieved successfully!',
      data: userDto
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userDto = new GetUserDto(
      user.id,
      user.name,
      user.email,
      user.role,
      user.bio,
      user.designation,
      user.profile_image,
      0,
      user.created_at,
      user.updated_at
    ).getFullInfo();
    return {
       statusCode: 200,
      message: 'User retrieved successfully!',
      data: userDto
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ) {
    const isExist = await this.prisma.user.findUnique({where: {id}})
    if(!isExist){
      throw new HttpException("User was not found", HttpStatus.NOT_FOUND)
    }

    await this.prisma.user.update({
      where: { id },
      data: {...isExist,...updateUserDto}
    });

    return {
       statusCode: 200,
      message: 'User updated successfully!'
    };
  }

  async updateProfileImage(
  id: string,
  newImageUrl: string
) {
  const existingUser = await this.prisma.user.findUnique({ where: { id } });
  const oldImageUrl = existingUser?.profile_image;

  await this.prisma.user.update({
    where: { id },
    data: { profile_image: newImageUrl }
  });

  if (oldImageUrl) {
    this.eventEmitter.emit("user.profile-image.updated", oldImageUrl)
  }

  return {
    statusCode: 200,
    message: 'User updated successfully!'
  };
  }


  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id }
    });
    return {
       statusCode: 200,
      message: 'User deleted successfully!'
    };
  }
}
