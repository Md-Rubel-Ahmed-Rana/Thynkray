/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand";
import { userInitialValue } from "../user/store";
import {
  Discussion,
  Discussions,
  DiscussionStore,
  NewDiscussion,
} from "./types";
import axios from "axios";
import { baseApi } from "..";

const initialDiscussionValue: Discussion = {
  id: "",
  user: userInitialValue,
  title: "",
  description: "",
  answers: [],
  _count: {
    answers: 0,
  },
  slug: "",
  tags: [],
  totalAnswer: 0,
  views: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const discussionsInitialValue: Discussions = {
  discussions: [initialDiscussionValue],
  limit: 10,
  page: 1,
  totalCount: 0,
};

export const defaultDiscussionState: DiscussionStore = {
  isLoading: false,
  isAdding: false,
  isDeleting: false,
  isUpdating: false,
  error: null,
  response: null,
  discussion: initialDiscussionValue,
  data: discussionsInitialValue,
  addDiscussion: async () => {},
  deleteDiscussion: async () => {},
  updateDiscussion: async () => {},
  getAllDiscussion: async () => {
    return discussionsInitialValue;
  },
  getSingleDiscussion: async () => {
    return initialDiscussionValue;
  },
};

export const createDiscussionStore = (
  initialState: DiscussionStore = defaultDiscussionState
) => {
  return createStore<DiscussionStore>()((set) => ({
    ...initialState,
    getAllDiscussion: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${baseApi}/discussion`, {
          withCredentials: true,
        });
        const result = res?.data?.data as Discussions;
        set({ data: result, isLoading: false });
        return result;
      } catch (err) {
        set({ error: "Could not load discussions", isLoading: false });
        throw err;
      }
    },
    getSingleDiscussion: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${baseApi}/discussion/${id}`, {
          withCredentials: true,
        });
        const discussion = res?.data?.data as Discussion;
        set({ discussion, isLoading: false });
        return discussion;
      } catch (err) {
        set({ error: "Could not load discussion", isLoading: false });
        throw err;
      }
    },
    addDiscussion: async (data: NewDiscussion): Promise<any> => {
      set({ isAdding: true });
      try {
        const res = await axios.post(`${baseApi}/discussion`, data, {
          withCredentials: true,
        });
        set({
          isAdding: false,
          response: res?.data,
        });
        return res?.data;
      } catch (err: any) {
        set({
          error: err?.message || "Could not add discussion",
          isAdding: false,
        });
      }
    },
    deleteDiscussion: async (id: string) => {
      set({ isLoading: true });
      try {
        const res = await axios.delete(`${baseApi}/discussion/${id}`, {
          withCredentials: true,
        });
        return set({
          isDeleting: false,
          response: res?.data,
        });
      } catch (err: any) {
        set({
          error: err?.message || "Could not delete discussion",
          isDeleting: false,
        });
      }
    },
    updateDiscussion: async (id: string, data: Partial<Discussion>) => {
      set({ isLoading: true });
      try {
        const res = await axios.patch(
          `${baseApi}/discussion/${id}`,
          { ...data },
          {
            withCredentials: true,
          }
        );
        set({
          isUpdating: false,
          response: res?.data,
        });
        return res?.data;
      } catch (err: any) {
        set({
          error: err?.message || "Could not update discussion",
          isUpdating: false,
        });
      }
    },
  }));
};
