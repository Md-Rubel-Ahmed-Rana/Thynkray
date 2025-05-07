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
  title: string;
  images: File[];
  description: string;
};

export type PostState = {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
  post: Post;
  news: InternationalPost[];
};

export type PostActions = {
  createNewPost: (values: CreateNewPost) => Promise<void>;
  getPostsByAuthor: (id: string) => Promise<Post[]>;
  getSinglePostBySlug: (slug: string) => Promise<Post>;
  getSinglePostById: (id: string) => Promise<Post>;
  getAllPosts: () => Promise<Post[]>;
  getLatestPosts: (limit?: number) => Promise<Post[]>;
  getPostsByCategory: (category: string) => Promise<Post[]>;
  getPostsBySearched: (searchText: string) => Promise<Post[]>;
  getRelatedPosts: (searchText: string) => Promise<Post[]>;
  getInternationalPosts: () => Promise<InternationalPost[]>;
};

export type PostStore = PostState & PostActions;
