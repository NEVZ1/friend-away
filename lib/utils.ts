import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(input: string) {
  const date = new Date(input);
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(date);
}

export function getArrivalCohort(arrivalDate: string) {
  const date = new Date(arrivalDate);
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric"
  }).format(date);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
