import { useEffect } from "react";
import { usePostStore } from "./provider";
import { CreateNewPost, Post } from "./types";

export const useCreatePostMutation = (): {
  isLoading: boolean;
  error: string | null;
  createPost: (values: CreateNewPost) => Promise<void>;
} => {
  const { createNewPost, error, isLoading } = usePostStore((state) => state);

  return { createPost: createNewPost, error, isLoading };
};

export const useGetPostsByAuthor = (
  id: string
): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getPostsByAuthor, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getPostsByAuthor(id);
  }, [getPostsByAuthor, id]);

  return { posts, error, isLoading };
};

export const useGetPostById = (
  id: string
): {
  isLoading: boolean;
  error: string | null;
  post: Post;
} => {
  const { getSinglePostById, error, isLoading, post } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getSinglePostById(id);
  }, [getSinglePostById, id]);

  return { post, error, isLoading };
};

export const useGetPostBySlug = (
  slug: string
): {
  isLoading: boolean;
  error: string | null;
  post: Post;
} => {
  const { getSinglePostBySlug, error, isLoading, post } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getSinglePostBySlug(slug);
  }, [getSinglePostBySlug, slug]);

  return { post, error, isLoading };
};

export const useAllGetPosts = (): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getAllPosts, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return { posts, error, isLoading };
};
