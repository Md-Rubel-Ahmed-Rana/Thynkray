import { createContext, ReactNode, useContext, useRef } from "react";
import { createPostStore } from "./store";
import { PostStore } from "./types";
import { useStore } from "zustand";

export type PostStoreApi = ReturnType<typeof createPostStore>;

export const PostStoreContext = createContext<PostStoreApi | undefined>(
  undefined
);

export type PostStoreProviderProps = {
  children: ReactNode;
};

export const PostStoreProvider = ({ children }: PostStoreProviderProps) => {
  const storeRef = useRef<PostStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createPostStore();
  }

  return (
    <PostStoreContext.Provider value={storeRef.current}>
      {children}
    </PostStoreContext.Provider>
  );
};

export const usePostStore = <T,>(selector: (store: PostStore) => T): T => {
  const postStoreContext = useContext(PostStoreContext);

  if (!postStoreContext) {
    throw new Error(`useUserStore must be used within CounterStoreProvider`);
  }

  return useStore(postStoreContext, selector);
};
