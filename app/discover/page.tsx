import { AppShell } from "@/components/app-shell";
import { CommunitySuggestionCard } from "@/components/community-suggestion-card";
import { DemoDiscoverScreen } from "@/components/demo/demo-discover-screen";
import { DiscoverSection } from "@/components/discover-section";
import { EmptyState } from "@/components/empty-state";
import { UserSuggestionCard } from "@/components/user-suggestion-card";
import { getCurrentUser, getDiscoverData, hasSupabaseEnv } from "@/lib/supabase/queries";

export default async function DiscoverPage() {
  if (!hasSupabaseEnv()) {
    return <DemoDiscoverScreen />;
  }

  const user = await getCurrentUser();
  const discover = await getDiscoverData(user.current_city);

  return (
    <AppShell
      title="Discover"
      subtitle="Relevant people, prompts, and communities around your location."
      city={user.current_city}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <DiscoverSection
            title="Suggested questions"
            description="Prompts designed to unlock practical answers and easy conversations."
          >
            <div className="grid gap-3">
              {discover.prompts.map((prompt) => (
                <div key={prompt} className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                  {prompt}
                </div>
              ))}
            </div>
          </DiscoverSection>
          <DiscoverSection
            title="People like you"
            description="Recommended from the same city, origin, or relocation phase."
          >
            <div className="space-y-3">
              {discover.people.map((person) => (
                <UserSuggestionCard key={person.id} user={person} />
              ))}
            </div>
          </DiscoverSection>
          <DiscoverSection
            title="Recent arrivals"
            description="People landing in the same month tend to have the same first-week questions."
          >
            <div className="space-y-3">
              {discover.recentArrivals.length === 0 ? (
                <EmptyState
                  title="No cohort matches yet"
                  description="When new members arrive in your month, they’ll appear here."
                />
              ) : (
                discover.recentArrivals.map((person) => <UserSuggestionCard key={person.id} user={person} />)
              )}
            </div>
          </DiscoverSection>
        </div>
        <div className="space-y-6">
          <DiscoverSection
            title="Nearby communities"
            description="City-first groups shaped around origin, arrival timing, and lifestyle."
          >
            <div className="grid gap-4">
              {discover.communities.map((community) => (
                <CommunitySuggestionCard key={community.id} community={community} />
              ))}
            </div>
          </DiscoverSection>
        </div>
      </div>
    </AppShell>
  );
}
