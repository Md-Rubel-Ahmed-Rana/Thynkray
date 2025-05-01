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
