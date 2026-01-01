// src/stores/authStore.ts

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { authApi } from "../api/auth";
import { LoginRequest, LoginResponse, Provider, User } from "../types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;

  login: (data: LoginRequest) => Promise<void>;
  socialLogin: (provider: Provider, token: string) => Promise<LoginResponse>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: async (data) => {
        const response = await authApi.login(data);
        set({
          user: response.user,
          token: response.accessToken,
          isLoggedIn: true,
        });
      },

      socialLogin: async (provider, token) => {
        let response;
        if (provider === Provider.Google)
          response = await authApi.googleLogin(token);
        else if (provider === Provider.Kakao)
          response = await authApi.kakaoLogin(token);
        else if (provider === Provider.Apple)
          response = await authApi.appleLogin(token);
        else throw new Error("Unsupported provider");

        set({
          user: response.user,
          token: response.accessToken,
          isLoggedIn: true,
        });

        return response;
      },

      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
