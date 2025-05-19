import { PostStoreProvider } from "@/modules/post/provider";
import { UserStoreProvider } from "@/modules/user/provider";
import { type ReactNode } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <UserStoreProvider>
      <PostStoreProvider>{children}</PostStoreProvider>
    </UserStoreProvider>
  );
};

export default StoreProvider;
