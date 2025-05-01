import { User } from "../user/types";

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
  comments?: [];
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
  title: string;
  images: File[];
  description: string;
};

export type PostState = {
  isLoading: boolean;
  error: string | null;
};

export type PostActions = {
  createNewPost: (values: CreateNewPost) => Promise<void>;
};

export type PostStore = PostState & PostActions;
