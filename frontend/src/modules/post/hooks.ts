/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { usePostStore } from "./provider";
import { CreateNewPost, InternationalPost, Post } from "./types";

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

export const useGetPostById = (
  id: string
): {
  isLoading: boolean;
  error: string | null;
  post: Post;
} => {
  const { getSinglePostById, error, isLoading, post } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getSinglePostById(id);
  }, [getSinglePostById, id]);

  return { post, error, isLoading };
};

export const useGetPostBySlug = (
  slug: string
): {
  isLoading: boolean;
  error: string | null;
  post: Post;
} => {
  const { getSinglePostBySlug, error, isLoading, post } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getSinglePostBySlug(slug);
  }, [getSinglePostBySlug, slug]);

  return { post, error, isLoading };
};

export const useAllGetPosts = (): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getAllPosts, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return { posts, error, isLoading };
};

export const useGetLatestPosts = (
  limit?: number
): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getLatestPosts, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getLatestPosts(limit);
  }, [getLatestPosts]);

  return { posts, error, isLoading };
};

export const useGetPostsByCategory = (
  category: string
): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getPostsByCategory, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getPostsByCategory(category);
  }, [category, getPostsByCategory]);

  return { posts, error, isLoading };
};

export const useGetPostsBySearched = (
  searchText: string
): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getPostsBySearched, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    getPostsBySearched(searchText);
  }, [searchText, getPostsBySearched]);

  return { posts, error, isLoading };
};

export const useGetRelatedPosts = (
  searchText: string
): {
  isLoading: boolean;
  error: string | null;
  posts: Post[];
} => {
  const { getRelatedPosts, error, isLoading, posts } = usePostStore(
    (state) => state
  );

  useEffect(() => {
    if (posts?.length === 0) {
      getRelatedPosts(searchText);
    }
  }, [searchText, getRelatedPosts, posts?.length]);

  return { posts, error, isLoading };
};

export const useGetInternationalPosts = (): {
  isLoading: boolean;
  error: string | null;
  news: InternationalPost[];
} => {
  const getInternationalPosts = usePostStore(
    (state) => state.getInternationalPosts
  );

  const { error, isLoading, news } = usePostStore((state) => state);

  useEffect(() => {
    if (news?.length === 0) {
      getInternationalPosts();
    }
  }, [getInternationalPosts, news?.length]);

  return { news, error, isLoading };
};
export const useDeletePost = (): {
  isLoading: boolean;
  deletePost: (id: string, authorId: string) => Promise<void>;
} => {
  const { deletePost, isLoading } = usePostStore((state) => state);

  return { deletePost, isLoading };
};

export const useUpdatePost = (): {
  isLoading: boolean;
  updatePost: (id: string, formData: FormData) => Promise<void>;
} => {
  const { updatePost, isLoading } = usePostStore((state) => state);

  return { updatePost, isLoading };
};
