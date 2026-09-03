import type { User } from "../types/user";

export const userWithInvalidEmail: User = {
  username: "testuser",
  email: "wrong-email",
  password: "Password123",
};

export const userWithEmptyUsername: User = {
  username: "",
  email: "wrong-email",
  password: "Password123",
};

export const userWithEmptyEmail: User = {
  username: "testuser",
  email: "",
  password: "Password123",
};

export const userWithEmptyPassword: User = {
  username: "testuser",
  email: "wrong-email",
  password: "",
};
