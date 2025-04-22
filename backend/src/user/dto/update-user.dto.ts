import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string;
    name?: string;  
    email?: string; 
    role?: string; 
    bio?: string; 
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
