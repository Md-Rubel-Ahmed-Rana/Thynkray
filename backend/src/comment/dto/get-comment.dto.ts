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