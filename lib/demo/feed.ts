import type { Post, UserProfile } from "@/lib/types";

function engagementScore(post: Post) {
  return (post.likes_count ?? 0) * 2 + (post.comments_count ?? 0) * 3 + (post.saves_count ?? 0);
}

function recencyPenalty(createdAt: string) {
  const ageHours = Math.max((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60), 1);
  return ageHours * 0.2;
}

function affinityBonus(viewer: UserProfile, post: Post) {
  let bonus = 0;
  if (post.city === viewer.current_city) bonus += 5;
  if (post.author.country_origin === viewer.country_origin) bonus += 2;
  if (post.author.user_type === viewer.user_type) bonus += 1;
  return bonus;
}

export function rankFeedPosts(viewer: UserProfile, posts: Post[]) {
  return [...posts].sort((a, b) => {
    const scoreA = engagementScore(a) + affinityBonus(viewer, a) - recencyPenalty(a.created_at);
    const scoreB = engagementScore(b) + affinityBonus(viewer, b) - recencyPenalty(b.created_at);
    return scoreB - scoreA;
  });
}
