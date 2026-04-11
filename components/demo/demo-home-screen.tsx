"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { DemoCommentThread } from "@/components/demo/demo-comment-thread";
import { DemoCreatePost } from "@/components/demo/demo-create-post";
import { EmptyState } from "@/components/empty-state";
import { FeedSidebar } from "@/components/feed-sidebar";
import { PostCard } from "@/components/post-card";
import { suggestedPrompts } from "@/lib/mock-data";
import { rankFeedPosts } from "@/lib/demo/feed";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoHomeScreen() {
  const router = useRouter();
  const { currentUser, isReady, quickStart, reportPost, state, toggleLikePost, toggleSavePost } = useDemo();
  const [feedMode, setFeedMode] = useState<"for_you" | "latest">("for_you");
  const [mediaOnly, setMediaOnly] = useState(false);
  const viewer = currentUser ?? state.profiles[0];
  const cityPosts = useMemo(
    () => state.posts.filter((post) => post.city === viewer.current_city),
    [state.posts, viewer.current_city]
  );
  const ranked = useMemo(() => rankFeedPosts(viewer, cityPosts), [cityPosts, viewer]);
  const latest = useMemo(
    () => [...cityPosts].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)),
    [cityPosts]
  );
  const feed = (feedMode === "for_you" ? ranked : latest).filter((post) =>
    mediaOnly ? (post.media_urls?.length ?? 0) > 0 : true
  );
  const relevantCommunities = state.communities.filter((community) => community.city === viewer.current_city);

  function startGuestSession() {
    const pool: Array<[string, string]> = [
      ["Alex", "Guest"],
      ["Mina", "Visitor"],
      ["Noah", "Explorer"],
      ["Lara", "Traveller"]
    ];
    const [first, last] = pool[Date.now() % pool.length];
    const result = quickStart({ first_name: first, last_name: last });
    if (!result.error) {
      router.push("/");
    }
  }

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  return (
    <AppShell title={`${viewer.current_city} feed preview`} subtitle="Location-first conversations, practical help, and new friendships." aside={<FeedSidebar user={viewer} />} city={viewer.current_city}>
      <div className="space-y-5">
        {!currentUser ? (
          <Card className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">Preview mode is active. Start with only name and surname to personalize your dashboard.</p>
            <div className="flex gap-2">
              <Button onClick={startGuestSession}>Start in 1 tap</Button>
              <Link href="/auth/signup">
                <Button variant="secondary">Open signup</Button>
              </Link>
            </div>
          </Card>
        ) : null}
        <DemoCreatePost user={viewer} prompts={suggestedPrompts} communities={relevantCommunities} />
        <Card className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFeedMode("for_you")}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${feedMode === "for_you" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
          >
            For you
          </button>
          <button
            type="button"
            onClick={() => setFeedMode("latest")}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${feedMode === "latest" ? "bg-primary text-white" : "bg-slate-100 text-slate-600"}`}
          >
            Latest
          </button>
          <button
            type="button"
            onClick={() => setMediaOnly((value) => !value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${mediaOnly ? "bg-accent text-white" : "bg-slate-100 text-slate-600"}`}
          >
            Media only
          </button>
        </Card>
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
