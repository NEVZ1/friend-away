import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { DemoProfileScreen } from "@/components/demo/demo-profile-screen";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { PostCard } from "@/components/post-card";
import { ProfileHeader } from "@/components/profile-header";
import { getCityFeed, getCurrentUser, getFollowStats, hasSupabaseEnv } from "@/lib/supabase/queries";

export default async function ProfilePage() {
  if (!hasSupabaseEnv()) {
    return <DemoProfileScreen />;
  }

  const user = await getCurrentUser();
  const [feed, followStats] = await Promise.all([getCityFeed(user.current_city), getFollowStats(user.id)]);

  return (
    <AppShell title="Profile" subtitle="Your story, local context, and the conversations you’re starting." city={user.current_city}>
      <div className="space-y-6">
        <ProfileHeader user={user} />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Link href="/profile/edit">
                <Button variant="secondary">Edit profile</Button>
              </Link>
            </div>
            {feed.length === 0 ? (
              <EmptyState
                title="No profile posts yet"
                description="Once you share something in your city feed, it will also show up here."
              />
            ) : (
              feed.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Profile insights</h2>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Home city feed reach</p>
              <p className="mt-2 text-2xl font-semibold">1.2k locals</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Communities joined</p>
              <p className="mt-2 text-2xl font-semibold">4</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Messages this week</p>
              <p className="mt-2 text-2xl font-semibold">18</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Followers</p>
              <p className="mt-2 text-2xl font-semibold">{followStats.followers}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Following</p>
              <p className="mt-2 text-2xl font-semibold">{followStats.following}</p>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
