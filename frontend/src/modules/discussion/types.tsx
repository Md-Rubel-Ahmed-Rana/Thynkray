/* eslint-disable @typescript-eslint/no-explicit-any */
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

export type DiscussionState = {
  isAdding: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  discussion: Discussion;
  data: Discussions;
  response: any;
};

export type NewDiscussion = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  userId: string;
};

export type DiscussionActions = {
  deleteDiscussion: (id: string) => Promise<void>;
  updateDiscussion: (
    id: string,
    updatedData: Partial<Discussion>
  ) => Promise<void>;
  addDiscussion: (data: NewDiscussion) => Promise<void>;
  getAllDiscussion: (
    page?: number,
    limit?: number,
    searchText?: string,
    sortBy?: "asc" | "desc"
  ) => Promise<Discussions>;
  getSingleDiscussion: (id: string) => Promise<Discussion>;
};

export type DiscussionStore = DiscussionState & DiscussionActions;
