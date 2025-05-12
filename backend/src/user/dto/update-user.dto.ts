import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ example: 'Md Rubel Ahmed Rana', description: 'The full name of the user' })
    @IsOptional()
    @IsString({ message: 'Name must be a string', context: { value: 'name' } })
    name?: string;
    
    @ApiPropertyOptional({ example: 'mdrubelahmedrana521@gmail.com', description: "The email couldn't be changed anymore." })
    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address', context: { value: 'email' } })
    email?: string;

    @ApiPropertyOptional({ example: 'author', description: "The role couldn't be changed anymore. It auto generated." })
    @IsOptional()
    @IsString({ message: 'Role must be a string', context: { value: 'role' } })
    role?: string;

    @ApiPropertyOptional({ example: 'Passionate backend dev', description: 'Short biography' })
    @IsOptional()
    @IsString({ message: 'Bio must be a string', context: { value: 'bio' } })
    bio?: string;

    @ApiPropertyOptional({ example: 'https://example.com/profile.jpg', description: 'Profile image URL. Must upload image file' })
    @IsOptional()
    @IsString({ message: 'Profile image must be a string', context: { value: 'profile_image' } })
    profile_image?: string; 

    @ApiPropertyOptional({ example: 'Full Stack Developer', description: 'User designation' })
    @IsString({ message: 'Designation image must be a string', context: { value: 'designation' } })
    designation?: string;

    constructor(
        name?: string, 
        email?: string, 
        role?: string, 
        bio?: string, 
        profile_image?: string, 
        designation?: string
    ) {
        super();
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.profile_image = profile_image;
        this.designation = designation;
    }
}
