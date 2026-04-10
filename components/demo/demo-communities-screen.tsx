"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { CommunityList } from "@/components/community-list";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { EmptyState } from "@/components/empty-state";
import { FeedSidebar } from "@/components/feed-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDemo } from "@/components/demo/demo-provider";
import { rankSuggestedCommunities } from "@/lib/demo/recommendations";

export function DemoCommunitiesScreen() {
  const { currentUser, isReady, state } = useDemo();
  const [query, setQuery] = useState("");

  const communities = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return rankSuggestedCommunities(currentUser, state.communities).filter((community) =>
      community.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [currentUser, query, state.communities]);

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  const viewer = currentUser ?? state.profiles[0];

  return (
    <AppShell title="Communities" subtitle="City, origin, and arrival-based groups designed for fast belonging." aside={<FeedSidebar user={viewer} />} city={viewer.current_city}>
      <div className="space-y-6">
        {!currentUser ? (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">You can browse all communities before creating a demo identity.</p>
            <Link href="/auth/signup">
              <Button>Start demo</Button>
            </Link>
          </Card>
        ) : null}
        <Card className="space-y-4">
          <input
            className="w-full rounded-xl border border-border px-4 py-3 text-sm"
            placeholder="Search communities"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className="text-xs font-medium text-muted">
            {communities.length} community{communities.length === 1 ? "" : "ies"} matched
          </p>
        </Card>
        {communities.length === 0 ? (
          <EmptyState title="No matching communities yet" description="Try another search or reset demo data to restore the full seed set." />
        ) : (
          <CommunityList communities={communities} />
        )}
      </div>
    </AppShell>
  );
}
