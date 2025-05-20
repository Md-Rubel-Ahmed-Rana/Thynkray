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

export const handleFetchPostId = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post> => {
  const [, id] = queryKey;
  const result = await axios.get(`${baseApi}/post/${id}`, {
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

export const getLatestPosts = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post[]> => {
  const [, limit] = queryKey;
  const result = await axios.get(
    `${baseApi}/post/latest?limit=${Number(limit)}`,
    {
      withCredentials: true,
    }
  );
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

export const getAllPosts = async ({}: QueryFunctionContext<
  [string, string]
>): Promise<Post[]> => {
  const result = await axios.get(`${baseApi}/post`, {
    withCredentials: true,
  });

  return result?.data?.data as Post[];
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

export const getPostsByAuthor = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post[]> => {
  const [, userId] = queryKey;
  const result = await axios.get(`${baseApi}/post/author/${userId}`, {
    withCredentials: true,
  });
  return result?.data?.data as Post[];
};

export const getPostsByCategory = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post[]> => {
  const [, category] = queryKey;

  const result = await axios.get(`${baseApi}/post/category/${category}`, {
    withCredentials: true,
  });

  return result?.data?.data as Post[];
};

export const getPopularPosts = async (): Promise<Post[]> => {
  const result = await axios.get(`${baseApi}/post/popular`, {
    withCredentials: true,
  });
  return result?.data?.data as Post[];
};

export const getPostsBySearched = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Post[]> => {
  const [, searchText] = queryKey;

  const result = await axios.get(
    `${baseApi}/meilisearch/posts/search?q=${searchText}`,
    {
      withCredentials: true,
    }
  );

  return result?.data?.data as Post[];
};

export const deletePost = async (id: string): Promise<void> => {
  return await axios.delete(`${baseApi}/post/${id}`, {
    withCredentials: true,
  });
};

export const incrementPostViews = async (id: string): Promise<void> => {
  return await axios.patch(`${baseApi}/post/${id}/views`, {
    withCredentials: true,
  });
};
