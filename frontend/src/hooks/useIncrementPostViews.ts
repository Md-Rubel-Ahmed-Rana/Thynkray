import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { incrementPostViews } from "@/modules/post/api";

export const useIncrementPostViews = (id: string) => {
  const queryClient = useQueryClient();
  const hasIncrementedRef = useRef(false);

  const { mutate } = useMutation({
    mutationFn: () => incrementPostViews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "post"],
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
