import {
  comments as seedComments,
  communities as seedCommunities,
  currentUser as seedCurrentUser,
  follows as seedFollows,
  messages as seedMessages,
  notifications as seedNotifications,
  people as seedPeople,
  posts as seedPosts
} from "@/lib/mock-data";
import type { Comment, Community, FollowRelation, Message, NotificationItem, Post, UserProfile } from "@/lib/types";

export type DemoState = {
  profiles: UserProfile[];
  communities: Community[];
  posts: Post[];
  comments: Comment[];
  messages: Message[];
  notifications: NotificationItem[];
  follows: FollowRelation[];
  sessionUserId: string | null;
};

export type SignupPayload = {
  name: string;
  email: string;
  current_city: string;
  country_origin: string;
  arrival_date: string;
  user_type: UserProfile["user_type"];
  bio: string;
};

export type QuickStartPayload = {
  first_name: string;
  last_name: string;
};

export type ProfilePayload = {
  name: string;
  current_city: string;
  country_origin: string;
  arrival_date: string;
  user_type: UserProfile["user_type"];
  bio: string;
  avatar_url: string;
};

export function buildSeedState(): DemoState {
  return {
    profiles: JSON.parse(JSON.stringify(seedPeople)),
    communities: JSON.parse(JSON.stringify(seedCommunities)),
    posts: JSON.parse(JSON.stringify(seedPosts)),
    comments: JSON.parse(JSON.stringify(seedComments)),
    messages: JSON.parse(JSON.stringify(seedMessages)),
    notifications: JSON.parse(JSON.stringify(seedNotifications)),
    follows: JSON.parse(JSON.stringify(seedFollows)),
    sessionUserId: null
  };
}

function addNotification(state: DemoState, payload: Omit<NotificationItem, "id" | "created_at" | "read">) {
  return {
    ...state,
    notifications: [
      {
        id: `notification-${Date.now()}`,
        created_at: new Date().toISOString(),
        read: false,
        ...payload
      },
      ...state.notifications
    ]
  };
}

export function getCurrentDemoUser(state: DemoState) {
  return state.profiles.find((profile) => profile.id === state.sessionUserId) ?? null;
}

export function loginDemo(state: DemoState, email: string) {
  const profile = state.profiles.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
  if (!profile) {
    return { state, error: "No demo account matches that email. Use one of the seeded emails or sign up." };
  }

  return {
    state: {
      ...state,
      sessionUserId: profile.id
    }
  };
}

export function signupDemo(state: DemoState, payload: SignupPayload) {
  if (state.profiles.some((item) => item.email.toLowerCase() === payload.email.toLowerCase())) {
    return { state, error: "That email already exists in demo mode." };
  }

  const id = `user-${Date.now()}`;
  const profile: UserProfile = {
    id,
    avatar_url: seedCurrentUser.avatar_url,
    created_at: new Date().toISOString(),
    onboarding_completed: false,
    ...payload
  };

  return {
    state: {
      ...state,
      profiles: [profile, ...state.profiles],
      sessionUserId: id
    }
  };
}

export function quickStartDemo(state: DemoState, payload: QuickStartPayload) {
  const fullName = `${payload.first_name} ${payload.last_name}`.trim();
  if (!payload.first_name.trim() || !payload.last_name.trim()) {
    return { state, error: "Please enter both name and surname." };
  }

  const id = `user-${Date.now()}`;
  const email = `${payload.first_name}.${payload.last_name}.${Date.now()}@friendaway.demo`
    .toLowerCase()
    .replace(/\s+/g, "");

  const profile: UserProfile = {
    id,
    name: fullName,
    email,
    current_city: "Berlin",
    country_origin: "Not set",
    arrival_date: new Date().toISOString().slice(0, 10),
    user_type: "other",
    bio: "Exploring FriendAway in demo mode.",
    avatar_url: seedCurrentUser.avatar_url,
    created_at: new Date().toISOString(),
    onboarding_completed: true
  };

  return {
    state: {
      ...state,
      profiles: [profile, ...state.profiles],
      sessionUserId: id
    }
  };
}

export function logoutDemo(state: DemoState) {
  return {
    ...state,
    sessionUserId: null
  };
}

export function completeDemoOnboarding(state: DemoState, payload: ProfilePayload) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return state;
  }

  return {
    ...state,
    profiles: state.profiles.map((profile) =>
      profile.id === currentUser.id ? { ...profile, ...payload, onboarding_completed: true } : profile
    )
  };
}

export function updateDemoProfile(state: DemoState, payload: ProfilePayload) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return state;
  }

  return {
    ...state,
    profiles: state.profiles.map((profile) =>
      profile.id === currentUser.id ? { ...profile, ...payload, onboarding_completed: true } : profile
    ),
    posts: state.posts.map((post) =>
      post.user_id === currentUser.id
        ? { ...post, city: payload.current_city, author: { ...post.author, ...payload, onboarding_completed: true } }
        : post
    ),
    comments: state.comments.map((comment) =>
      comment.user_id === currentUser.id
        ? { ...comment, author: { ...comment.author, ...payload, onboarding_completed: true } }
        : comment
    )
  };
}

export function createDemoPost(state: DemoState, content: string, communityId?: string | null, mediaUrls: string[] = []) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }
  if (!content.trim()) {
    return { state, error: "Write something before posting." };
  }

  const community = communityId ? state.communities.find((item) => item.id === communityId) ?? null : null;

  return {
    state: {
      ...state,
      posts: [
        {
          id: `post-${Date.now()}`,
          user_id: currentUser.id,
          community_id: community?.id ?? null,
          city: currentUser.current_city,
          content: content.trim(),
          media_urls: mediaUrls,
          likes_count: 0,
          saves_count: 0,
          reports_count: 0,
          liked_by: [],
          saved_by: [],
          created_at: new Date().toISOString(),
          author: currentUser,
          comments_count: 0,
          community
        },
        ...state.posts
      ]
    }
  };
}

