import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    id: string;
    @IsNotEmpty({ message: 'Post ID is required', context: { field: 'postId' } })
    @IsString({ message: 'Post ID must be a string', context: { field: 'postId' } })
    postId: string;
    @IsNotEmpty({ message: 'User ID is required', context: { field: 'userId' } })
    @IsString({ message: 'User ID must be a string', context: { field: 'userId' } })
    userId: string;
    @IsNotEmpty({ message: 'Content is required', context: { field: 'content' } })
    @IsString({ message: 'Content must be a string', context: { field: 'content' } })
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        postId: string,
        userId: string,
        content?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super(postId, userId, content, createdAt, updatedAt);
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
