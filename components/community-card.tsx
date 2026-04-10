"use client";

import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { useState } from "react";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Community } from "@/lib/types";
import { slugify } from "@/lib/utils";

export function CommunityCard({ community }: { community: Community }) {
  const { toggleCommunityMembership } = useDemo();
  const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL;
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <Card className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-3">
        <Link href={`/communities/${slugify(community.name)}`} className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">{community.name}</p>
            <p className="text-sm text-muted">{community.city}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted" />
        </Link>
        <p className="text-sm text-slate-600">
          {community.description ??
            (community.country_origin
              ? `Meet people from ${community.country_origin} who are building a local circle in ${community.city}.`
              : `A city-first group for new arrivals, local advice, and meetup planning.`)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm text-muted">
          <Users className="h-4 w-4" />
          {community.members_count ?? 0} members
        </span>
        <Button
          variant={community.is_joined ? "ghost" : "secondary"}
          onClick={() => {
            if (isDemo) {
              toggleCommunityMembership(community.id);
              setFeedback(community.is_joined ? "Left community" : "Joined community");
              window.setTimeout(() => setFeedback(null), 1500);
            }
          }}
        >
          {community.is_joined ? "Joined" : "Join"}
        </Button>
      </div>
      {feedback ? <p className="text-sm text-accent">{feedback}</p> : null}
    </Card>
  );
}
