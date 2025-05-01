import { User } from "@prisma/client";
import { Comment } from "src/comment/entities/comment.entity";

export class Post {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail?: string;
    category?: string;
    tags: string[];
    comments: Comment[];
    authorId: string
    author?: User
    content: PostSection[];
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
        authorId?: string,
        content: PostSection[] = [],
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description =  description
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.authorId = authorId;
        this.content = content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}



export class PostSection {
    id: string;
    postId: string;
    post?: Post;
    title?: string;
    images: string[];
    description?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        postId: string,
        title?: string,
        images: string[] = [],
        description?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.postId = postId;
        this.title = title;
        this.images = images;
        this.description = description;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}