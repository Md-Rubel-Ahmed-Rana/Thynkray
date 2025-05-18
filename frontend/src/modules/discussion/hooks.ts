/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDiscussionStore } from "./provider";
import { Discussion, Discussions, NewDiscussion } from "./types";

export const useGetAllDiscussions = (
  page?: number,
  limit?: number,
  searchText?: string,
  sortBy?: "asc" | "desc"
): {
  data: Discussions;
  isLoading: boolean;
} => {
  const { data, isLoading, getAllDiscussion } = useDiscussionStore(
    (state) => state
  );

  useEffect(() => {
    getAllDiscussion(page, limit, searchText, sortBy);
  }, [page, limit]);

  return { data, isLoading };
};

export const useGetSingleDiscussion = (
  id: string
): {
  discussion: Discussion;
  isLoading: boolean;
} => {
  const { discussion, isLoading, getSingleDiscussion } = useDiscussionStore(
    (state) => state
  );

  useEffect(() => {
    getSingleDiscussion(id);
  }, [getSingleDiscussion, id]);

  return { discussion, isLoading };
};

export const useAddNewDiscussion = (): {
  response: any;
  isAdding: boolean;
  addDiscussion: (data: NewDiscussion) => any;
} => {
  const { addDiscussion, isAdding, response } = useDiscussionStore(
    (state) => state
  );
  return { addDiscussion, isAdding, response };
};

export const useDeleteDiscussion = (): {
  response: any;
  isDeleting: boolean;
  deleteDiscussion: (id: string) => any;
} => {
  const { deleteDiscussion, isDeleting, response } = useDiscussionStore(
    (state) => state
  );

  return { deleteDiscussion, isDeleting, response };
};

export const useUpdateDiscussion = (): {
  response: any;
  isUpdating: boolean;
  updateDiscussion: (id: string, updatedData: Partial<Discussion>) => any;
} => {
  const { updateDiscussion, isUpdating, response } = useDiscussionStore(
    (state) => state
  );
  return { updateDiscussion, isUpdating, response };
};
