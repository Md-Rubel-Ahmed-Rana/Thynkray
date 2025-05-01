import { createStore } from "zustand";
import { CreateNewPost, PostStore } from "./types";
import { baseApi } from "..";
import makePostFormData from "@/utils/makePostFormData";

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
        const res = await fetch(`${baseApi}/post`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to create post");

        const result = await res.json();

        set({ isLoading: false });
        return result;
      } catch (err) {
        set({ error: "Could not create post", isLoading: false });
        throw err;
      }
    },
  }));
};
