import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd. MMMM yyyy", { locale: de });
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "dd.MM.yyyy", { locale: de });
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
