import { usePostStore } from "./provider";
import { CreateNewPost } from "./types";

export const useCreatePostMutation = (): {
  isLoading: boolean;
  error: string | null;
  createPost: (values: CreateNewPost) => Promise<void>;
} => {
  const { createNewPost, error, isLoading } = usePostStore((state) => state);

  return { createPost: createNewPost, error, isLoading };
};
