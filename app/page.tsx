import { DemoHomeScreen } from "@/components/demo/demo-home-screen";
import { AppShell } from "@/components/app-shell";
import { CommentSection } from "@/components/comment-section";
import { CreatePost } from "@/components/create-post";
import { EmptyState } from "@/components/empty-state";
import { FeedSidebar } from "@/components/feed-sidebar";
import { PostCard } from "@/components/post-card";
import { getCityFeed, getCommentsForPost, getCurrentUser, hasSupabaseEnv } from "@/lib/supabase/queries";
import { suggestedPrompts } from "@/lib/mock-data";

export default async function HomePage() {
  if (!hasSupabaseEnv()) {
    return <DemoHomeScreen />;
  }

  const user = await getCurrentUser();
  const feed = await getCityFeed(user.current_city);
  const leadComments = feed[0] ? await getCommentsForPost(feed[0].id) : [];

  return (
    <AppShell
      title={`Your ${user.current_city} feed`}
      subtitle="Location-first conversations, practical help, and new friendships."
      aside={<FeedSidebar user={user} />}
      city={user.current_city}
    >
      <div className="space-y-5">
        <CreatePost user={user} prompts={suggestedPrompts} />
        {feed.length === 0 ? (
          <EmptyState
            title="Your city feed is quiet"
            description="Be the first person to ask a question, share an experience, or plan something small in your city."
          />
        ) : null}
        {feed.map((post, index) => (
          <div key={post.id} className="space-y-4">
            <PostCard post={post} />
            {index === 0 ? <CommentSection items={leadComments} /> : null}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
