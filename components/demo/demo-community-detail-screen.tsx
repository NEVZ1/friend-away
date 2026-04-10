"use client";

import { AppShell } from "@/components/app-shell";
import { CommunityHeader } from "@/components/community-header";
import { DemoCommentThread } from "@/components/demo/demo-comment-thread";
import { DemoCreatePost } from "@/components/demo/demo-create-post";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { useDemo } from "@/components/demo/demo-provider";
import { EmptyState } from "@/components/empty-state";
import { PostCard } from "@/components/post-card";
import { suggestedPrompts } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

export function DemoCommunityDetailScreen({ slug }: { slug: string }) {
  const { currentUser, isReady, reportPost, state, toggleLikePost, toggleSavePost } = useDemo();

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  if (!currentUser) {
    return null;
  }

  const community = state.communities.find((item) => slugify(item.name) === slug);

  if (!community) {
    return (
      <AppShell title="Community" subtitle="Community conversations, support, and small local rituals." city={currentUser.current_city}>
        <EmptyState title="Community not found" description="Reset the demo state or return to the communities list." />
      </AppShell>
    );
  }

  const feed = state.posts.filter((post) => post.community_id === community.id);

  return (
    <AppShell title={community.name} subtitle="Community conversations, support, and small local rituals." city={currentUser.current_city}>
      <div className="space-y-6">
        <CommunityHeader community={community} />
        <DemoCreatePost
          user={currentUser}
          prompts={suggestedPrompts}
          communities={[community]}
          defaultCommunityId={community.id}
        />
        {feed.length === 0 ? (
          <EmptyState title="No posts in this community yet" description="Start the conversation with a question, a meetup idea, or a practical tip." />
        ) : (
          feed.map((post, index) => (
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
          ))
        )}
      </div>
    </AppShell>
  );
}
