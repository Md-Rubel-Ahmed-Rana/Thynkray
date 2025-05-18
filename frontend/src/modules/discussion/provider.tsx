import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import { DiscussionStore } from "./types";
import { createDiscussionStore } from "./store";

export type DiscussionStoreApi = ReturnType<typeof createDiscussionStore>;

export const DiscussionStoreContext = createContext<
  DiscussionStoreApi | undefined
>(undefined);

export type DiscussionStoreProviderProps = {
  children: ReactNode;
};

export const DiscussionStoreProvider = ({
  children,
}: DiscussionStoreProviderProps) => {
  const storeRef = useRef<DiscussionStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createDiscussionStore();
  }

  return (
    <DiscussionStoreContext.Provider value={storeRef.current}>
      {children}
    </DiscussionStoreContext.Provider>
  );
};

export const useDiscussionStore = <T,>(
  selector: (store: DiscussionStore) => T
): T => {
  const context = useContext(DiscussionStoreContext);

  if (!context) {
    throw new Error(`useDiscussionStore must be used within StoreProvider`);
  }

  return useStore(context, selector);
};
