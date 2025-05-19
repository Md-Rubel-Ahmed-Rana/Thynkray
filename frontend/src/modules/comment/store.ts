/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand";
import { initialPostValue } from "../post/store";
import { userInitialValue } from "../user/store";
import { Comment, CommentStore, NewComment } from "./types";
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
  response: null,
  comment: initialCommentValue,
  comments: [initialCommentValue],
  getCommentsByPostId: async () => {
    return [initialCommentValue];
  },
  addComment: async () => {},
  deleteComment: async () => {},
  updateComment: async () => {},
};

export const createCommentStore = (
  initialState: CommentStore = defaultCommentState
) => {
  return createStore<CommentStore>()((set, get) => ({
    ...initialState,
    getCommentsByPostId: async (postId) => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${baseApi}/comment/post/${postId}`, {
          withCredentials: true,
        });
        const comments = res.data.data as Comment[];
        set({ comments, isLoading: false });
        return comments;
      } catch (err) {
        console.error(err);
        set({ error: "Could not load comments", isLoading: false });
        throw err;
      }
    },
    addComment: async (data: NewComment): Promise<any> => {
      set({ isLoading: true });
      try {
        const res = await axios.post(`${baseApi}/comment`, data, {
          withCredentials: true,
        });
        const result: any = await get().getCommentsByPostId(data?.postId);
        const comments = [...result?.data?.data] as Comment[];
        set({
          isLoading: false,
          response: res?.data,
          comments,
        });
        return res?.data;
      } catch (err: any) {
        set({
          error: err?.message || "Could not add user comment",
          isLoading: false,
        });
      }
    },
    deleteComment: async ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => {
      set({ isLoading: true });
      try {
        const res = await axios.delete(`${baseApi}/comment/${commentId}`, {
          withCredentials: true,
        });
        const result: any = await get().getCommentsByPostId(postId);
        const comments = [...result?.data?.data] as Comment[];
        return set({
          isLoading: false,
          response: res?.data,
          comments,
        });
      } catch (err: any) {
        set({
          error: err?.message || "Could not delete comment",
          isLoading: false,
        });
      }
    },
    updateComment: async ({
      postId,
      commentId,
      content,
    }: {
      postId: string;
      commentId: string;
      content: string;
    }) => {
      set({ isLoading: true });
      try {
        const res = await axios.patch(
          `${baseApi}/comment/${commentId}`,
          { content },
          {
            withCredentials: true,
          }
        );
        const result: any = await get().getCommentsByPostId(postId);
        const comments = [...result?.data?.data] as Comment[];
        set({
          isLoading: false,
          response: res?.data,
          comments,
        });
        return res?.data;
      } catch (err: any) {
        set({
          error: err?.message || "Could not delete comment",
          isLoading: false,
        });
      }
    },
  }));
};
