// hooks/useFetchUsers.ts
import { useEffect, useRef } from "react";
import { useStore } from "@/zustand/store";
import { useSession } from "next-auth/react";

export const useGetUsers = () => {
  const { getUsers, users, isLoading, error } = useStore((state) => state);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getUsers();
      hasFetched.current = true;
    }
  }, [getUsers]);

  return { users, isLoading, error };
};

export const useGetUser = (id: string) => {
  const { getUser, user, isLoading, error } = useStore((state) => state);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      getUser(id);
      hasFetched.current = true;
    }
  }, [getUser, id]);

  return { user, isLoading, error };
};

export const useGetLoggedInUser = () => {
  const { getAuthenticatedUser, user, isLoading, error } = useStore(
    (state) => state
  );
  const { data: session, status } = useSession();
  const hasFetched = useRef(false);

  useEffect(() => {
    const email = session?.user?.email;

    if (status === "authenticated" && email && !hasFetched.current) {
      getAuthenticatedUser(email);
      hasFetched.current = true;
    }
  }, [status, session?.user?.email, getAuthenticatedUser]);

  return { user, isLoading, error };
};
