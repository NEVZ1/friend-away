import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass-panel rounded-2xl border border-white/70 bg-card p-5 shadow-soft", className)}
      {...props}
    />
  );
}
