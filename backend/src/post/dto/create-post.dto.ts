import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString , IsNotEmpty, ValidateNested} from "class-validator";

export class CreatePostSectionDto {
    @IsOptional()
    @IsString({message: "Post ID must be a string"})
    postId: string;
    @IsNotEmpty({message: "Section title is required", context: {property: "title"}})
    @IsString({message: "Section title must be a string"})
    title?: string;
    @IsOptional()
    @IsArray({message: "Images must be an array"})
    @IsString({each: true, message: "Images must be an array of strings"})
    images?: string[];
    @IsOptional()
    @IsString({message: "Description must be a string"})
    description?: string;

    constructor(
        postId: string,
        title?: string,
        images: string[] = [],
        description?: string
    ) {
        this.postId = postId;
        this.title = title;
        this.images = images;
        this.description = description;
    }
}


export class CreatePostDto {
    @IsNotEmpty({message: "Title is required"})
    @IsString({message: "Title must be a string"})
    title: string;
    @IsNotEmpty({message: "Slug is required"})
    @IsString({message: "Slug must be a string"})
    slug: string;
    @IsOptional()
    @IsString({message: "Thumbnail must be a string"})
    thumbnail?: string;
    @IsOptional()
    @IsString({message: "Category must be a string"})
    category?: string;
    @IsNotEmpty({message: "Author ID is required"})
    @IsString({message: "Author ID must be a string"})
    authorId: string;
    @IsNotEmpty({message: "Tags are required"})
    @IsArray({message: "Tags must be an array"})
    @IsString({each: true, message: "Tags must be an array of strings"})
    tags: string[];
    @IsNotEmpty({message: "Content is required"})
    @IsArray({message: "Content must be an array"})
    @ValidateNested({ each: true })
    @Type(() => CreatePostSectionDto)
    content?: CreatePostSectionDto[];

    constructor(
        title: string,
        slug: string,
        thumbnail?: string,
        authorId?: string,
        category?: string,
        tags: string[] = [],
        content: CreatePostSectionDto[] = []
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
