import { createStore } from "zustand/vanilla";
import { User, UserStore } from "./types";
import { baseApi } from "..";

const userInitialValue = {
  id: "",
  name: "",
  email: "",
  designation: "",
  role: "",
  bio: "",
  profile_image: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export const defaultUserState: UserStore = {
  user: userInitialValue,
  users: [userInitialValue],
  isLoading: false,
  error: null,
  getSingleUser: async () => {
    return userInitialValue;
  },
  getAllUsers: async () => {
    return [userInitialValue];
  },
  getAuthenticatedUser: async () => {
    return userInitialValue;
  },
};

export const createUserStore = (initialState: UserStore = defaultUserState) => {
  return createStore<UserStore>()((set) => ({
    ...initialState,
    getAuthenticatedUser: async (email: string) => {
      set({ isLoading: true, error: null });

      try {
        const res = await fetch(`${baseApi}/user/auth/${email}`);
        if (!res.ok) throw new Error("Failed to fetch authenticated user");
        const result = await res.json();

        const updatedUser = { ...result?.data } as User;

        set({ user: updatedUser, isLoading: false });
        return updatedUser;
      } catch (err) {
        set({ error: "Could not load authenticated user", isLoading: false });
        throw err;
      }
    },
    getSingleUser: async (id: string) => {
      set({ isLoading: true, error: null });

      try {
        const res = await fetch(`${baseApi}/user/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const result = await res.json();

        const updatedUser = { ...result?.data } as User;

        set({ user: updatedUser, isLoading: false });
        return updatedUser;
      } catch (err) {
        set({ error: "Could not load user", isLoading: false });
        throw err;
      }
    },
    getAllUsers: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await fetch(`${baseApi}/user`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch user");
        const result = await res.json();
        const users = [...result?.data] as User[];
        set({ users: users, isLoading: false });
        return users;
      } catch (err) {
        set({ error: "Could not load users", isLoading: false });
        throw err;
      }
    },
  }));
};
