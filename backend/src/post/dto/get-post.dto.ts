import { PostSection } from "../entities/post.entity";

export class GetPostDto {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    category?: string;
    tags: string[];
    content: PostSection[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        title: string,
        slug: string,
        thumbnail?: string,
        category?: string,
        tags: string[] = [],
        content: PostSection[] = [],
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.content = content;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static fromEntity(entity: any): GetPostDto {
        return new GetPostDto(
            entity.id,
            entity.title,
            entity.slug,
            entity.thumbnail,
            entity.category,
            entity.tags,
            entity.content,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static fromEntities(entities: any[]): GetPostDto[] {
        return entities.map(entity => GetPostDto.fromEntity(entity));
    }
}


