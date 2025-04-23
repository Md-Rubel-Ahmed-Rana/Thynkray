
export class CreateCommentDto {
    postId: string;
    userId: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        postId: string,
        userId: string,
        content?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
