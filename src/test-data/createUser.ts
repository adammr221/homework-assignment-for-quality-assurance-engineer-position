import type { User } from "../types/user";

export function createUser(): User {
  const uniqueId = Date.now().toString().slice(-6);
  return {
    username: `testuser${uniqueId}`,
    email: `test${uniqueId}@test.com`,
    password: "Password123",
  };
}
