import type { APIResponse } from "@playwright/test";

export interface Credentials {
  email: string;
  password: string;
}

export interface User extends Credentials {
  username: string;
}

export interface UserResponse {
  user: {
    email: string;
    username: string;
    token: string;
    bio: string | null;
    image: string | null;
  };
}

export interface RegisteredUser {
  user: User;
  response: APIResponse;
}
