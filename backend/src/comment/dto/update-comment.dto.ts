import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';


export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    id: string;
    postId: string;
    userId: string;
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
