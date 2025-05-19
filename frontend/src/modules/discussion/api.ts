import { QueryFunctionContext } from "@tanstack/react-query";
import { baseApi } from "..";
import { Discussions } from "./types";
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
