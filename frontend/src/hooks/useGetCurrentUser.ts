import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/modules/user/api";
import { User } from "@/modules/user/types";

export const useGetCurrentUser = () => {
  const { data: session } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", session?.user?.email as string],
    queryFn: getCurrentUser,
    enabled: !!session?.user?.email,
  });

  const user = data as User;

  return { user, isLoading, error };
};
