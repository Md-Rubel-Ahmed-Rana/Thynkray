import { UserStoreProvider } from "@/modules/user/provider";
import { type ReactNode } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  return <UserStoreProvider>{children}</UserStoreProvider>;
};

export default StoreProvider;
