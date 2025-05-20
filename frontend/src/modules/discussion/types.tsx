import { User } from "../user/types";

export type Discussion = {
  id: string;
  title: string;
  description: string;
  slug: string;
  user: User;
  views: number;
  answers: Answer[];
  _count: {
    answers: number;
  };
  tags: string[];
  totalAnswer: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Discussions = {
  discussions: Discussion[];
  totalCount: number;
  limit: number;
  page: number;
};

export type Answer = {
  id: string;
  content: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
};

export type NewDiscussion = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  userId: string;
};

export type UpdateDiscussion = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
};
