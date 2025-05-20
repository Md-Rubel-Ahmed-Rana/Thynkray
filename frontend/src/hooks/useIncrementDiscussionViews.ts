import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementDiscussionViews } from "@/modules/discussion/api";

export const useIncrementDiscussionViews = (id: string) => {
  const { query } = useRouter();
  const discussionId = query?.id as string;
  const queryClient = useQueryClient();
  const hasIncrementedRef = useRef(false);

  const { mutate } = useMutation({
    mutationFn: () => incrementDiscussionViews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussion", discussionId],
      });
    },
  });

  useEffect(() => {
    if (id && !hasIncrementedRef.current) {
      mutate();
      hasIncrementedRef.current = true;
    }
  }, [id, mutate]);
};
