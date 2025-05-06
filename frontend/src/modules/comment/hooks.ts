/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useCommentStore } from "./provider";
import { Comment, NewComment } from "./types";

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

export const useAddNewComment = (): {
  response: any;
  isLoading: boolean;
  addComment: (data: NewComment) => any;
} => {
  const { addComment, isLoading, response } = useCommentStore((state) => state);

  return { addComment, isLoading, response };
};
