import { DiscussionStoreProvider } from "@/modules/discussion/provider";
import { PostStoreProvider } from "@/modules/post/provider";
import { UserStoreProvider } from "@/modules/user/provider";
import { type ReactNode } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  return (
    <UserStoreProvider>
      <PostStoreProvider>
        <DiscussionStoreProvider>{children}</DiscussionStoreProvider>
      </PostStoreProvider>
    </UserStoreProvider>
  );
};

export default StoreProvider;
