import {
  comments as seedComments,
  communities as seedCommunities,
  currentUser as seedCurrentUser,
  messages as seedMessages,
  people as seedPeople,
  posts as seedPosts
} from "@/lib/mock-data";
import type { Comment, Community, Message, Post, UserProfile } from "@/lib/types";

export type DemoState = {
  profiles: UserProfile[];
  communities: Community[];
  posts: Post[];
  comments: Comment[];
  messages: Message[];
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
    sessionUserId: null
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

export function createDemoPost(state: DemoState, content: string, communityId?: string | null) {
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

  return {
    state: {
      ...state,
      comments: [...state.comments, newComment],
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, comments_count: (post.comments_count ?? 0) + 1 } : post
      )
    }
  };
}

export function toggleDemoCommunityMembership(state: DemoState, communityId: string) {
  return {
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
}

export function sendDemoMessage(state: DemoState, receiverId: string, content: string) {
  const currentUser = getCurrentDemoUser(state);
  if (!currentUser) {
    return { state, error: "Log in first." };
  }
  if (!content.trim()) {
    return { state, error: "Write a message first." };
  }

  return {
    state: {
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
    }
  };
}
