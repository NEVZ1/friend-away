import { Community, Message, Post, UserProfile } from "@/lib/types";

export const currentUser: UserProfile = {
  id: "user-1",
  name: "Aylin Demir",
  email: "aylin@friendaway.app",
  country_origin: "Turkey",
  current_city: "Berlin",
  arrival_date: "2026-03-14",
  user_type: "expat",
  bio: "New in Berlin. Looking for friends, café work sessions, and practical city tips.",
  avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  onboarding_completed: true,
  created_at: "2026-02-01T10:00:00.000Z"
};

export const communities: Community[] = [
  {
    id: "community-1",
    name: "Turks in Berlin",
    city: "Berlin",
    country_origin: "Turkey",
    description: "Advice, meetups, and everyday support for Turkish newcomers settling in Berlin.",
    is_joined: true,
    created_at: "2026-01-10T10:00:00.000Z",
    members_count: 1240
  },
  {
    id: "community-2",
    name: "March 2026 Arrivals",
    city: "Berlin",
    country_origin: null,
    cohort_label: "March 2026",
    description: "For people arriving this month and figuring out housing, paperwork, and their first friendships.",
    is_joined: true,
    created_at: "2026-02-20T10:00:00.000Z",
    members_count: 318
  },
  {
    id: "community-3",
    name: "Students in Amsterdam",
    city: "Amsterdam",
    country_origin: null,
    user_type: "student",
    description: "A practical social group for university life, admin questions, and study meetups.",
    created_at: "2026-01-16T10:00:00.000Z",
    members_count: 860
  },
  {
    id: "community-4",
    name: "Expats in Berlin",
    city: "Berlin",
    country_origin: null,
    user_type: "expat",
    description: "General Berlin group for people relocating for work, lifestyle, and a new routine.",
    is_joined: false,
    created_at: "2026-02-02T10:00:00.000Z",
    members_count: 641
  }
];

export const people: UserProfile[] = [
  currentUser,
  {
    id: "user-2",
    name: "Mateus Silva",
    email: "mateus@example.com",
    country_origin: "Brazil",
    current_city: "Berlin",
    arrival_date: "2026-03-03",
    user_type: "worker",
    bio: "Designer, runner, and always looking for hidden food spots.",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    onboarding_completed: true,
    created_at: "2026-02-03T10:00:00.000Z"
  },
  {
    id: "user-3",
    name: "Sofia Ivanova",
    email: "sofia@example.com",
    country_origin: "Bulgaria",
    current_city: "Berlin",
    arrival_date: "2026-02-22",
    user_type: "student",
    bio: "Master’s student learning German and building a new circle.",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    onboarding_completed: true,
    created_at: "2026-01-21T10:00:00.000Z"
  },
  {
    id: "user-4",
    name: "Lina Park",
    email: "lina@example.com",
    country_origin: "South Korea",
    current_city: "Berlin",
    arrival_date: "2026-03-11",
    user_type: "student",
    bio: "Recently arrived for language school. Looking for calm places to work and kind people.",
    avatar_url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80",
    onboarding_completed: true,
    created_at: "2026-03-01T10:00:00.000Z"
  }
];

export const posts: Post[] = [
  {
    id: "post-1",
    user_id: "user-2",
    community_id: "community-2",
    city: "Berlin",
    content:
      "Anyone else arriving this month and trying to figure out the anmeldung process? I found one office with shorter queues and can share details.",
    created_at: "2026-03-10T09:20:00.000Z",
    author: people[1],
    comments_count: 12,
    community: communities[1]
  },
  {
    id: "post-2",
    user_id: "user-3",
    community_id: "community-1",
    city: "Berlin",
    content:
      "Looking for a calm café in Neukölln with reliable Wi‑Fi for study sessions. Bonus if they do good tea.",
    created_at: "2026-03-10T07:05:00.000Z",
    author: people[2],
    comments_count: 8,
    community: communities[0]
  },
  {
    id: "post-3",
    user_id: "user-4",
    community_id: "community-4",
    city: "Berlin",
    content:
      "Any recommendations for beginner-friendly German classes in Prenzlauer Berg? Prefer something social, not purely textbook-based.",
    created_at: "2026-03-10T06:10:00.000Z",
    author: people[3],
    comments_count: 4,
    community: communities[3]
  }
];

export const comments = [
  {
    id: "comment-1",
    post_id: "post-1",
    user_id: "user-1",
    content: "Please share it. I’m booking mine this week.",
    created_at: "2026-03-10T09:45:00.000Z",
    author: currentUser
  },
  {
    id: "comment-2",
    post_id: "post-1",
    user_id: "user-3",
    content: "Same here. The official site has been painful.",
    created_at: "2026-03-10T09:47:00.000Z",
    author: people[2]
  },
  {
    id: "comment-3",
    post_id: "post-3",
    user_id: "user-2",
    content: "Goethe in Mitte is solid, but for social classes I’d try local VHS groups first.",
    created_at: "2026-03-10T06:35:00.000Z",
    author: people[1]
  }
];

export const messages: Message[] = [
  {
    id: "message-1",
    sender_id: "user-2",
    receiver_id: "user-1",
    content: "Hey, we’re doing a Sunday coffee meetup in Kreuzberg.",
    created_at: "2026-03-10T08:00:00.000Z"
  },
  {
    id: "message-2",
    sender_id: "user-1",
    receiver_id: "user-2",
    content: "I’m in. Send me the time.",
    created_at: "2026-03-10T08:03:00.000Z"
  },
  {
    id: "message-3",
    sender_id: "user-3",
    receiver_id: "user-1",
    content: "We’re making a list of student-friendly cafés. Want me to add your suggestions?",
    created_at: "2026-03-10T10:20:00.000Z"
  }
];

export const suggestedPrompts = [
  "What surprised you most in your new city this week?",
  "Ask for the one thing you wish you knew before arriving.",
  "Share a place that made the city feel easier."
];

export const peopleLikeYou = people.filter((person) => person.id !== currentUser.id);

export const conversations = [
  {
    id: "conversation-1",
    participant: people[1],
    last_message: "I’m in. Send me the time.",
    last_message_at: "2026-03-10T08:03:00.000Z",
    unread_count: 1
  },
  {
    id: "conversation-2",
    participant: people[2],
    last_message: "We’re making a list of student-friendly cafés.",
    last_message_at: "2026-03-10T10:20:00.000Z",
    unread_count: 0
  }
];
