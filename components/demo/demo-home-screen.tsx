"use client";

import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { DemoCommentThread } from "@/components/demo/demo-comment-thread";
import { DemoCreatePost } from "@/components/demo/demo-create-post";
import { EmptyState } from "@/components/empty-state";
import { FeedSidebar } from "@/components/feed-sidebar";
import { PostCard } from "@/components/post-card";
import { suggestedPrompts } from "@/lib/mock-data";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoHomeScreen() {
  const { currentUser, isReady, reportPost, state, toggleLikePost, toggleSavePost } = useDemo();

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  const viewer = currentUser ?? state.profiles[0];

  const feed = state.posts.filter((post) => post.city === viewer.current_city);
  const relevantCommunities = state.communities.filter((community) => community.city === viewer.current_city);

  return (
    <AppShell title={`${viewer.current_city} feed preview`} subtitle="Location-first conversations, practical help, and new friendships." aside={<FeedSidebar user={viewer} />} city={viewer.current_city}>
      <div className="space-y-5">
        {!currentUser ? (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Preview mode is active. Start with only name and surname to personalize your dashboard.</p>
            <Link href="/auth/signup">
              <Button>Start demo</Button>
            </Link>
          </Card>
        ) : null}
        <DemoCreatePost user={viewer} prompts={suggestedPrompts} communities={relevantCommunities} />
        {feed.length === 0 ? (
          <EmptyState title="Your city feed is quiet" description="Be the first person to ask a question, share an experience, or plan something small in your city." />
        ) : null}
        {feed.map((post, index) => (
          <div key={post.id} className="space-y-4">
            <PostCard
              post={post}
              viewerId={currentUser?.id}
              onToggleLike={(postId) => {
                toggleLikePost(postId);
              }}
              onToggleSave={(postId) => {
                toggleSavePost(postId);
              }}
              onReport={(postId) => {
                reportPost(postId);
              }}
            />
            {index === 0 ? <DemoCommentThread postId={post.id} /> : null}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
