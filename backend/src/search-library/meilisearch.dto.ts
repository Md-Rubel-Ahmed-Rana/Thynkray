
export class MeiliSearchDto {
  id: string;
  title: string;  
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

    const titles = `${post.title} ${sectionTitles}`;

    return new MeiliSearchDto(
      post.id,
      post.title,
      titles,
      post.description,
      post.slug,
      sectionDescriptions,
      post.tags || [],
      post.author.name,
      post.category,
      new Date(post.createdAt).toISOString()
    );
  }
}
