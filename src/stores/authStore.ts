// src/stores/authStore.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;

  setAuth: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setAuth: (user, token) => set({ user, token, isLoggedIn: true }),
      updateUser: (user) => set({ user }),
      clearAuth: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
