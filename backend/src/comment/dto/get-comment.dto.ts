import { ApiProperty } from "@nestjs/swagger";
import { Post, User } from "@prisma/client";

export class GetCommentDto {
    id: string;
    postId: string;
    post: Post;
    user: User;
    userId: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
    constructor(
        id: string,
        user?: User,
        post?: Post,
        content?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.user = user;
        this.post = post;
        this.content = content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
    static fromEntity(entity: any): GetCommentDto {
        return new GetCommentDto(
            entity.id,
            entity.user,
            entity.post,
            entity.content,
            entity.createdAt,
            entity.updatedAt
        );
    }
    static fromEntities(entities: any[]): GetCommentDto[] {
        return entities.map(entity => GetCommentDto.fromEntity(entity));
    }
}




class CommentDto {
    @ApiProperty({example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7"})
    id: string

    @ApiProperty({example: "Nice blog"})
    content: string

    @ApiProperty({example: {id: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7", title: "What is AWS?"}})
    post: {id: string, title: string}

    @ApiProperty({
        example: {
            id: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7", 
            name: "What is AWS?", 
            profile_image: "https://user-profile.png"
        }
    })
    user: {id: string, name: string, profile_image: string}

    @ApiProperty()
    createdAt: Date;
      
    @ApiProperty()
    updatedAt: Date;

}

export class CommentResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Comment retrieved successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({type: CommentDto})
    data: CommentDto
}

export class CommentsResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Comments retrieved successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({type: [CommentDto]})
    data: [CommentDto]
}