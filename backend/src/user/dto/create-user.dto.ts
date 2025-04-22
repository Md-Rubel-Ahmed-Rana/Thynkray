
export class CreateUserDto {
    name: string;  
    email: string; 
    password: string;
    role: string; 
    bio?: string; 
    profile_image?: string; 

    constructor(name: string, email: string, password: string, role: string, bio?: string, profile_image?: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.bio = bio;
        this.profile_image = profile_image;
    }
    
}
