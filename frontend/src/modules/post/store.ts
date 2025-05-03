import { createStore } from "zustand";
import { CreateNewPost, Post, PostStore } from "./types";
import { baseApi } from "..";
import makePostFormData from "@/utils/makePostFormData";
import axios from "axios";
import { userInitialValue } from "../user/store";

const initialPostValue: Post = {
  id: "",
  title: "",
  category: "",
  description: "",
  slug: "",
  tags: [],
  thumbnail: "",
  comments: [],
  author: userInitialValue,
  content: [],
  createdAt: new Date(),
};

export const defaultPostState: PostStore = {
  isLoading: false,
  error: null,
  posts: [],
  post: initialPostValue,
  createNewPost: async () => {},
  getPostsByAuthor: async () => {
    return [initialPostValue];
  },
  getAllPosts: async () => {
    return [initialPostValue];
  },
  getSinglePostBySlug: async () => {
    return initialPostValue;
  },
  getSinglePostById: async () => {
    return initialPostValue;
  },
};

export const createPostStore = (initialState: PostStore = defaultPostState) => {
  return createStore<PostStore>()((set) => ({
    ...initialState,
    createNewPost: async (values: CreateNewPost) => {
      set({ isLoading: true, error: null });
      const formData = makePostFormData(values);
      try {
        await axios.post(`${baseApi}/post`, formData, {
          withCredentials: true,
        });

        set({ isLoading: false });
      } catch {
        set({ error: "Could not create post", isLoading: false });
      }
    },
    getPostsByAuthor: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/author/${id}`, {
          withCredentials: true,
        });

        const posts = data?.data?.data as Post[];

        set({ isLoading: false, posts });
        return posts;
      } catch (err) {
        set({ error: "Could not create post", isLoading: false });
        throw err;
      }
    },
    getSinglePostBySlug: async (slug: string) => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/slug/${slug}`, {
          withCredentials: true,
        });

        const post = data?.data?.data as Post;

        set({ isLoading: false, post });
        return post;
      } catch (err) {
        set({ error: "Could not fetch post", isLoading: false });
        throw err;
      }
    },
    getSinglePostById: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/${id}`, {
          withCredentials: true,
        });

        const post = data?.data?.data as Post;

        set({ isLoading: false, post });
        return post;
      } catch (err) {
        set({ error: "Could not fetch post", isLoading: false });
        throw err;
      }
    },
    getAllPosts: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post`, {
          withCredentials: true,
        });

        const posts = data?.data?.data as Post[];

        set({ isLoading: false, posts });
        return posts;
      } catch (err) {
        set({ error: "Could not fetch post", isLoading: false });
        throw err;
      }
    },
  }));
};
