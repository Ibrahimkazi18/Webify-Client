import { type ClassValue, clsx } from "clsx"
import { format, intervalToDuration } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-IN", {
  style : "currency",
  currency : "INR"
})

export function convertToDate(timestamp: { seconds: number; nanoseconds: number }): Date | null {
  if (timestamp && typeof timestamp.seconds === 'number' && typeof timestamp.nanoseconds === 'number') {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
  return null;
}
