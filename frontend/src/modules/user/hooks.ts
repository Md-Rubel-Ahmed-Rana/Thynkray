import { useEffect, useRef } from "react";
import { useUserStore } from "./provider";
import { User } from "./types";
import { useSession } from "next-auth/react";

export const useGetSingleUser = (
  id: string
): {
  user: User;
  isLoading: boolean;
  error: string | null;
} => {
  const { getSingleUser, user, isLoading, error } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    getSingleUser(id);
  }, [id, getSingleUser]);

  return { user, isLoading, error };
};

export const useGetLoggedInUser = (): {
  user: User;
  isLoading: boolean;
  error: string | null;
} => {
  const { getAuthenticatedUser, user, isLoading, error } = useUserStore(
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

export const useGetAllUsers = (): {
  users: User[];
  isLoading: boolean;
  error: string | null;
} => {
  const { getAllUsers, users, isLoading, error } = useUserStore(
    (state) => state
  );

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return { users, isLoading, error };
};
