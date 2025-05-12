import { ApiProperty } from "@nestjs/swagger";

export class MeiliSearchDto {
  id: string;
  title: string;  
  thumbnail: string;  
  titles: string;  
  description: string;  
  slug: string;  
  content: string;  
  tags: string[];
  author: string;
  category: string;
  published: string;

  constructor(
    id: string,
    title: string,
    thumbnail: string,
    titles: string,
    description: string,
    slug: string,
    content: string,
    tags: string[],
    author: string,
    category: string,
    published: string
  ) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
    this.titles = titles;
    this.description = description;
    this.slug = slug;
    this.content = content;
    this.tags = tags;
    this.author = author;
    this.category = category;
    this.published = published;
  }

  static fromPost(post: any): MeiliSearchDto {
     const content = Array.isArray(post?.content) ? post?.content : [];
    const sectionTitles = content
      ?.map((section: any) => section?.title)
      .join(' ') || '';
    const sectionDescriptions = content
      ?.map((section: any) => section?.description)
      .join(' ') || '';

    const titles = `${post?.title} ${sectionTitles}`;

    return new MeiliSearchDto(
      post?.id,
      post?.title,
      post?.thumbnail || "",
      titles,
      post?.description || "",
      post?.slug || "",
      sectionDescriptions,
      post.tags || [],
      post?.author?.name || "Unknown",
      post.category || "",
      new Date(post.createdAt).toISOString()
    );
  }
}


export class MeilisearchPostDto {
  @ApiProperty({ example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a5" })
  id: string;

  @ApiProperty({ example: "How to use Swagger in Nestjs" })
  title: string;

  @ApiProperty({ example: "https://example.com/image.png" })
  thumbnail: string;

  @ApiProperty({ example: "A short description of the post" })
  description: string;

  @ApiProperty({ example: "how-to-use-swagger-in-nestjs" })
  slug: string;

  @ApiProperty({ example: "This post covers how to use Swagger in NestJS..." })
  content: string;

  @ApiProperty({ example: ["nestjs", "swagger", "api"], type: [String] })
  tags: string[];

  @ApiProperty({ example: "John Doe" })
  author: string;

  @ApiProperty({ example: "Backend" })
  category: string;

  @ApiProperty()
  published: Date;
}


export class MeilisearchResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'Post search result retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: [MeilisearchPostDto] })
    data: MeilisearchPostDto[];
}