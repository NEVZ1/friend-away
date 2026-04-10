"use client";

import { useActionState } from "react";
import { Sparkles } from "lucide-react";

import { createPost } from "@/app/feed/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import type { UserProfile } from "@/lib/types";

export function CreatePost({ user, prompts }: { user: UserProfile; prompts: string[] }) {
  const [state, formAction, pending] = useActionState(createPost, {});

  return (
    <Card className="space-y-4">
      <form action={formAction} className="space-y-4">
        <div className="flex items-center gap-3">
          <UserAvatar name={user.name} avatarUrl={user.avatar_url} />
          <div>
            <p className="font-semibold">Share with {user.current_city}</p>
            <p className="text-sm text-muted">Ask questions, plan meetups, or help recent arrivals.</p>
          </div>
        </div>
        <input type="hidden" name="city" value={user.current_city} />
        <textarea
          className="min-h-28 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-primary"
          placeholder="What do you want to ask or share with your city?"
          name="content"
        />
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <span
              key={prompt}
              className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {prompt}
            </span>
          ))}
        </div>
        {state?.error ? <p className="text-sm text-rose-500">{state.error}</p> : null}
        {state?.success ? <p className="text-sm text-accent">{state.success}</p> : null}
        <div className="flex justify-end">
          <Button disabled={pending}>{pending ? "Posting..." : "Post to city feed"}</Button>
        </div>
      </form>
    </Card>
  );
}
