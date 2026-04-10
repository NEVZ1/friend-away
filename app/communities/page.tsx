import { AppShell } from "@/components/app-shell";
import { DemoCommunitiesScreen } from "@/components/demo/demo-communities-screen";
import { CommunityList } from "@/components/community-list";
import { EmptyState } from "@/components/empty-state";
import { FeedSidebar } from "@/components/feed-sidebar";
import { Card } from "@/components/ui/card";
import { getCurrentUser, getRelevantCommunities, hasSupabaseEnv } from "@/lib/supabase/queries";

export default async function CommunitiesPage() {
  if (!hasSupabaseEnv()) {
    return <DemoCommunitiesScreen />;
  }

  const user = await getCurrentUser();
  const cityCommunities = await getRelevantCommunities(user);

  return (
    <AppShell
      title="Communities"
      subtitle="City, origin, and arrival-based groups designed for fast belonging."
      aside={<FeedSidebar user={user} />}
      city={user.current_city}
    >
      <div className="space-y-6">
        <Card className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted">Popular format</p>
            <p className="mt-2 text-xl font-semibold">Turks in Dublin</p>
          </div>
          <div>
            <p className="text-sm text-muted">City-first groups</p>
            <p className="mt-2 text-xl font-semibold">Students in Amsterdam</p>
          </div>
          <div>
            <p className="text-sm text-muted">Cohort groups</p>
            <p className="mt-2 text-xl font-semibold">March 2026 arrivals</p>
          </div>
        </Card>
        {cityCommunities.length === 0 ? (
          <EmptyState
            title="No matching communities yet"
            description="Once more people join your city, FriendAway can auto-generate cohorts around origin, arrival month, and user type."
          />
        ) : (
          <CommunityList communities={cityCommunities} />
        )}
      </div>
    </AppShell>
  );
}
