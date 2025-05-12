import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto, CreatePostSectionDto } from './create-post.dto';
import { IsOptional, IsString, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';




class UpdatePostSectionDto extends PartialType(CreatePostSectionDto) {
    @IsOptional()
    @IsString({ message: 'Section id must be a string' })
    id?: string;

    @IsOptional()
    @IsString({message: "Post ID must be a string"})
    postId: string;

    @ApiPropertyOptional({example: "Introduction to Swagger",description: "Title of the content section"})
    @IsOptional()
    @IsString({message: "title must be a string" })
    title?: string;

    @ApiPropertyOptional({example: ["https://example.com/image1.png"],description: "Optional array of image URLs for this section",
        type: [String],
      })
    @IsOptional()
    @IsArray({message: "images must be an array" })
    @IsString({each: true, message: "images must be an array of strings" })
    images: string[];

    @ApiPropertyOptional({
        example: "This section explains what Swagger is and why it's useful.",
        description: "Optional description text for the section",
      })
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
    @ApiPropertyOptional({example: "How to use Swagger in Nestjs", description: "Effective title for post/article"})
    @IsNotEmpty({message: "Post title is required"})
    @IsString({message: "Post title must be a string" })
    title?: string;

    @IsNotEmpty({message: "Slug description is required"})
    @IsString({message: "Slug must be a string" })
    slug?: string;

    @ApiPropertyOptional({example: "Today, we will learn how to use Swagger in Nestjs", description: "Long description for post"})
    @IsNotEmpty({message: "Post description is required"})
    @IsString({message: "Post description must be a string" })
    description?: string;

    @ApiPropertyOptional({example: "https://example.com/image.png", description: "Optional thumbnail image URL"})
    @IsNotEmpty({message: "Thumbnail is required"})
    @IsString({message: "Thumbnail must be a string" })
    thumbnail?: string;

    @ApiPropertyOptional({ example: "Programming", description: "Optional category for the post"})
    @IsNotEmpty({message: "Category is required"})
    @IsString({message: "Category must be a string" })
    category?: string;

    @ApiPropertyOptional({example: ["nestjs", "swagger", "api"],description: "Tags related to the post",type: [String]})
    @IsNotEmpty({message: "At least one tag is required"})
    @IsArray({message: "Tags must be an array" })
    @IsString({each: true, message: "Tags must be an array of strings" })
    tags?: string[];

    @ApiPropertyOptional({description: "Content sections of the post", type: [UpdatePostSectionDto]})
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


