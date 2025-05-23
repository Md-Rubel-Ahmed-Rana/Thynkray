import { QueryFunctionContext } from "@tanstack/react-query";
import { baseApi } from "..";
import {
  Discussion,
  Discussions,
  NewDiscussion,
  UpdateDiscussion,
} from "./types";
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

export const getDiscussionsByUser = async (
  userId: string
): Promise<Discussion[]> => {
  const result = await axios.get(`${baseApi}/discussion/me/${userId}`, {
    withCredentials: true,
  });

  return result?.data?.data as Discussion[];
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

export const updateDiscussion = async (
  id: string,
  data: UpdateDiscussion
): Promise<Discussion> => {
  const res = await axios.patch(`${baseApi}/discussion/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const incrementDiscussionViews = async (
  id: string
): Promise<Discussion> => {
  const res = await axios.patch(`${baseApi}/discussion/${id}/views`, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteDiscussion = async (
  id: string
): Promise<{ message: string }> => {
  const res = await axios.delete(`${baseApi}/discussion/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
