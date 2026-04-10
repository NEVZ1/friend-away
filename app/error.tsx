"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-4">
      <Card className="w-full max-w-xl space-y-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FriendAway</p>
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted">
          The app hit an unexpected error. Try the action again or restart the local server if you are in development.
        </p>
        <div>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </Card>
    </main>
  );
}
