import { createClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv, isPublicPreviewMode } from "@/lib/supabase/env";
import {
  comments,
  communities,
  conversations,
  currentUser,
  follows,
  messages,
  notifications,
  people,
  peopleLikeYou,
  posts,
  suggestedPrompts
} from "@/lib/mock-data";
import type { Comment, Community, Conversation, Message, NotificationItem, Post, UserProfile } from "@/lib/types";
import { getArrivalCohort, slugify } from "@/lib/utils";

export function hasSupabaseEnv() {
  return hasSupabasePublicEnv() && !isPublicPreviewMode();
}

export async function getCurrentUser(): Promise<UserProfile> {
  if (!hasSupabaseEnv()) {
    return currentUser;
  }

  try {
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
  } catch (_error) {
    return currentUser;
  }
}

export async function getCurrentSession() {
  if (!hasSupabaseEnv()) {
    return { user: null };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return { user };
  } catch (_error) {
    return { user: null };
  }
}

export async function getCityFeed(city: string): Promise<Post[]> {
  if (!hasSupabaseEnv()) {
    return posts.filter((post) => post.city === city);
  }

  try {
    const supabase = await createClient();
    const postsTable = supabase.from("posts") as any;
    const { data, error } = await postsTable
      .select("id, user_id, community_id, city, content, media_urls, created_at")
      .eq("city", city)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error || !data) {
      return posts.filter((post) => post.city === city);
    }

    return (data as Array<{
      id: string;
      user_id: string;
      community_id: string | null;
      city: string;
      content: string;
      media_urls?: string[] | null;
      created_at: string;
    }>).map((post) => ({
      ...post,
      media_urls: post.media_urls ?? [],
      author: currentUser,
      comments_count: 0,
      community: communities.find((community) => community.id === post.community_id) ?? null
    }));
  } catch (_error) {
    return posts.filter((post) => post.city === city);
  }
}

export async function getCommentsForPost(postId: string): Promise<Comment[]> {
  if (!hasSupabaseEnv()) {
    return comments.filter((comment) => comment.post_id === postId);
  }

  try {
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
  } catch (_error) {
    return comments.filter((comment) => comment.post_id === postId);
  }
}

export async function getCommunities(city?: string): Promise<Community[]> {
  if (!hasSupabaseEnv()) {
    if (!city) {
      return communities;
    }

    return communities.filter((community) => community.city === city);
  }

  try {
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
  } catch (_error) {
    return city ? communities.filter((community) => community.city === city) : communities;
  }
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

  if (!hasSupabaseEnv()) {
    return {
      prompts: suggestedPrompts,
      people: peopleLikeYou.filter(
        (person) => person.current_city === city || person.country_origin === user.country_origin
      ),
      recentArrivals: peopleLikeYou.filter(
        (person) => person.current_city === city && getArrivalCohort(person.arrival_date) === getArrivalCohort(user.arrival_date)
      ),
      posts: cityPosts,
      communities: cityCommunities,
      followingIds: follows.filter((follow) => follow.follower_id === user.id).map((follow) => follow.following_id)
    };
  }

  try {
    const supabase = await createClient();
    const usersTable = supabase.from("users") as any;
    const followsTable = supabase.from("follows") as any;

    const { data: suggestedUsers } = await usersTable
      .select("*")
      .neq("id", user.id)
      .or(`current_city.eq.${city},country_origin.eq.${user.country_origin}`)
      .limit(40);

    const { data: followingRows } = await followsTable
      .select("following_id")
      .eq("follower_id", user.id);

    const mappedUsers = ((suggestedUsers ?? []) as Array<Partial<UserProfile>>).map((profile) => ({
      id: profile.id ?? "",
      name: profile.name ?? "Unknown user",
      email: profile.email ?? "",
      country_origin: profile.country_origin ?? "Unknown",
      current_city: profile.current_city ?? city,
      arrival_date: profile.arrival_date ?? user.arrival_date,
      user_type: (profile.user_type as UserProfile["user_type"] | null) ?? "other",
      bio: profile.bio ?? "",
      avatar_url: profile.avatar_url ?? currentUser.avatar_url,
      onboarding_completed: profile.onboarding_completed ?? true,
      created_at: profile.created_at ?? new Date().toISOString()
    }));

    const followingIds = ((followingRows ?? []) as Array<{ following_id: string }>).map((row) => row.following_id);

    return {
      prompts: suggestedPrompts,
      people: mappedUsers.filter((person) => person.current_city === city || person.country_origin === user.country_origin),
      recentArrivals: mappedUsers.filter(
        (person) => person.current_city === city && getArrivalCohort(person.arrival_date) === getArrivalCohort(user.arrival_date)
      ),
      posts: cityPosts,
      communities: cityCommunities,
      followingIds
    };
  } catch (_error) {
    return {
      prompts: suggestedPrompts,
      people: peopleLikeYou.filter(
        (person) => person.current_city === city || person.country_origin === user.country_origin
      ),
      recentArrivals: peopleLikeYou.filter(
        (person) => person.current_city === city && getArrivalCohort(person.arrival_date) === getArrivalCohort(user.arrival_date)
      ),
      posts: cityPosts,
      communities: cityCommunities,
      followingIds: follows.filter((follow) => follow.follower_id === user.id).map((follow) => follow.following_id)
    };
  }
}

export async function getMessages(): Promise<Message[]> {
  if (!hasSupabaseEnv()) {
    return messages;
  }

  try {
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
  } catch (_error) {
    return messages;
  }
}

export async function getConversations(): Promise<Conversation[]> {
  return conversations;
}

export async function getNotifications(): Promise<NotificationItem[]> {
  if (!hasSupabaseEnv()) {
    return notifications;
  }

  try {
    const supabase = await createClient();
    const user = await getCurrentUser();
    const notificationsTable = supabase.from("notifications") as any;
    const { data, error } = await notificationsTable
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error || !data) {
      return notifications.filter((item) => item.user_id === user.id);
    }

    return data as NotificationItem[];
  } catch (_error) {
    return notifications;
  }
}

export async function getFollowStats(userId: string) {
  if (!hasSupabaseEnv()) {
    return {
      followers: follows.filter((follow) => follow.following_id === userId).length,
      following: follows.filter((follow) => follow.follower_id === userId).length
    };
  }

  try {
    const supabase = await createClient();
    const followsTable = supabase.from("follows") as any;
    const [{ count: followerCount }, { count: followingCount }] = await Promise.all([
      followsTable.select("id", { head: true, count: "exact" }).eq("following_id", userId),
      followsTable.select("id", { head: true, count: "exact" }).eq("follower_id", userId)
    ]);

    return {
      followers: followerCount ?? 0,
      following: followingCount ?? 0
    };
  } catch (_error) {
    return {
      followers: follows.filter((follow) => follow.following_id === userId).length,
      following: follows.filter((follow) => follow.follower_id === userId).length
    };
  }
}
