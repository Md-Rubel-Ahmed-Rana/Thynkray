/* eslint-disable @typescript-eslint/no-explicit-any */
import { StateCreator } from "zustand";
import { User } from "./types";
import { produce } from "immer";
import { baseApi } from "@/zustand/api";

export interface UserSlice {
  user: User | null;
  users: User[] | [];
  isLoading: boolean;
  error: string | null;
  getUsers: () => Promise<void>;
  getUser: (id: string) => Promise<void>;
  getAuthenticatedUser: (email: string) => Promise<void>;
}

export const createUserStore: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  users: [],
  isLoading: false,
  error: null,
  getUsers: async () => {
    set(
      produce((state: UserSlice) => {
        state.isLoading = true;
        state.error = null;
      })
    );
    try {
      const res = await fetch(`${baseApi}/user`, { credentials: "include" });
      const data = await res.json();
      set(
        produce((state: UserSlice) => {
          state.users = data?.data;
          state.isLoading = false;
        })
      );
    } catch (err: any) {
      set(
        produce((state: UserSlice) => {
          state.error = err?.message || "Failed to fetch users";
          state.isLoading = false;
          state.users = [];
        })
      );
    }
  },
  getUser: async (id: string) => {
    set(
      produce((state: UserSlice) => {
        state.isLoading = true;
        state.error = null;
      })
    );
    try {
      const res = await fetch(`${baseApi}/user/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      set(
        produce((state: UserSlice) => {
          state.user = data?.data;
          state.isLoading = false;
        })
      );
    } catch (err: any) {
      set(
        produce((state: UserSlice) => {
          state.error = err?.message || "Failed to fetch users";
          state.isLoading = false;
          state.user = null;
        })
      );
    }
  },
  getAuthenticatedUser: async (email: string) => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    });
    try {
      const res = await fetch(`${baseApi}/user/auth/${email}`, {
        credentials: "include",
      });
      const data = await res.json();
      set((state) => {
        state.user = data?.data;
        state.isLoading = false;
      });
    } catch (err: any) {
      set((state) => {
        state.error = err?.message || "Failed to fetch user";
        state.isLoading = false;
      });
    }
  },
});
