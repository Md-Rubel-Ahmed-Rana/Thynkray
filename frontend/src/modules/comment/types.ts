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
};

export type CommentActions = {
  getCommentsByPostId: (id: string) => Promise<Comment[]>;
};

export type CommentStore = CommentState & CommentActions;
