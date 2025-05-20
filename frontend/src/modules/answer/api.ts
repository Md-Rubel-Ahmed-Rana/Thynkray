import axios from "axios";
import { NewAnswer } from "./type";
import { baseApi } from "..";

export const createAnswer = async (data: NewAnswer): Promise<void> => {
  return await axios.post(`${baseApi}/answer`, data, {
    withCredentials: true,
  });
};
