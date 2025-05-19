import { User } from "../user/types";

export type InternationalPost = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export type ContentItem = {
  id: string;
  title: string;
  images: string[];
  description: string;
};

export type Post = {
  id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  category: string;
  slug: string;
  description: string;
  author: Partial<User>;
  content: ContentItem[];
  comments?: number;
  createdAt: Date;
};

export type CreateNewPost = {
  title: string;
  thumbnail: File;
  tags: string[];
  category: string;
  slug: string;
  description: string;
  authorId: string;
  content: CreateSection[];
};

export type CreateSection = {
  id: string;
  title: string;
  images: File[];
  description: string;
};

export type UpdatePost = {
  title: string;
  thumbnail: string | File;
  tags: string[];
  category: string;
  slug: string;
  description: string;
  authorId: string;
  content: UpdateSection[];
};

export type UpdateSection = {
  id?: string;
  title: string;
  images: (string | File)[];
  description: string;
};
