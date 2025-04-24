import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string;
    @IsOptional()
    @IsString({ message: 'Name must be a string', context: { value: 'name' } })
    name?: string;  
    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address', context: { value: 'email' } })
    email?: string;
    @IsOptional()
    @IsString({ message: 'Role must be a string', context: { value: 'role' } })
    role?: string;
    @IsOptional()
    @IsString({ message: 'Bio must be a string', context: { value: 'bio' } })
    bio?: string;
    @IsOptional()
    @IsString({ message: 'Profile image must be a string', context: { value: 'profile_image' } })
    profile_image?: string; 

    constructor(id: string, name?: string, email?: string, role?: string, bio?: string, profile_image?: string) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.profile_image = profile_image;
    }
}
