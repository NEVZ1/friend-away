"use client";

import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { CommunitySuggestionCard } from "@/components/community-suggestion-card";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { DiscoverSection } from "@/components/discover-section";
import { UserSuggestionCard } from "@/components/user-suggestion-card";
import { useDemo } from "@/components/demo/demo-provider";
import { rankPeopleLikeYou, rankRecentArrivals, rankSuggestedCommunities } from "@/lib/demo/recommendations";

export function DemoDiscoverScreen() {
  const { currentUser, isReady, state } = useDemo();
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    if (!currentUser) {
      return { people: [], recentArrivals: [], communities: [] };
    }

    const people = rankPeopleLikeYou(currentUser, state.profiles).filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase())
    );
    const recentArrivals = rankRecentArrivals(currentUser, state.profiles).filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase())
    );
    const communities = rankSuggestedCommunities(currentUser, state.communities).filter((community) =>
      community.name.toLowerCase().includes(query.toLowerCase())
    );

    return {
      people,
      recentArrivals,
      communities
    };
  }, [currentUser, query, state.communities, state.profiles]);

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <AppShell title="Discover" subtitle="Relevant people, prompts, and communities around your location." city={currentUser.current_city}>
      <div className="space-y-6">
        <DiscoverSection title="Search" description="Filter people and communities in your local graph.">
          <input
            className="w-full rounded-xl border border-border px-4 py-3 text-sm"
            placeholder="Search by name or community"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="flex flex-wrap gap-3 text-xs font-medium text-muted">
            <span>{data.people.length} people</span>
            <span>{data.recentArrivals.length} arrivals</span>
            <span>{data.communities.length} communities</span>
          </div>
        </DiscoverSection>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <DiscoverSection title="People like you" description="Recommended from the same city, origin, or relocation phase.">
              <div className="space-y-3">
                {data.people.length === 0 ? <p className="text-sm text-muted">No people match this search yet.</p> : null}
                {data.people.map((person) => (
                  <UserSuggestionCard key={person.id} user={person} />
                ))}
              </div>
            </DiscoverSection>
            <DiscoverSection title="Recent arrivals" description="People landing in the same month often share the same first-week questions.">
              <div className="space-y-3">
                {data.recentArrivals.length === 0 ? <p className="text-sm text-muted">No matching arrival cohort yet.</p> : null}
                {data.recentArrivals.map((person) => (
                  <UserSuggestionCard key={person.id} user={person} />
                ))}
              </div>
            </DiscoverSection>
          </div>
          <DiscoverSection title="Suggested communities" description="Groups shaped around city, origin, and arrival timing.">
            <div className="grid gap-4">
              {data.communities.length === 0 ? <p className="text-sm text-muted">No communities match this search yet.</p> : null}
              {data.communities.map((community) => (
                <CommunitySuggestionCard key={community.id} community={community} />
              ))}
            </div>
          </DiscoverSection>
        </div>
      </div>
    </AppShell>
  );
}
