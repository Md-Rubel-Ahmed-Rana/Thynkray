import { User } from "@prisma/client";
import { PostSection } from "../entities/post.entity";
import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/user/dto/get-user.dto";

export class GetPostDto {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail?: string;
    category?: string;
    tags: string[];
    content: PostSection[];
    author: User
    comments: number
    views: number
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        title: string,
        slug: string,
        description: string,
        thumbnail?: string,
        category?: string,
        tags: string[] = [],
        content: PostSection[] = [],
        author?: User,
        comments?: number,
        views?: number,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.content = content;
        this.author = author;
        this.comments = comments;
        this.views = views || 0;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static fromEntity(entity: any): GetPostDto {

        return new GetPostDto(
            entity?.id,
            entity?.title,
            entity?.slug,
            entity?.description,
            entity?.thumbnail,
            entity?.category,
            entity?.tags,
            entity?.content,
            entity?.author,
            entity?._count?.comments || 0,
            entity?.views || 0,
            entity?.createdAt,
            entity?.updatedAt
        );
    }

    static fromEntities(entities: any[]): GetPostDto[] {
        return entities.map(entity => GetPostDto.fromEntity(entity));
    }
}



  
class PostSectionDto {
    @ApiProperty({ example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7" })
    id: string;
    
    @ApiProperty({ example: "1. Use Meaningful Names" })
    title: string;
    
    @ApiProperty({ example: "https://example.com/images/naming.png" })
    images: string;
    
    @ApiProperty({ example: "Variable and function names should reveal intent. Avoid vague and abbreviated names." })
    description: string;
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
}

class PostDto {
    @ApiProperty({ example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7" })
    id: string;
  
    @ApiProperty({ example: "10 Tips for Writing Clean Code" })
    title: string;
  
    @ApiProperty({ example: "10-tips-for-writing-clean-code-1d8f9b1a" })
    slug: string;
  
    @ApiProperty({ example: "This article explores 10 essential tips to help developers write clean and maintainable code." })
    description: string;
  
    @ApiProperty({ example: "https://example.com/images/clean-code-thumbnail.jpg" })
    thumbnail?: string;
  
    @ApiProperty({ example: "programming" })
    category?: string;
  
    @ApiProperty({ example: ["clean-code", "development", "best-practices"] })
    tags: string[];
  
    @ApiProperty({ type: [PostSectionDto] })
    content: PostSectionDto[];
  
    @ApiProperty({example: UserDto })
    author: UserDto;
  
    @ApiProperty({ example: 12 })
    comments: number;
  
    @ApiProperty()
    createdAt: Date;
  
    @ApiProperty()
    updatedAt: Date;
}

export class PostsResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'Posts retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: [PostDto] })
    data: [PostDto]
}

export class PostResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'Post retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: PostDto })
    data: PostDto
}

  