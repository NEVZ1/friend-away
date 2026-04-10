import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-primary text-white shadow-soft hover:bg-primary/90",
        variant === "secondary" && "bg-sky-50 text-primary hover:bg-sky-100",
        variant === "ghost" && "bg-white/70 text-text hover:bg-white",
        className
      )}
      {...props}
    />
  );
}
