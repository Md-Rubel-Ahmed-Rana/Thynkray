import { createStore } from "zustand";
import { CreateNewPost, InternationalPost, Post, PostStore } from "./types";
import { baseApi } from "..";
import makePostFormData from "@/utils/makePostFormData";
import axios from "axios";
import { userInitialValue } from "../user/store";

const globalInitialValue: InternationalPost = {
  source: { id: "", name: "" },
  author: "",
  title: "T",
  description: "",
  url: "",
  urlToImage: "",
  publishedAt: "",
};

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
  news: [],
  createNewPost: async () => {},
  getPostsByAuthor: async () => {
    return [initialPostValue];
  },
  getAllPosts: async () => {
    return [initialPostValue];
  },
  getLatestPosts: async () => {
    return [initialPostValue];
  },
  getPostsBySearched: async () => {
    return [initialPostValue];
  },
  getInternationalPosts: async () => {
    return [globalInitialValue];
  },
  getPostsByCategory: async () => {
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
        set({ error: "Could not fetch posts", isLoading: false });
        throw err;
      }
    },
    getLatestPosts: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/latest`, {
          withCredentials: true,
        });

        const posts = data?.data?.data as Post[];

        set({ isLoading: false, posts });
        return posts;
      } catch (err) {
        set({ error: "Could not fetch posts", isLoading: false });
        throw err;
      }
    },
    getPostsByCategory: async (category: string) => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/category/${category}`, {
          withCredentials: true,
        });

        const posts = data?.data?.data as Post[];

        set({ isLoading: false, posts });
        return posts;
      } catch (err) {
        set({ error: "Could not fetch posts", isLoading: false });
        throw err;
      }
    },
    getPostsBySearched: async (searchText: string) => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/search?q=${searchText}`, {
          withCredentials: true,
        });

        const posts = data?.data?.data as Post[];

        set({ isLoading: false, posts });
        return posts;
      } catch (err) {
        set({ error: "Could not fetch posts", isLoading: false });
        throw err;
      }
    },
    getInternationalPosts: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/global-news`, {
          withCredentials: true,
        });

        const posts = data?.data?.data as InternationalPost[];

        set({ isLoading: false, news: posts });
        return posts;
      } catch (err) {
        set({ error: "Could not fetch news", isLoading: false });
        throw err;
      }
    },
  }));
};
