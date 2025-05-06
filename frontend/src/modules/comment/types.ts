/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from "../post/types";
import { User } from "../user/types";

export type Comment = {
  id: string;
  post: Partial<Post>;
  user: Partial<User>;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentState = {
  isLoading: boolean;
  error: string | null;
  comment: Comment;
  comments: Comment[];
  response: any;
};

export type NewComment = {
  postId: string;
  userId: string;
  content: string;
};

export type CommentActions = {
  getCommentsByPostId: (id: string) => Promise<Comment[]>;
  addComment: (data: NewComment) => Promise<void>;
};

export type CommentStore = CommentState & CommentActions;
