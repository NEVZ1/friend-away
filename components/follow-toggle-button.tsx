"use client";

import { useTransition } from "react";

import { toggleFollowAction } from "@/app/social/actions";
import { Button } from "@/components/ui/button";

export function FollowToggleButton({
  targetUserId,
  isFollowing
}: {
  targetUserId: string;
  isFollowing: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant={isFollowing ? "ghost" : "secondary"}
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await toggleFollowAction(targetUserId);
        });
      }}
    >
      {pending ? "Updating..." : isFollowing ? "Following" : "Connect"}
    </Button>
  );
}
