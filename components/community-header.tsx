"use client";

import { MapPin, Users } from "lucide-react";
import { useState } from "react";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Community } from "@/lib/types";

export function CommunityHeader({ community }: { community: Community }) {
  const { toggleCommunityMembership } = useDemo();
  const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL;
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <Card className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Community</p>
          <h1 className="mt-2 text-3xl font-semibold">{community.name}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">{community.description}</p>
        </div>
        <Button
          variant={community.is_joined ? "ghost" : "primary"}
          onClick={() => {
            if (isDemo) {
              toggleCommunityMembership(community.id);
              setFeedback(community.is_joined ? "Left community" : "Joined community");
              window.setTimeout(() => setFeedback(null), 1500);
            }
          }}
        >
          {community.is_joined ? "Joined" : "Join community"}
        </Button>
      </div>
      {feedback ? <p className="text-sm text-accent">{feedback}</p> : null}
      <div className="flex flex-wrap gap-3 text-sm text-muted">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <MapPin className="h-4 w-4" />
          {community.city}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <Users className="h-4 w-4" />
          {community.members_count ?? 0} members
        </span>
      </div>
    </Card>
  );
}
