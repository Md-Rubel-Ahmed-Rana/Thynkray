/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
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
  }, [id]);

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
    if (!post?.id) {
      getSinglePostById(id);
    }
  }, [id]);

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
    if (!post?.id) {
      getSinglePostBySlug(slug);
    }
  }, [slug]);

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
  }, []);

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
  }, []);

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
  }, [category]);

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
  }, [searchText]);

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
  }, [searchText]);

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

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      getInternationalPosts();
      hasFetchedRef.current = true;
    }
  }, []);

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
