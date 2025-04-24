import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto, CreatePostSectionDto } from './create-post.dto';
import { IsOptional, IsString, IsArray, IsNotEmpty } from 'class-validator';


class UpdatePostSectionDto extends PartialType(CreatePostSectionDto) {
    @IsNotEmpty({message: "ID is required"})
    id: string;
    @IsOptional()
    @IsString({message: "Post ID must be a string"})
    postId: string;
    @IsOptional()
    @IsString({message: "title must be a string" })
    title?: string;
    @IsOptional()
    @IsArray({message: "images must be an array" })
    @IsString({each: true, message: "images must be an array of strings" })
    images: string[];
    @IsOptional()
    @IsString({message: "description must be a string" })
    description?: string;

    constructor(
        title?: string,
        images: string[] = [],
        description?: string,
    ) {
        super();
        this.title = title;
        this.images = images;
        this.description = description;
    }
}

export class UpdatePostDto extends PartialType(CreatePostDto) {
    id: string;
    title?: string;
    slug?: string;
    thumbnail?: string;
    category?: string;
    tags?: string[];
    content?: UpdatePostSectionDto[];

    constructor(
        id: string,
        title?: string,
        slug?: string,
        thumbnail?: string,
        category?: string,
        tags: string[] = [],
        content: UpdatePostSectionDto[] = []
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
