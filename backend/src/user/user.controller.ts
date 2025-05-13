import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { cookieName } from 'src/constants/cookie';
import { cookieOptions } from 'src/utility/cookieOptions';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckOwnership } from 'src/common/decorators/ownership.decorators';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResponseDto, UsersResponseDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 201, description: 'User registered successfully!'})
  @ApiResponse({ status: 200, description: 'User logged in successfully!' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
   const {access_token, message, statusCode} = await this.userService.create(createUserDto);

    res.cookie(cookieName, access_token, cookieOptions);

    return { message, statusCode };
  }

  @ApiOperation({ 
    summary: 'Get all users', 
    description: 'Retrieve a list of all users in the system.' })
  @ApiOkResponse({
    description: 'List of users retrieved successfully',
    type: UsersResponseDto,
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get all authors', description: 'Retrieve all users with role "author" and total post count' })
  @ApiOkResponse({
    description: 'List of authors retrieved successfully',
    type: UsersResponseDto,
  })
  @Get("authors")
  findAuthors() {
    
    return this.userService.findAuthors();
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOkResponse({
    description: 'Find a single user by id',
    type: UserResponseDto,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOkResponse({
    description: 'Find a single user by email',
    type: UserResponseDto,
  })
  @SkipThrottle()
  @UseGuards(AuthGuard)
  @Get('/auth/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }


  @ApiOkResponse({
    description: "User logged out successfully!"
  })
  @Delete('/auth/logout')
  logout( @Res({ passthrough: true }) res: Response) {
    res.clearCookie(cookieName, cookieOptions)
    return  {
      statusCode: 200,
      message: "User logged out successfully",
      data: null
    }
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Update user info',
    description: `
    Update user profile info by id.
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiResponse({ status: 200, description: 'User info updated successfully!'})
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: UserService,
    fetchMethod: "findOne",
    ownerField: "id",
    paramFieldName: "id"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }


  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Update user profile picture',
    description: `
    Update user profile image by id.
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiResponse({ status: 200, description: 'User profile picture updated successfully!'})
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: UserService,
    fetchMethod: "findOne",
    ownerField: "id",
    paramFieldName: "id"
  })
  @Post('update-profile-picture/:id')
  updateProfileImage(@Param('id') id: string, @Body() body: {profile_image: string}) {
    return this.userService.updateProfileImage(id, body.profile_image);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description: 'Unauthorized – login required.' })
  @ApiOperation({
    summary: 'Delete user',
    description: `
    Delete user account by id.
    Requires authentication. Only the owner of the data (the user themselves) can perform this operation.
    `
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully!'})
  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: UserService,
    fetchMethod: "findOne",
    ownerField: "id",
    paramFieldName: "id"
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
