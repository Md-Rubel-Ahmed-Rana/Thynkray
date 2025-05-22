import axios from "axios";
import { baseApi } from "..";
import { Chat, Message } from "./types";
import { QueryFunctionContext } from "@tanstack/react-query";

export const getChatListByUser = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Chat[]> => {
  const [, userId] = queryKey;
  const res = await axios.get(`${baseApi}/openai/chats/${userId}`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const getMessageByChatId = async ({
  queryKey,
}: QueryFunctionContext<[string, string]>): Promise<Message[]> => {
  const [, chatId] = queryKey;
  const res = await axios.get(`${baseApi}/openai/chats/messages/${chatId}/`, {
    withCredentials: true,
  });
  return res.data.data;
};
