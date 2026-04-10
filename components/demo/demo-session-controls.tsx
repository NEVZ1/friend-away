"use client";

import { useRouter } from "next/navigation";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";

export function DemoSessionControls() {
  const router = useRouter();
  const { currentUser, logout, resetDemo } = useDemo();

  if (!currentUser || process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
        Offline mode
      </span>
      <Button
        variant="ghost"
        onClick={() => {
          resetDemo();
          router.push("/auth/login");
        }}
      >
        Reset demo
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          logout();
          router.push("/auth/login");
        }}
      >
        Log out
      </Button>
    </div>
  );
}
