import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto, CreatePostSectionDto } from './create-post.dto';
import { IsOptional, IsString, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsNotEmpty({message: "Post title is required"})
    @IsString({message: "Post title must be a string" })
    title?: string;
    @IsNotEmpty({message: "Slug description is required"})
    @IsString({message: "Slug must be a string" })
    slug?: string;
    @IsNotEmpty({message: "Post description is required"})
    @IsString({message: "Post description must be a string" })
    description?: string;
    @IsNotEmpty({message: "Thumbnail is required"})
    @IsString({message: "Thumbnail must be a string" })
    thumbnail?: string;
    @IsNotEmpty({message: "Category is required"})
    @IsString({message: "Category must be a string" })
    category?: string;
    @IsNotEmpty({message: "At least one tag is required"})
    @IsArray({message: "Tags must be an array" })
    @IsString({each: true, message: "Tags must be an array of strings" })
    images: string[];
    tags?: string[];
    @IsOptional()
    @IsArray({ message: 'Content must be an array' })
    @ValidateNested({ each: true })
    @Type(() => UpdatePostSectionDto)
    content?: UpdatePostSectionDto[];

    constructor(
        title?: string,
        slug?: string,
        description?: string,
        thumbnail?: string,
        category?: string,
        tags: string[] = [],
        content: UpdatePostSectionDto[] = []
    ) {
        super();
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.content = content;
    }
}


class UpdatePostSectionDto extends PartialType(CreatePostSectionDto) {
    @IsOptional()
    @IsString({ message: 'Section id must be a string' })
    id?: string;
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
