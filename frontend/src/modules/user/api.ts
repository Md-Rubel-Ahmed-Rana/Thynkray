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
