import axios from "axios";
import { baseApi } from "..";
import { CreateNewPost, InternationalPost, Post } from "./types";

import { QueryFunctionContext } from "@tanstack/react-query";
import makePostFormData from "@/utils/makePostFormData";

export const handleFetchPostBySlug = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post> => {
  const [, slug] = queryKey;
  const result = await axios.get(`${baseApi}/post/slug/${slug}`, {
    withCredentials: true,
  });
  return result?.data?.data as Post;
};

export const handleFetchRelatedPosts = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post[]> => {
  const [, searchText] = queryKey;
  const result = await axios.get(`${baseApi}/post/search?q=${searchText}`, {
    withCredentials: true,
  });

  return result?.data?.data as Post[];
};

export const handleFetchInternationalNews = async ({}: QueryFunctionContext<
  [string, string]
>): Promise<InternationalPost[]> => {
  const result = await axios.get(`${baseApi}/global-news`, {
    withCredentials: true,
  });

  return result?.data?.data as InternationalPost[];
};

export const createPost = async (values: CreateNewPost) => {
  const formData = makePostFormData(values);
  const result = await axios.post(`${baseApi}/post`, formData, {
    withCredentials: true,
  });
  return result.data;
};

export const updatePost = async (id: string, formData: FormData) => {
  await axios.patch(`${baseApi}/post/${id}`, formData, {
    withCredentials: true,
  });
};
