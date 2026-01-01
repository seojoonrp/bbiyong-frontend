// src/api/auth.ts

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  SetProfileRequest,
  User,
} from "../types/auth";
import client from "./client";

export const authApi = {
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

  checkUsername: async (username: string): Promise<{ exists: boolean }> => {
    const response = await client.get<{ exists: boolean }>(
      `/auth/check-username?username=${username}`
    );
    return response.data;
  },
};

export const postSetProfile = async (
  data: SetProfileRequest
): Promise<User> => {
  const response = await client.post<User>("/auth/profile", data);
  return response.data;
};
