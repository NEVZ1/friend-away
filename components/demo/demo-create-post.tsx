"use client";

import React from "react";
import { useState } from "react";
import { Sparkles } from "lucide-react";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import type { Community, UserProfile } from "@/lib/types";

export function DemoCreatePost({
  user,
  prompts,
  communities = [],
  defaultCommunityId = ""
}: {
  user: UserProfile;
  prompts: string[];
  communities?: Community[];
  defaultCommunityId?: string;
}) {
  const { createPost } = useDemo();
  const [content, setContent] = useState("");
  const [mediaUrls, setMediaUrls] = useState("");
  const [communityId, setCommunityId] = useState(defaultCommunityId);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <UserAvatar name={user.name} avatarUrl={user.avatar_url} />
        <div>
          <p className="font-semibold">Share with {user.current_city}</p>
          <p className="text-sm text-muted">Ask questions, plan meetups, or help recent arrivals.</p>
        </div>
      </div>
      <textarea
        className="min-h-28 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary"
        placeholder="What do you want to ask or share with your city?"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <textarea
        className="min-h-20 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary"
        placeholder="Optional media URLs (one per line): photos or .mp4 video links"
        value={mediaUrls}
        onChange={(event) => setMediaUrls(event.target.value)}
      />
      {communities.length > 0 ? (
        <select
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm"
          value={communityId}
          onChange={(event) => setCommunityId(event.target.value)}
        >
          <option value="">Post to city feed only</option>
          {communities.map((community) => (
            <option key={community.id} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt) => (
          <span key={prompt} className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {prompt}
          </span>
        ))}
      </div>
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            const parsedMedia = mediaUrls
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean);
            const result = createPost(content, communityId || null, parsedMedia);
            if (result.error) {
              setError(result.error);
              return;
            }
            setContent("");
            setMediaUrls("");
            setCommunityId(defaultCommunityId);
            setError(null);
          }}
        >
          Post to city feed
        </Button>
      </div>
    </Card>
  );
}
