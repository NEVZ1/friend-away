import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { CommentSection } from "@/components/comment-section";
import { CommunityHeader } from "@/components/community-header";
import { DemoCommunityDetailScreen } from "@/components/demo/demo-community-detail-screen";
import { EmptyState } from "@/components/empty-state";
import { PostCard } from "@/components/post-card";
import { getCommentsForPost, getCommunityBySlug, getCommunityPosts, getCurrentUser, hasSupabaseEnv } from "@/lib/supabase/queries";

export default async function CommunityDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!hasSupabaseEnv()) {
    return <DemoCommunityDetailScreen slug={slug} />;
  }

  const [user, community] = await Promise.all([getCurrentUser(), getCommunityBySlug(slug)]);

  if (!community) {
    notFound();
  }

  const feed = await getCommunityPosts(community.id);
  const leadComments = feed[0] ? await getCommentsForPost(feed[0].id) : [];

  return (
    <AppShell
      title={community.name}
      subtitle="Community conversations, support, and small local rituals."
      city={user.current_city}
    >
      <div className="space-y-6">
        <CommunityHeader community={community} />
        {feed.length === 0 ? (
          <EmptyState
            title="No posts in this community yet"
            description="Start the conversation with a question, a meetup idea, or a practical tip."
          />
        ) : (
          feed.map((post, index) => (
            <div key={post.id} className="space-y-4">
              <PostCard post={post} />
              {index === 0 ? <CommentSection items={leadComments} /> : null}
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
