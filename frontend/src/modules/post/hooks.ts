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
