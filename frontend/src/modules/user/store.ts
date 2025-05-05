/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from "zustand/vanilla";
import { UpdateProfileImage, User, UserStore } from "./types";
import { baseApi } from "..";
import axios from "axios";

export const userInitialValue = {
  id: "",
  name: "",
  email: "",
  designation: "",
  role: "",
  bio: "",
  posts: 0,
  profile_image: "",
  created_at: new Date(),
  updated_at: new Date(),
};

export const defaultUserState: UserStore = {
  user: userInitialValue,
  users: [userInitialValue],
  isLoading: false,
  isError: false,
  error: null,
  response: null,
  getSingleUser: async () => {
    return userInitialValue;
  },
  getAllUsers: async () => {
    return [userInitialValue];
  },
  getAuthors: async () => {
    return [userInitialValue];
  },
  getAuthenticatedUser: async () => {
    return userInitialValue;
  },
  userLogin: async () => {},
  updateUserProfileImage: async () => {},
  refetchUser: async () => {},
  updateUser: async () => {},
};

export const createUserStore = (initialState: UserStore = defaultUserState) => {
  return createStore<UserStore>()((set, get) => ({
    ...initialState,
    userLogin: async (user: {
      name: string;
      email: string;
      profile_image: string;
    }) => {
      set({ isLoading: true, error: null });

      try {
        await axios.post(`${baseApi}/user`, user, {
          withCredentials: true,
        });
      } catch (err) {
        throw err;
      }
    },
    getAuthenticatedUser: async (email: string) => {
      set({ isLoading: true, error: null });

      try {
        const result = await axios.get(`${baseApi}/user/auth/${email}`, {
          withCredentials: true,
        });

        const updatedUser = { ...result?.data?.data } as User;

        set({ user: updatedUser, isLoading: false });
        return updatedUser;
      } catch {
        set({ error: "Could not load authenticated user", isLoading: false });
        return userInitialValue;
      }
    },
    getSingleUser: async (id: string) => {
      set({ isLoading: true, error: null });

      try {
        const res = await axios.get(`${baseApi}/user/${id}`, {
          withCredentials: true,
        });
        const updatedUser = { ...res?.data?.data } as User;
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
        const res = await axios.get(`${baseApi}/user`, {
          withCredentials: true,
        });
        const users = [...res?.data?.data] as User[];
        set({ users: users, isLoading: false });
        return users;
      } catch (err) {
        set({ error: "Could not load users", isLoading: false });
        throw err;
      }
    },
    getAuthors: async () => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.get(`${baseApi}/user/authors`, {
          withCredentials: true,
        });
        const users = [...res?.data?.data] as User[];
        set({ users: users, isLoading: false });
        return users;
      } catch (err) {
        set({ error: "Could not load users", isLoading: false });
        throw err;
      }
    },
    updateUserProfileImage: async (data: UpdateProfileImage): Promise<any> => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.post(
          `${baseApi}/user/update-profile-picture/${data.id}`,
          data.formData,
          { withCredentials: true }
        );
        await get().refetchUser();
        return set({
          isLoading: false,
          response: res?.data,
        });
      } catch (err: any) {
        set({
          error: err?.message || "Could not update user profile image",
          isLoading: false,
          isError: true,
        });
        return null;
      }
    },
    refetchUser: async () => {
      try {
        const email = get().user.email;
        const result = await axios.get(`${baseApi}/user/auth/${email}`, {
          withCredentials: true,
        });

        const updatedUser = { ...result?.data?.data } as User;
        return set({ user: updatedUser });
      } catch (error: any) {
        set({
          error: error?.message || "Failed to refetch user",
          isLoading: false,
          isError: true,
        });
      }
    },
    updateUser: async (id: string, data: Partial<User>): Promise<any> => {
      set({ isLoading: true, error: null });
      try {
        const res = await axios.patch(`${baseApi}/user/${id}`, data, {
          withCredentials: true,
        });
        await get().refetchUser();
        return set({
          isLoading: false,
          response: res?.data,
        });
      } catch (err: any) {
        set({
          error: err?.message || "Could not update user",
          isLoading: false,
          isError: true,
        });
        return null;
      }
    },
  }));
};
