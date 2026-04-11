"use client";

import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { useDemo } from "@/components/demo/demo-provider";
import { PostCard } from "@/components/post-card";
import { ProfileHeader } from "@/components/profile-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoProfileScreen() {
  const { currentUser, isReady, state, resetDemo } = useDemo();

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  const viewer = currentUser ?? state.profiles[0];

  const feed = state.posts.filter((post) => post.user_id === viewer.id);
  const joined = state.communities.filter((community) => community.is_joined);
  const messageCount = state.messages.filter(
    (message) => message.sender_id === viewer.id || message.receiver_id === viewer.id
  ).length;
  const recentComments = state.comments.filter((comment) => comment.user_id === viewer.id).slice(-3).reverse();
  const recentCommunityNames = joined.slice(0, 3).map((community) => community.name);
  const followingCount = state.follows.filter((follow) => follow.follower_id === viewer.id).length;
  const followerCount = state.follows.filter((follow) => follow.following_id === viewer.id).length;

  return (
    <AppShell title="Profile" subtitle="Your story, local context, and the conversations you’re starting." city={viewer.current_city}>
      <div className="space-y-6">
        {!currentUser ? (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">You are viewing the seeded profile preview. Start demo to create your own profile.</p>
            <Link href="/auth/signup">
              <Button>Start demo</Button>
            </Link>
          </Card>
        ) : null}
        <ProfileHeader user={viewer} />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="flex flex-wrap justify-end gap-3">
              <Link href="/profile/edit">
                <Button variant="secondary">Edit profile</Button>
              </Link>
              <Button variant="ghost" onClick={resetDemo}>
                Restore sample data
              </Button>
            </div>
            {feed.length === 0 ? (
              <EmptyState title="No profile posts yet" description="Once you share something in your city feed, it will also show up here." />
            ) : (
              feed.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Profile insights</h2>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Posts created</p>
              <p className="mt-2 text-2xl font-semibold">{feed.length}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Communities joined</p>
              <p className="mt-2 text-2xl font-semibold">{joined.length}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Messages in demo inbox</p>
              <p className="mt-2 text-2xl font-semibold">{messageCount}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Followers</p>
              <p className="mt-2 text-2xl font-semibold">{followerCount}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Following</p>
              <p className="mt-2 text-2xl font-semibold">{followingCount}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Recent community footprint</p>
              <p className="mt-2 text-sm font-medium text-text">
                {recentCommunityNames.length > 0 ? recentCommunityNames.join(", ") : "Join a community to build your local graph."}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-muted">Recent comment activity</p>
              <div className="mt-2 space-y-2">
                {recentComments.length === 0 ? <p className="text-sm text-slate-600">No comments yet. Reply to a city post to show up here.</p> : null}
                {recentComments.map((comment) => (
                  <p key={comment.id} className="text-sm text-slate-700">
                    {comment.content}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
