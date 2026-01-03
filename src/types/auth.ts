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

export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Address {
  location: Location;
  fullAddress: string;
  regionName: string;
}

export interface User {
  id: string;
  username: string;
  nickname: string;
  profileURI: string;
  age: number;
  gender: Gender;
  level: number;
  residence: Address;
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
  residence: Address;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
  isNewUser: boolean;
}
