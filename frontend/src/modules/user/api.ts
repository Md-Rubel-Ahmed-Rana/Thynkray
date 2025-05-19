import axios from "axios";
import { baseApi } from "..";
import { User } from "./types";
import { QueryFunctionContext } from "@tanstack/react-query";

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
