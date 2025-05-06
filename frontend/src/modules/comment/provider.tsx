import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createCommentStore } from "./store";
import { CommentStore } from "./types";

export type CommentStoreApi = ReturnType<typeof createCommentStore>;

export const CommentStoreContext = createContext<CommentStoreApi | undefined>(
  undefined
);

export type CommentStoreProviderProps = {
  children: ReactNode;
};

export const CommentStoreProvider = ({
  children,
}: CommentStoreProviderProps) => {
  const storeRef = useRef<CommentStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createCommentStore();
  }

  return (
    <CommentStoreContext.Provider value={storeRef.current}>
      {children}
    </CommentStoreContext.Provider>
  );
};

export const useCommentStore = <T,>(
  selector: (store: CommentStore) => T
): T => {
  const commentStoreContext = useContext(CommentStoreContext);

  if (!commentStoreContext) {
    throw new Error(`useUserStore must be used within CounterStoreProvider`);
  }

  return useStore(commentStoreContext, selector);
};
