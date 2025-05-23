import axios from "axios";
import { NewAnswer } from "./type";
import { baseApi } from "..";

export const createAnswer = async (data: NewAnswer): Promise<void> => {
  return await axios.post(`${baseApi}/answer`, data, {
    withCredentials: true,
  });
};

export const deleteAnswer = async (id: string): Promise<void> => {
  return await axios.delete(`${baseApi}/answer/${id}`, {
    withCredentials: true,
  });
};

export const updateAnswer = async (
  id: string,
  content: string
): Promise<void> => {
  return await axios.patch(
    `${baseApi}/answer/${id}`,
    { content },
    {
      withCredentials: true,
    }
  );
};
