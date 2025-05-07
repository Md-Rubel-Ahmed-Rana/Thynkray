import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsNotEmpty({ message: 'Post ID is required', context: { field: 'postId' } })
    @IsString({ message: 'Post ID must be a string', context: { field: 'postId' } })
    postId: string;
    @IsNotEmpty({ message: 'User ID is required', context: { field: 'userId' } })
    @IsString({ message: 'User ID must be a string', context: { field: 'userId' } })
    userId: string;
    @IsNotEmpty({ message: 'Content is required', context: { field: 'content' } })
    @IsString({ message: 'Content must be a string', context: { field: 'content' } })
    content?: string;

    constructor(
        postId: string,
        userId: string,
        content?: string,
    ) {
        super(postId, userId, content);
        this.postId = postId;
        this.userId = userId;
        this.content = content;
    }
}
