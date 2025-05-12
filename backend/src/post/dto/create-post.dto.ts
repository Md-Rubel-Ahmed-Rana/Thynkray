import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString , IsNotEmpty, ValidateNested} from "class-validator";


export class CreatePostSectionDto {
      @IsOptional()
      @IsString({ message: "Post ID must be a string" })
      postId: string;
    
      @ApiProperty({example: "Introduction to Swagger",description: "Title of the content section"})
      @IsNotEmpty({ message: "Section title is required", context: { property: "title" } })
      @IsString({ message: "Section title must be a string" })
      title?: string;
    
      @ApiPropertyOptional({example: ["https://example.com/image1.png"],description: "Optional array of image URLs for this section",
        type: [String],
      })
      @IsOptional()
      @IsArray({ message: "Images must be an array" })
      @IsString({ each: true, message: "Images must be an array of strings" })
      images?: string[];
    
      @ApiPropertyOptional({
        example: "This section explains what Swagger is and why it's useful.",
        description: "Optional description text for the section",
      })
      @IsOptional()
      @IsString({ message: "Description must be a string" })
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
    @ApiProperty({example: "How to use Swagger in Nestjs", description: "Effective title for post/article"})
    @IsNotEmpty({message: "Title is required"})
    @IsString({message: "Title must be a string"})
    title: string;

    @IsNotEmpty({message: "Slug is required"})
    @IsString({message: "Slug must be a string"})
    slug: string;

    @ApiProperty({example: "Today, we will learn how to use Swagger in Nestjs", description: "Long description for post"})
    @IsNotEmpty({message: "Description is required"})
    @IsString({message: "Description must be a string"})
    description: string;


    @ApiProperty({example: "https://example.com/image.png", description: "Optional thumbnail image URL"})
    @IsOptional()
    @IsString({ message: "Thumbnail must be a string" })
    thumbnail?: string;

    @ApiProperty({ example: "Programming", description: "Optional category for the post"})
    @IsOptional()
    @IsString({ message: "Category must be a string" })
    category?: string;

    @IsNotEmpty({ message: "Author ID is required" })
    @IsString({ message: "Author ID must be a string" })
    authorId: string;

    @ApiProperty({example: ["nestjs", "swagger", "api"],description: "Tags related to the post",type: [String]})
    @IsNotEmpty({ message: "Tags are required" })
    @IsArray({ message: "Tags must be an array" })
    @IsString({ each: true, message: "Tags must be an array of strings" })
    tags: string[];

    @ApiProperty({description: "Content sections of the post", type: [CreatePostSectionDto]})
    @IsNotEmpty({ message: "Content is required" })
    @IsArray({ message: "Content must be an array" })
    @ValidateNested({ each: true })
    @Type(() => CreatePostSectionDto)
    content: CreatePostSectionDto[];

    constructor(
        title: string,
        slug: string,
        description: string,
        thumbnail?: string,
        authorId?: string,
        category?: string,
        tags: string[] = [],
        content: CreatePostSectionDto[] = []
    ) {
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.authorId = authorId;
        this.thumbnail = thumbnail;
        this.category = category;
        this.tags = tags;
        this.content = content;
    }
}


export class PostCreateResponseDto {
    @ApiProperty({example: 201})
    statusCode: number
    
    @ApiProperty({example: "Post created successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}