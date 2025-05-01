import {  IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'Post ID is required', context: { field: 'postId' } })
    @IsString({ message: 'Content must be a string', context: { field: 'content' } })
    postId: string;
    @IsNotEmpty({ message: 'User ID is required', context: { field: 'userId' } })
    @IsString({ message: 'Content must be a string', context: { field: 'content' } })
    userId: string;
    @IsNotEmpty({ message: 'Content is required', context: { field: 'content' } })
    @IsString({ message: 'Content must be a string', context: { field: 'content' } })
    content?: string;

    constructor(
        postId: string,
        userId: string,
        content?: string,
    ) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
    }
}
