import type { AuthUser, AuthToken } from "@/types";

const AUTH_TOKEN_KEY = "ditjen_auth_token";
const AUTH_USER_KEY = "ditjen_auth_user";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "admin123";

const generateToken = (username: string): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2);
  return btoa(`${username}:${timestamp}:${randomStr}`);
};

export const login = (username: string, password: string): AuthToken | null => {
  if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
    const user: AuthUser = {
      username,
      name: "Administrator",
      role: "admin",
    };

    const token = generateToken(username);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const authToken: AuthToken = {
      token,
      user,
      expiresAt,
    };

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    return authToken;
  }

  return null;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const user = localStorage.getItem(AUTH_USER_KEY);

  return !!(token && user);
};

export const getCurrentUser = (): AuthUser | null => {
  try {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};
