import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { PostSection } from '../entities/post.entity';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    id: string;
    title?: string;
    slug?: string;
    thumbnail?: string;
    category?: string;
    tags?: string[];
    content?: PostSection[];

    constructor(
        id: string,
        title?: string,
        slug?: string,
        thumbnail?: string,
        category?: string,
        tags: string[] = [],
        content: PostSection[] = []
    ) {
        super();
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.content = content;
    }
}
