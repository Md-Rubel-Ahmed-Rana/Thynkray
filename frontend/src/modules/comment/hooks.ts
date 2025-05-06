import { useEffect } from "react";
import { useCommentStore } from "./provider";
import { Comment } from "./types";

export const useGetCommentsByPostId = (
  postId: string
): {
  comments: Comment[];
  isLoading: boolean;
} => {
  const { getCommentsByPostId, comments, isLoading } = useCommentStore(
    (state) => state
  );

  useEffect(() => {
    getCommentsByPostId(postId);
  }, [getCommentsByPostId, postId]);

  return { comments, isLoading };
};
