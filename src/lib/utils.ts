import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export const ICON_SIZE = 15;
export const TOKEN_KEY = "token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000; // Convert exp to milliseconds
  } catch (error) {
    return true;
  }
};
