// src/services/authService.ts

import { authApi } from "../api/auth";
import { useAuthStore } from "../stores/authStore";
import {
  LoginRequest,
  Provider,
  RegisterRequest,
  SetProfileRequest,
} from "../types/auth";

export const authService = {
  checkUsername: async (username: string) => {
    const response = await authApi.checkUsername(username);
    return response;
  },

  register: async (data: RegisterRequest) => {
    const response = await authApi.register(data);

    console.log("Register successful");
    return response;
  },

  login: async (data: LoginRequest) => {
    const response = await authApi.login(data);
    useAuthStore.getState().setAuth(response.user, response.accessToken);

    console.log("Login successful");
    console.log("Token:", response.accessToken);
    return response;
  },

  socialLogin: async (provider: Provider, token: string) => {
    let response;
    if (provider === Provider.Google)
      response = await authApi.googleLogin(token);
    else if (provider === Provider.Kakao)
      response = await authApi.kakaoLogin(token);
    else if (provider === Provider.Apple)
      response = await authApi.appleLogin(token);
    else throw new Error("Unsupported provider");

    useAuthStore.getState().setAuth(response.user, response.accessToken);

    console.log("Social login successful (" + provider + ")");
    console.log("Token:", response.accessToken);
    return response;
  },

  setProfile: async (data: SetProfileRequest) => {
    const response = await authApi.setProfile(data);
    return response;
  },

  logout: () => {
    useAuthStore.getState().clearAuth();
  },
};
