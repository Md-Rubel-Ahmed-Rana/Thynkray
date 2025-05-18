/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../user/types";

export type Discussion = {
  id: string;
  title: string;
  description: string;
  user: User;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
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
  discussions: Discussion[];
  response: any;
};

export type NewDiscussion = {
  title: string;
  description: string;
  userId: string;
};

export type DiscussionActions = {
  deleteDiscussion: (id: string) => Promise<void>;
  updateDiscussion: (
    id: string,
    updatedData: Partial<Discussion>
  ) => Promise<void>;
  addDiscussion: (data: NewDiscussion) => Promise<void>;
  getAllDiscussion: () => Promise<Discussion[]>;
  getSingleDiscussion: (id: string) => Promise<Discussion>;
};

export type DiscussionStore = DiscussionState & DiscussionActions;
