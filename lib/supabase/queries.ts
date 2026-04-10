import { createClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import {
  comments,
  communities,
  conversations,
  currentUser,
  messages,
  people,
  peopleLikeYou,
  posts,
  suggestedPrompts
} from "@/lib/mock-data";
import type { Comment, Community, Conversation, Message, Post, UserProfile } from "@/lib/types";
import { getArrivalCohort, slugify } from "@/lib/utils";

export function hasSupabaseEnv() {
  return hasSupabasePublicEnv();
}

export async function getCurrentUser(): Promise<UserProfile> {
  if (!hasSupabaseEnv()) {
    return currentUser;
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return currentUser;
  }

  const { data } = await (supabase.from("users") as any).select("*").eq("id", user.id).maybeSingle();
  const profile = data as Partial<UserProfile> | null;

  if (!profile) {
    return currentUser;
  }

  return {
    id: profile.id ?? currentUser.id,
    name: profile.name ?? currentUser.name,
    email: profile.email ?? currentUser.email,
    country_origin: profile.country_origin ?? currentUser.country_origin,
    current_city: profile.current_city ?? currentUser.current_city,
    arrival_date: profile.arrival_date ?? currentUser.arrival_date,
    user_type: (profile.user_type as UserProfile["user_type"] | null) ?? currentUser.user_type,
    bio: profile.bio ?? currentUser.bio,
    avatar_url: profile.avatar_url ?? currentUser.avatar_url,
    onboarding_completed: profile.onboarding_completed ?? currentUser.onboarding_completed,
    created_at: profile.created_at ?? currentUser.created_at
  };
}

export async function getCurrentSession() {
  if (!hasSupabaseEnv()) {
    return { user: null };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return { user };
}

export async function getCityFeed(city: string): Promise<Post[]> {
  if (!hasSupabaseEnv()) {
    return posts.filter((post) => post.city === city);
  }

  const supabase = await createClient();
  const postsTable = supabase.from("posts") as any;
  const { data, error } = await postsTable
    .select("id, user_id, community_id, city, content, created_at")
    .eq("city", city)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) {
    return posts.filter((post) => post.city === city);
  }

  return (data as Array<{ id: string; user_id: string; community_id: string | null; city: string; content: string; created_at: string }>).map((post) => ({
    ...post,
    author: currentUser,
    comments_count: 0,
    community: communities.find((community) => community.id === post.community_id) ?? null
  }));
}

export async function getCommentsForPost(postId: string): Promise<Comment[]> {
  if (!hasSupabaseEnv()) {
    return comments.filter((comment) => comment.post_id === postId);
  }

  const supabase = await createClient();
  const commentsTable = supabase.from("comments") as any;
  const { data, error } = await commentsTable
    .select("id, post_id, user_id, content, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return comments.filter((comment) => comment.post_id === postId);
  }

  return (data as Array<{ id: string; post_id: string; user_id: string; content: string; created_at: string }>).map((comment) => ({
    ...comment,
    author: people.find((person) => person.id === comment.user_id) ?? currentUser
  }));
}

export async function getCommunities(city?: string): Promise<Community[]> {
  if (!hasSupabaseEnv()) {
    if (!city) {
      return communities;
    }

    return communities.filter((community) => community.city === city);
  }

  const supabase = await createClient();
  let query = (supabase.from("communities") as any).select("*").order("created_at", { ascending: false });

  if (city) {
    query = query.eq("city", city);
  }

  const { data, error } = await query;

  if (error || !data) {
    return city ? communities.filter((community) => community.city === city) : communities;
  }

  return data as Community[];
}

export async function getRelevantCommunities(user: UserProfile): Promise<Community[]> {
  const items = await getCommunities(user.current_city);

  return items.filter((community) => {
    if (community.city !== user.current_city) {
      return false;
    }

    return (
      community.country_origin === user.country_origin ||
      community.user_type === user.user_type ||
      community.cohort_label === getArrivalCohort(user.arrival_date) ||
      !community.country_origin
    );
  });
}

export async function getCommunityBySlug(slug: string): Promise<Community | null> {
  const community = communities.find((item) => slugify(item.name) === slug);
  return community ?? null;
}

export async function getCommunityPosts(communityId: string): Promise<Post[]> {
  return posts.filter((post) => post.community_id === communityId);
}

export async function getDiscoverData(city: string) {
  const [user, cityPosts, cityCommunities] = await Promise.all([
    getCurrentUser(),
    getCityFeed(city),
    getCommunities(city)
  ]);

  return {
    prompts: suggestedPrompts,
    people: peopleLikeYou.filter(
      (person) => person.current_city === city || person.country_origin === user.country_origin
    ),
    recentArrivals: peopleLikeYou.filter(
      (person) => person.current_city === city && getArrivalCohort(person.arrival_date) === getArrivalCohort(user.arrival_date)
    ),
    posts: cityPosts,
    communities: cityCommunities
  };
}

export async function getMessages(): Promise<Message[]> {
  if (!hasSupabaseEnv()) {
    return messages;
  }

  const supabase = await createClient();
  const user = await getCurrentUser();
  const messagesTable = supabase.from("messages") as any;
  const { data, error } = await messagesTable
    .select("*")
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return messages;
  }

  return data as Message[];
}

export async function getConversations(): Promise<Conversation[]> {
  return conversations;
}