export function toggleDemoLike(state: DemoState, postId: string) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }

  const targetPost = state.posts.find((post) => post.id === postId);
  let nextState: DemoState = {
    ...state,
    posts: state.posts.map((post) => {
      if (post.id !== postId) {
        return post;
      }
      const likedBy = post.liked_by ?? [];
      const alreadyLiked = likedBy.includes(currentUser.id);
      const nextLikedBy = alreadyLiked ? likedBy.filter((id) => id !== currentUser.id) : [...likedBy, currentUser.id];
      return {
        ...post,
        liked_by: nextLikedBy,
        likes_count: nextLikedBy.length
      };
    })
  };

  const likedAfter = (nextState.posts.find((post) => post.id === postId)?.liked_by ?? []).includes(currentUser.id);
  if (targetPost && targetPost.user_id !== currentUser.id && likedAfter) {
    nextState = addNotification(nextState, {
      user_id: targetPost.user_id,
      actor_name: currentUser.name,
      type: "like",
      text: "liked your post.",
      related_post_id: postId,
      related_user_id: currentUser.id
    });
  }

  return { state: nextState };
}

export function toggleDemoSave(state: DemoState, postId: string) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }

  return {
    state: {
      ...state,
      posts: state.posts.map((post) => {
        if (post.id !== postId) {
          return post;
        }
        const savedBy = post.saved_by ?? [];
        const alreadySaved = savedBy.includes(currentUser.id);
        const nextSavedBy = alreadySaved ? savedBy.filter((id) => id !== currentUser.id) : [...savedBy, currentUser.id];
        return {
          ...post,
          saved_by: nextSavedBy,
          saves_count: nextSavedBy.length
        };
      })
    }
  };
}

export function reportDemoPost(state: DemoState, postId: string) {
  return {
    state: {
      ...state,
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, reports_count: (post.reports_count ?? 0) + 1 } : post
      )
    }
  };
}

export function addDemoComment(state: DemoState, postId: string, content: string) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }
  if (!content.trim()) {
    return { state, error: "Write a comment first." };
  }

  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    post_id: postId,
    user_id: currentUser.id,
    content: content.trim(),
    created_at: new Date().toISOString(),
    author: currentUser
  };

  const targetPost = state.posts.find((post) => post.id === postId);
  let nextState: DemoState = {
    ...state,
    comments: [...state.comments, newComment],
    posts: state.posts.map((post) =>
      post.id === postId ? { ...post, comments_count: (post.comments_count ?? 0) + 1 } : post
    )
  };

  if (targetPost && targetPost.user_id !== currentUser.id) {
    nextState = addNotification(nextState, {
      user_id: targetPost.user_id,
      actor_name: currentUser.name,
      type: "comment",
      text: "commented on your post.",
      related_post_id: postId,
      related_user_id: currentUser.id
    });
  }

  return { state: nextState };
}

export function toggleDemoCommunityMembership(state: DemoState, communityId: string) {
  const currentUser = getCurrentDemoUser(state);
  const before = state.communities.find((community) => community.id === communityId);
  let nextState: DemoState = {
    ...state,
    communities: state.communities.map((community) =>
      community.id === communityId
        ? {
            ...community,
            is_joined: !community.is_joined,
            members_count: Math.max((community.members_count ?? 0) + (community.is_joined ? -1 : 1), 0)
          }
        : community
    )
  };

  if (currentUser && before && !before.is_joined) {
    nextState = addNotification(nextState, {
      user_id: currentUser.id,
      actor_name: before.name,
      type: "community_join",
      text: "is now in your community list.",
      related_user_id: currentUser.id
    });
  }

  return nextState;
}

export function sendDemoMessage(state: DemoState, receiverId: string, content: string) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }
  if (!content.trim()) {
    return { state, error: "Write a message first." };
  }

  const nextState = addNotification(
    {
      ...state,
      messages: [
        ...state.messages,
        {
          id: `message-${Date.now()}`,
          sender_id: currentUser.id,
          receiver_id: receiverId,
          content: content.trim(),
          created_at: new Date().toISOString()
        }
      ]
    },
    {
      user_id: receiverId,
      actor_name: currentUser.name,
      type: "message",
      text: "sent you a message.",
      related_user_id: currentUser.id
    }
  );

  return { state: nextState };
}

export function markAllNotificationsRead(state: DemoState) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return state;
  }

  return {
    ...state,
    notifications: state.notifications.map((notification) =>
      notification.user_id === currentUser.id ? { ...notification, read: true } : notification
    )
  };
}

export function toggleDemoFollow(state: DemoState, targetUserId: string) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }

  if (targetUserId === currentUser.id) {
    return { state, error: "You cannot follow yourself." };
  }

  const existing = state.follows.find(
    (follow) => follow.follower_id === currentUser.id && follow.following_id === targetUserId
  );

  let nextState: DemoState;
  if (existing) {
    nextState = {
      ...state,
      follows: state.follows.filter((follow) => follow.id !== existing.id)
    };
  } else {
    nextState = {
      ...state,
      follows: [
        {
          id: `follow-${Date.now()}`,
          follower_id: currentUser.id,
          following_id: targetUserId,
          created_at: new Date().toISOString()
        },
        ...state.follows
      ]
    };

    nextState = addNotification(nextState, {
      user_id: targetUserId,
      actor_name: currentUser.name,
      type: "system",
      text: "started following you.",
      related_user_id: currentUser.id
    });
  }

  return { state: nextState };
}
