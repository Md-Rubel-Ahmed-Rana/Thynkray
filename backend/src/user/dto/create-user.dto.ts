import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Name must be a string', context: { field: 'name' } })
    @IsNotEmpty({ message: 'Name is required', context: { field: 'name' } })
    name: string;
    @IsEmail({}, { message: 'Email must be a valid email address', context: { field: 'email' } })
    @IsNotEmpty({ message: 'Email is required', context: { field: 'email' } })
    email: string; 
    @IsOptional()
    @IsString({ message: 'Role must be a string', context: { field: 'role' } })
    role: string;
    @IsOptional()
    @IsString({ message: 'Bio must be a string', context: { field: 'bio' } })
    bio?: string;
    @IsOptional()
    @IsString({ message: 'Profile image must be a string', context: { field: 'profile_image' } })
    profile_image?: string; 
    @IsOptional()
    @IsString({ message: 'Designation image must be a string', context: { field: 'designation' } })
    designation?: string; 

    constructor(name: string, email: string, role: string, bio?: string, profile_image?: string, designation?: string) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.profile_image = profile_image;
        this.designation = designation;
    }
    
}
