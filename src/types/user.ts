export interface UserRequest {
  id?: number;
  full_name?: string;
  email?: string;
  username?: string;
  address?: string | undefined;
  role?: string | "user" | "officer" | "admin" | undefined;
}

export interface UserResponse {
  id?: number;
  full_name?: string;
  email?: string;
  username?: string;
  address?: string;
  role?: "user" | "officer" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
