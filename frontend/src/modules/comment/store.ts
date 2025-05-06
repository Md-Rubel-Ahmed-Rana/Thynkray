import { createStore } from "zustand";
import { initialPostValue } from "../post/store";
import { userInitialValue } from "../user/store";
import { Comment, CommentStore } from "./types";
import axios from "axios";
import { baseApi } from "..";

const initialCommentValue: Comment = {
  id: "",
  post: initialPostValue,
  user: userInitialValue,
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultCommentState: CommentStore = {
  isLoading: false,
  error: null,
  comment: initialCommentValue,
  comments: [initialCommentValue],
  getCommentsByPostId: async () => {
    return [initialCommentValue];
  },
};

export const createCommentStore = (
  initialState: CommentStore = defaultCommentState
) => {
  return createStore<CommentStore>()((set) => ({
    ...initialState,
    getCommentsByPostId: async (postId: string) => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${baseApi}/comment/post/${postId}`, {
          withCredentials: true,
        });
        const users = [...res?.data?.data] as Comment[];
        set({ comments: users, isLoading: false });
        return users;
      } catch (err) {
        set({ error: "Could not load comments", isLoading: false });
        throw err;
      }
    },
  }));
};
