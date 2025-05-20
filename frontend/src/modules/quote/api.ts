import axios from "axios";
import { baseApi } from "..";
import { Quote } from "./types";

export const getQuotes = async (): Promise<Quote[]> => {
  const result = await axios.get(`${baseApi}/quotes`, {
    withCredentials: true,
  });
  return result?.data?.data as Quote[];
};
