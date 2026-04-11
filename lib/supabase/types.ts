export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          country_origin: string | null;
          current_city: string | null;
          arrival_date: string | null;
          user_type: string | null;
          bio: string | null;
          avatar_url: string | null;
          onboarding_completed: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          country_origin?: string | null;
          current_city?: string | null;
          arrival_date?: string | null;
          user_type?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          onboarding_completed?: boolean | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      communities: {
        Row: {
          id: string;
          name: string;
          city: string;
          country_origin: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city: string;
          country_origin?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["communities"]["Insert"]>;
      };
      community_members: {
        Row: {
          id: string;
          user_id: string;
          community_id: string;
          joined_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          community_id: string;
          joined_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["community_members"]["Insert"]>;
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          community_id: string | null;
          city: string;
          content: string;
          media_urls: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          community_id?: string | null;
          city: string;
          content: string;
          media_urls?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["posts"]["Insert"]>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      follows: {
        Row: {
          id: string;
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          follower_id: string;
          following_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["follows"]["Insert"]>;
      };
      reports: {
        Row: {
          id: string;
          reporter_id: string;
          reported_user_id: string;
          reason: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          reporter_id: string;
          reported_user_id: string;
          reason: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          actor_name: string;
          type: "like" | "comment" | "message" | "community_join" | "system";
          text: string;
          related_post_id: string | null;
          related_user_id: string | null;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          actor_name: string;
          type: "like" | "comment" | "message" | "community_join" | "system";
          text: string;
          related_post_id?: string | null;
          related_user_id?: string | null;
          read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
    };
  };
};
