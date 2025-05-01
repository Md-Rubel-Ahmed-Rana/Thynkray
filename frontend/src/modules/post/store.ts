import { createStore } from "zustand";
import { CreateNewPost, PostStore } from "./types";
import { baseApi } from "..";
import makePostFormData from "@/utils/makePostFormData";
import axios from "axios";

export const defaultPostState: PostStore = {
  isLoading: false,
  error: null,
  createNewPost: async () => {},
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
  }));
};
