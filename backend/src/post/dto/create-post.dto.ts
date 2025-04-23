import { PostSection } from "../entities/post.entity";

export class CreatePostDto {
    title: string;
    slug: string;
    thumbnail?: string;
    category?: string;
    authorId: string;
    tags: string[];
    content: PostSection[];

    constructor(
        title: string,
        slug: string,
        thumbnail?: string,
        authorId?: string,
        category?: string,
        tags: string[] = [],
        content: PostSection[] = []
    ) {
        this.title = title;
        this.slug = slug;
        this.authorId = authorId;
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.content = content;
    }
}
