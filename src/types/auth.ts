// src/types/auth.ts

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
  Undefined = "UNDEFINED",
}

export enum Provider {
  Local = "LOCAL",
  Google = "GOOGLE",
  Kakao = "KAKAO",
  Apple = "APPLE",
}

export interface User {
  id: string;
  username: string;
  nickname: string;
  profileURI: string;
  age: number;
  gender: Gender;
  level: number;
  residence: string;
  provider: Provider;
  socialID?: string;
  socialEmail?: string;
  isProfileSet: boolean;
  createdAt: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SetProfileRequest {
  nickname: string;
  profileURI: string;
  age: number;
  gender: Gender;
  residence: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  isNewUser: boolean;
}
