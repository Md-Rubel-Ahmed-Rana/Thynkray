import { ApiProperty } from "@nestjs/swagger";


export class UserDto {
    @ApiProperty({example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7"})
    id: string;
  
    @ApiProperty({example: "Md Rubel Ahmed Rana"})
    name: string;
  
    @ApiProperty({example: "mdrubelahmedrana521@gmail.com"})
    email: string;

    @ApiProperty({example: "author"})
    role: string;
  
    @ApiProperty({example: "A passionate Full Stack Developer"})
    bio: string;
  
    @ApiProperty({example: 10})
    posts: number;
  
    @ApiProperty({example: "Full Stack Developer"})
    designation: string;
  
    @ApiProperty({example: "https://drive.google.com/folder/fsdahfdbdkfjsadkfjk"})
    profile_image: string;
  
    @ApiProperty()
    createdAt: Date;
  
    @ApiProperty()
    updatedAt: Date;
}

export class UsersResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'Users retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: [UserDto] })
    data: UserDto[];
}

export class UserResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'User retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: UserDto })
    data: UserDto
}

export class GetUserDto {
    id: string;
    name: string;
    email: string;
    role: string;
    bio?: string;
    posts?: number;
    designation?: string;
    profile_image?: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: string,
        name: string,
        email: string,
        role: string,
        bio?: string,
        designation?: string,
        profile_image?: string,
        posts?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.bio = bio;
        this.designation = designation
        this.profile_image = profile_image;
        this.posts = posts;
        this.created_at = created_at || new Date();
        this.updated_at = updated_at || new Date();
    }
    // ---- GET methods ----
    getBasicInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
        };
    }
    getFullInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
    getPublicProfile() {
        return {
            id: this.id,
            name: this.name,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
        };
    }
    getAuthorsProfile() {
        return {
            id: this.id,
            name: this.name,
            bio: this.bio,
            designation: this.designation,
            profile_image: this.profile_image,
            posts: this.posts || 0,
        };
    }
}

