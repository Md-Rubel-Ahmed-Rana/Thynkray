import axios from "axios";
import { baseApi } from "..";
import { User } from "./types";
import { QueryFunctionContext } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export const getCurrentUser = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<User> => {
  const [, email] = queryKey;
  const result = await axios.get(`${baseApi}/user/auth/${email}`, {
    withCredentials: true,
  });

  return result?.data?.data as User;
};

export const getAuthors = async (): Promise<User[]> => {
  const result = await axios.get(`${baseApi}/user/authors`, {
    withCredentials: true,
  });
  return result?.data?.data as User[];
};

export const userLogin = async (user: {
  name: string;
  email: string;
  profile_image: string;
}) => {
  await axios.post(`${baseApi}/user`, user, {
    withCredentials: true,
  });
};

export const initializeGoogleOneTap = () => {
  window.google.accounts.id.initialize({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    callback: async (response) => {
      signIn("googleonetap", {
        credential: response.credential,
        redirect: false,
      });
      const res = await fetch("/api/auth/one-tap-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const user = await res.json();
      await userLogin({
        name: user?.name,
        email: user?.email,
        profile_image: user?.picture,
      });
    },
    auto_select: true,
    cancel_on_tap_outside: false,
  });
  window.google.accounts.id.prompt();
};

export const updateUserProfileImage = async (
  id: string,
  formData: FormData
) => {
  return await axios.post(
    `${baseApi}/user/update-profile-picture/${id}`,
    formData,
    { withCredentials: true }
  );
};

export const updateUser = async (id: string, data: Partial<User>) => {
  return await axios.patch(`${baseApi}/user/${id}`, data, {
    withCredentials: true,
  });
};
