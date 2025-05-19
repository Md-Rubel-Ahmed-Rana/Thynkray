import { QueryFunctionContext } from "@tanstack/react-query";
import { baseApi } from "..";
import { Discussion, Discussions, NewDiscussion } from "./types";
import axios from "axios";

interface QueryParams {
  page: number;
  limit: number;
  sortBy: "asc" | "desc";
  searchText: string;
}

export const getAllDiscussions = async ({
  queryKey,
}: QueryFunctionContext<[string, QueryParams]>): Promise<Discussions> => {
  const [, { page, limit, sortBy, searchText }] = queryKey;

  const result = await axios.get(
    `${baseApi}/discussion?page=${page}&limit=${limit}&searchText=${searchText}&sortBy=${sortBy}`,
    {
      withCredentials: true,
    }
  );

  return result?.data?.data as Discussions;
};

export const getSingleDiscussion = async (id: string): Promise<Discussion> => {
  const result = await axios.get(`${baseApi}/discussion/${id}`, {
    withCredentials: true,
  });

  return result?.data?.data as Discussion;
};

export const createDiscussion = async (
  data: NewDiscussion
): Promise<Discussion> => {
  const res = await axios.post(`${baseApi}/discussion`, data, {
    withCredentials: true,
  });
  return res.data;
};
