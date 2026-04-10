export type UserProfile = {
  id: string;
  name: string;
  email: string;
  country_origin: string;
  current_city: string;
  arrival_date: string;
  user_type: "student" | "worker" | "expat" | "other";
  bio: string;
  avatar_url: string;
  onboarding_completed?: boolean;
  created_at: string;
};

export type Community = {
  id: string;
  name: string;
  city: string;
  country_origin: string | null;
  user_type?: string | null;
  cohort_label?: string | null;
  description?: string;
  is_joined?: boolean;
  created_at: string;
  members_count?: number;
};

export type Post = {
  id: string;
  user_id: string;
  community_id: string | null;
  city: string;
  content: string;
  media_urls?: string[];
  likes_count?: number;
  saves_count?: number;
  reports_count?: number;
  liked_by?: string[];
  saved_by?: string[];
  created_at: string;
  author: UserProfile;
  comments_count?: number;
  community?: Community | null;
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  author: UserProfile;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
};

export type Conversation = {
  id: string;
  participant: UserProfile;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

export type NotificationItem = {
  id: string;
  user_id: string;
  actor_name: string;
  type: "like" | "comment" | "message" | "community_join" | "system";
  text: string;
  related_post_id?: string;
  related_user_id?: string;
  created_at: string;
  read: boolean;
};
