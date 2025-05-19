import { createStore } from "zustand";
import { InternationalPost, Post, PostStore } from "./types";
import { baseApi } from "..";
import axios from "axios";
import { userInitialValue } from "../user/store";

export const initialPostValue: Post = {
  id: "",
  title: "",
  category: "",
  description: "",
  slug: "",
  tags: [],
  thumbnail: "",
  comments: 0,
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
  getRelatedPosts: async () => {
    return [initialPostValue];
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
  deletePost: async () => {},
  updatePost: async () => {},
};

export const createPostStore = (initialState: PostStore = defaultPostState) => {
  return createStore<PostStore>()((set, get) => ({
    ...initialState,
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
    getLatestPosts: async (limit: number = 5) => {
      set({ isLoading: true, error: null });
      try {
        const data = await axios.get(`${baseApi}/post/latest?limit=${limit}`, {
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
        const data = await axios.get(
          `${baseApi}/meilisearch/posts/search?q=${searchText}`,
          {
            withCredentials: true,
          }
        );

        const posts = data?.data?.data as Post[];

        set({ isLoading: false, posts });
        return posts;
      } catch (err) {
        set({ error: "Could not fetch posts", isLoading: false });
        throw err;
      }
    },
    deletePost: async (id: string, authorId: string) => {
      set({ isLoading: true });
      try {
        await axios.delete(`${baseApi}/post/${id}`, {
          withCredentials: true,
        });
        await get().getPostsByAuthor(authorId);
        set({ isLoading: false });
      } catch {
        set({ isLoading: false, error: "Failed to delete post" });
      }
    },
    updatePost: async (id: string, formData: FormData) => {
      set({ isLoading: true, error: null });
      try {
        await axios.patch(`${baseApi}/post/${id}`, formData, {
          withCredentials: true,
        });

        set({ isLoading: false });
      } catch {
        set({ error: "Could not update post", isLoading: false });
      }
    },
  }));
};
