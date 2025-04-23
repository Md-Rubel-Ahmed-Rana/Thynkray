export class MeiliSearchDto {
  id: string;
  title: string; // blog title + sections titles
  content: string; // sections descriptions
  tags: string[];
  author: string;
  category: string;
  published: string;

  constructor(
    id: string,
    title: string,
    content: string,
    tags: string[],
    author: string,
    category: string,
    published: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tags = tags;
    this.author = author;
    this.category = category;
    this.published = published;
  }

  static fromPost(post: any): MeiliSearchDto {
    const sectionDescriptions = post.content
      ?.map((section: any) => section?.description)
      .join(' ') || '';

    const title = `${post.title} ${sectionDescriptions}`;

    return new MeiliSearchDto(
      post.id,
      title,
      sectionDescriptions,
      post.tags || [],
      post.author.name,
      post.category,
      new Date(post.createdAt).toISOString()
    );
  }
}
