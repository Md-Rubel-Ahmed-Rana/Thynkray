import { createUserStore, UserSlice } from "@/modules/user/api";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type StoreState = UserSlice;

export const useStore = create<StoreState>()(
  immer((...a) => ({
    ...createUserStore(...a),
  }))
);
