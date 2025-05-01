import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer';
import { Response } from 'express';
import { cookieName } from 'src/constants/cookie';
import { cookieOptions } from 'src/utility/cookieOptions';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckOwnership } from 'src/decorators/ownership.decorators';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
 async create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
   const {access_token, message, statusCode} = await this.userService.create(createUserDto);

    res.cookie(cookieName, access_token, cookieOptions);

    return { message, statusCode };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('/auth/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

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

  @UseGuards(AuthGuard, OwnershipGuard)
  @CheckOwnership({
    service: UserService,
    fetchMethod: "findOne",
    ownerField: "id",
    paramFieldName: "id"
  })
  @Post('/update-profile-picture/:id')
  @UseInterceptors(FileInterceptor('profile_image', multerOptions))
  updateProfileImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.updateProfileImage(id, file);
  }
}
