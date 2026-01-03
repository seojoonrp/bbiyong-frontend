// src/api/auth.ts

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  SetProfileRequest,
} from "../types/auth";
import client from "./client";

export const authApi = {
  checkUsername: async (username: string): Promise<{ exists: boolean }> => {
    const response = await client.get<{ exists: boolean }>(
      `/auth/check-username?username=${username}`
    );
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await client.post<{ message: string }>(
      "/auth/register",
      data
    );
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await client.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  googleLogin: async (idToken: string) => {
    const response = await client.post<LoginResponse>("/auth/google", {
      idToken,
    });
    return response.data;
  },

  kakaoLogin: async (accessToken: string) => {
    const response = await client.post<LoginResponse>("/auth/kakao", {
      accessToken,
    });
    return response.data;
  },

  appleLogin: async (identityToken: string) => {
    const response = await client.post<LoginResponse>("/auth/apple", {
      identityToken,
    });
    return response.data;
  },

  setProfile: async (data: SetProfileRequest) => {
    const response = await client.post<{ message: string }>(
      "/auth/profile",
      data
    );
    return response.data;
  },
};
