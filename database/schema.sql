create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null unique,
  country_origin text,
  current_city text,
  arrival_date date,
  user_type text check (user_type in ('student', 'worker', 'expat', 'other')),
  bio text,
  avatar_url text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  country_origin text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.community_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  community_id uuid not null references public.communities (id) on delete cascade,
  joined_at timestamptz not null default timezone('utc', now()),
  unique (user_id, community_id)
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  community_id uuid references public.communities (id) on delete set null,
  city text not null,
  content text not null,
  media_urls text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.users (id) on delete cascade,
  receiver_id uuid not null references public.users (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.users (id) on delete cascade,
  following_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  unique (follower_id, following_id)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.users (id) on delete cascade,
  reported_user_id uuid not null references public.users (id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  actor_name text not null,
  type text not null check (type in ('like', 'comment', 'message', 'community_join', 'system')),
  text text not null,
  related_post_id uuid references public.posts (id) on delete set null,
  related_user_id uuid references public.users (id) on delete set null,
  read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_users_current_city on public.users (current_city);
create index if not exists idx_communities_city on public.communities (city);
create index if not exists idx_posts_city_created_at on public.posts (city, created_at desc);
create index if not exists idx_posts_user_id on public.posts (user_id);
create index if not exists idx_comments_post_id on public.comments (post_id);
create index if not exists idx_messages_receiver_id on public.messages (receiver_id, created_at desc);
create index if not exists idx_messages_sender_receiver_created on public.messages (sender_id, receiver_id, created_at desc);
create index if not exists idx_notifications_user_created on public.notifications (user_id, created_at desc);
create index if not exists idx_notifications_user_read on public.notifications (user_id, read);

alter table public.users enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.messages enable row level security;
alter table public.follows enable row level security;
alter table public.reports enable row level security;
alter table public.notifications enable row level security;

create policy "Users can read profiles"
on public.users for select
using (true);

create policy "Users manage own profile"
on public.users for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Communities are readable"
on public.communities for select
using (true);

create policy "Authenticated users create communities"
on public.communities for insert
with check (auth.role() = 'authenticated');

create policy "Community membership is readable"
on public.community_members for select
using (true);

create policy "Users manage own memberships"
on public.community_members for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Posts are readable"
on public.posts for select
using (true);

create policy "Users manage own posts"
on public.posts for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Comments are readable"
on public.comments for select
using (true);

create policy "Users manage own comments"
on public.comments for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Message participants can read"
on public.messages for select
using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users send their own messages"
on public.messages for insert
with check (auth.uid() = sender_id);

create policy "Users read follows"
on public.follows for select
using (true);

create policy "Users manage own follows"
on public.follows for all
using (auth.uid() = follower_id)
with check (auth.uid() = follower_id);

create policy "Users create reports"
on public.reports for insert
with check (auth.uid() = reporter_id);

create policy "Users read own notifications"
on public.notifications for select
using (auth.uid() = user_id);

create policy "Users update own notifications"
on public.notifications for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Authenticated users create notifications"
on public.notifications for insert
with check (auth.role() = 'authenticated');

create or replace view public.city_feed as
select
  posts.id,
  posts.city,
  posts.content,
  posts.created_at,
  posts.community_id,
  users.id as user_id,
  users.name,
  users.avatar_url,
  users.country_origin
from public.posts
join public.users on users.id = posts.user_id;

-- Example query:
-- select * from public.posts
-- where city = 'Berlin'
-- order by created_at desc
-- limit 50;
