"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { CommunitySuggestionCard } from "@/components/community-suggestion-card";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { DiscoverSection } from "@/components/discover-section";
import { InviteCard } from "@/components/invite-card";
import { UserSuggestionCard } from "@/components/user-suggestion-card";
import { useDemo } from "@/components/demo/demo-provider";
import { rankPeopleLikeYou, rankRecentArrivals, rankSuggestedCommunities } from "@/lib/demo/recommendations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoDiscoverScreen() {
  const { currentUser, isFollowingUser, isReady, state, toggleFollowUser } = useDemo();
  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const data = useMemo(() => {
    const viewer = currentUser ?? state.profiles[0];
    if (!viewer) {
      return { people: [], recentArrivals: [], communities: [] };
    }

    const people = rankPeopleLikeYou(viewer, state.profiles).filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase())
    );
    const recentArrivals = rankRecentArrivals(viewer, state.profiles).filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase())
    );
    const communities = rankSuggestedCommunities(viewer, state.communities).filter((community) =>
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

  const viewer = currentUser ?? state.profiles[0];

  return (
    <AppShell title="Discover" subtitle="Relevant people, prompts, and communities around your location." city={viewer.current_city}>
      <div className="space-y-6">
        {!currentUser ? (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Preview recommendations are based on the seeded Berlin profile. Start demo to personalize.</p>
            <Link href="/auth/signup">
              <Button>Start demo</Button>
            </Link>
          </Card>
        ) : null}
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
                  <UserSuggestionCard
                    key={person.id}
                    user={person}
                    isFollowing={isFollowingUser(person.id)}
                    onToggleFollow={(userId) => {
                      const result = toggleFollowUser(userId);
                      if (result.error) {
                        setFeedback(result.error);
                        return;
                      }
                      setFeedback("Connection updated");
                      window.setTimeout(() => setFeedback(null), 1200);
                    }}
                  />
                ))}
              </div>
            </DiscoverSection>
            <DiscoverSection title="Recent arrivals" description="People landing in the same month often share the same first-week questions.">
              <div className="space-y-3">
                {data.recentArrivals.length === 0 ? <p className="text-sm text-muted">No matching arrival cohort yet.</p> : null}
                {data.recentArrivals.map((person) => (
                  <UserSuggestionCard
                    key={person.id}
                    user={person}
                    isFollowing={isFollowingUser(person.id)}
                    onToggleFollow={(userId) => {
                      const result = toggleFollowUser(userId);
                      if (result.error) {
                        setFeedback(result.error);
                        return;
                      }
                      setFeedback("Connection updated");
                      window.setTimeout(() => setFeedback(null), 1200);
                    }}
                  />
                ))}
              </div>
            </DiscoverSection>
            <DiscoverSection title="Media highlights" description="Browse photos and videos posted across your city feed.">
              <div className="grid grid-cols-2 gap-3">
                {state.posts
                  .filter((post) => post.city === viewer.current_city)
                  .flatMap((post) => post.media_urls ?? [])
                  .slice(0, 6)
                  .map((url) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={url} src={url} alt="City highlight" className="h-36 w-full rounded-xl object-cover" loading="lazy" />
                  ))}
              </div>
              {state.posts.filter((post) => post.city === viewer.current_city).flatMap((post) => post.media_urls ?? []).length === 0 ? (
                <p className="text-sm text-muted">No visual highlights yet in this city feed.</p>
              ) : null}
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
          <InviteCard city={viewer.current_city} />
        </div>
        {feedback ? <p className="text-sm text-accent">{feedback}</p> : null}
      </div>
    </AppShell>
  );
}
