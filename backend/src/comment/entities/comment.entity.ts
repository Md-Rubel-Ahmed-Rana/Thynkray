import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";

export class Comment {
    id: string;
    postId: string;
    post?: Post;
    userId: string;
    user?: User;
    content?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        postId: string,
        userId: string,
        content?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}
