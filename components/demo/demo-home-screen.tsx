"use client";

import { AppShell } from "@/components/app-shell";
import { DemoCommentThread } from "@/components/demo/demo-comment-thread";
import { DemoCreatePost } from "@/components/demo/demo-create-post";
import { EmptyState } from "@/components/empty-state";
import { FeedSidebar } from "@/components/feed-sidebar";
import { PostCard } from "@/components/post-card";
import { suggestedPrompts } from "@/lib/mock-data";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { useDemo } from "@/components/demo/demo-provider";

export function DemoHomeScreen() {
  const { currentUser, isReady, state } = useDemo();

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  if (!currentUser) {
    return null;
  }

  const feed = state.posts.filter((post) => post.city === currentUser.current_city);
  const relevantCommunities = state.communities.filter((community) => community.city === currentUser.current_city);

  return (
    <AppShell title={`Your ${currentUser.current_city} feed`} subtitle="Location-first conversations, practical help, and new friendships." aside={<FeedSidebar user={currentUser} />} city={currentUser.current_city}>
      <div className="space-y-5">
        <DemoCreatePost user={currentUser} prompts={suggestedPrompts} communities={relevantCommunities} />
        {feed.length === 0 ? (
          <EmptyState title="Your city feed is quiet" description="Be the first person to ask a question, share an experience, or plan something small in your city." />
        ) : null}
        {feed.map((post, index) => (
          <div key={post.id} className="space-y-4">
            <PostCard post={post} />
            {index === 0 ? <DemoCommentThread postId={post.id} /> : null}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
