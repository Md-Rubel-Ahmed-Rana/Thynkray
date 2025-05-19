import axios from "axios";
import { Comment, NewComment } from "./types";
import { baseApi } from "..";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getCommentsByPostId = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Comment[]> => {
  const [, postId] = queryKey;
  const res = await axios.get(`${baseApi}/comment/post/${postId}`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const addComment = async (data: NewComment): Promise<Comment> => {
  const res = await axios.post(`${baseApi}/comment`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteComment = async (
  commentId: string
): Promise<{ message: string }> => {
  const res = await axios.delete(`${baseApi}/comment/${commentId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const updateComment = async ({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}): Promise<Comment> => {
  const res = await axios.patch(
    `${baseApi}/comment/${commentId}`,
    { content },
    { withCredentials: true }
  );
  return res.data;
};
