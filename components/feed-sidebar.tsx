import { ArrowRight, Globe2, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { communities, peopleLikeYou } from "@/lib/mock-data";
import type { UserProfile } from "@/lib/types";
import { UserAvatar } from "@/components/user-avatar";
import { getArrivalCohort } from "@/lib/utils";

export function FeedSidebar({ user }: { user: UserProfile }) {
  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <p className="text-sm font-semibold">Your arrival cohort</p>
        </div>
        <h2 className="text-xl font-semibold">{getArrivalCohort(user.arrival_date)}</h2>
        <p className="text-sm text-slate-600">Meet other people landing in {user.current_city} this month.</p>
        <Button className="w-full justify-between">
          Open cohort
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Card>
      <Card className="space-y-4">
        <div className="flex items-center gap-2 text-secondary">
          <Users className="h-4 w-4" />
          <p className="text-sm font-semibold">People like you</p>
        </div>
        <div className="space-y-3">
          {peopleLikeYou.map((person) => (
            <div key={person.id} className="flex items-center gap-3">
              <UserAvatar name={person.name} avatarUrl={person.avatar_url} className="h-10 w-10" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{person.name}</p>
                <p className="truncate text-xs text-muted">
                  {person.country_origin} in {person.current_city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="space-y-3">
        <div className="flex items-center gap-2 text-accent">
          <Globe2 className="h-4 w-4" />
          <p className="text-sm font-semibold">Trending communities</p>
        </div>
        {communities.slice(0, 2).map((community) => (
          <div key={community.id} className="rounded-xl bg-slate-50 p-3">
            <p className="text-sm font-semibold">{community.name}</p>
            <p className="text-xs text-muted">{community.members_count} members</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
