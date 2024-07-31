import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const ICON_SIZE = 15;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
