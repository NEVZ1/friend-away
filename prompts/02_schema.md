Create a Supabase PostgreSQL schema and migration files.

Tables:
users
- id uuid primary key
- name text
- email text unique
- country_origin text
- current_city text
- arrival_date date
- bio text
- avatar_url text
- created_at timestamptz default now()

communities
- id uuid primary key
- name text
- city text
- country_origin text
- created_at timestamptz default now()

community_members
- id uuid primary key
- user_id uuid references users(id)
- community_id uuid references communities(id)
- joined_at timestamptz default now()

posts
- id uuid primary key
- user_id uuid references users(id)
- community_id uuid references communities(id)
- city text
- content text
- created_at timestamptz default now()

comments
- id uuid primary key
- post_id uuid references posts(id)
- user_id uuid references users(id)
- content text
- created_at timestamptz default now()

messages
- id uuid primary key
- sender_id uuid references users(id)
- receiver_id uuid references users(id)
- content text
- created_at timestamptz default now()

follows
- id uuid primary key
- follower_id uuid references users(id)
- following_id uuid references users(id)
- created_at timestamptz default now()

reports
- id uuid primary key
- reporter_id uuid references users(id)
- reported_user_id uuid references users(id)
- reason text
- created_at timestamptz default now()

Also add indexes for:
- users(current_city)
- posts(city, created_at desc)
- posts(user_id)
- comments(post_id)
- messages(sender_id, receiver_id, created_at)
