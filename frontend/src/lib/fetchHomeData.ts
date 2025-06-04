/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/modules";
import { Discussion } from "@/modules/discussion/types";
import { InternationalPost, Post } from "@/modules/post/types";
import { Quote } from "@/modules/quote/types";
import { User } from "@/modules/user/types";
import axios from "axios";

const safeFetch = async <T>(
  fetchFn: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await fetchFn();
  } catch (error: any) {
    console.error("Fetch error:", error?.message);
    console.log(`Error to fetch data of function: ${fetchFn?.name}`);
    return fallback;
  }
};

const fetchLatestPosts = async (): Promise<Post[]> => {
  const result = await axios.get(`${baseApi}/post/latest?limit=5`);
  return result?.data?.data;
};

const fetchDiscussions = async (): Promise<Discussion[]> => {
  const result = await axios.get(
    `${baseApi}/discussion?page=1&limit=9&sortBy=desc`
  );
  return result?.data?.data?.discussions;
};

const fetchPopularPosts = async (): Promise<Post[]> => {
  const result = await axios.get(`${baseApi}/post/popular`);
  return result?.data?.data;
};

const fetchInternationalNews = async (): Promise<InternationalPost[]> => {
  const result = await axios.get(`${baseApi}/global-news`);
  return result?.data?.data;
};

const fetchAuthors = async (): Promise<User[]> => {
  const result = await axios.get(`${baseApi}/user/authors`);
  return result?.data?.data;
};

const fetchQuotes = async (): Promise<Quote[]> => {
  const result = await axios.get(`${baseApi}/quotes`);
  return result?.data?.data;
};

const fetchHomepageData = async () => {
  const [
    latestPosts,
    discussions,
    popularPosts,
    internationalPosts,
    featuredAuthors,
    quotes,
  ] = await Promise.all([
    safeFetch(fetchLatestPosts, []),
    safeFetch(fetchDiscussions, []),
    safeFetch(fetchPopularPosts, []),
    safeFetch(fetchInternationalNews, []),
    safeFetch(fetchAuthors, []),
    safeFetch(fetchQuotes, []),
  ]);

  return {
    latestPosts,
    discussions,
    popularPosts,
    internationalPosts,
    featuredAuthors,
    quotes,
  };
};

export default fetchHomepageData;

export type HomePageProps = Awaited<ReturnType<typeof fetchHomepageData>>;
