"use client";

import { useState } from "react";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { formatRelativeDate } from "@/lib/utils";

export function DemoCommentThread({ postId }: { postId: string }) {
  const { state, addComment } = useDemo();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const items = state.comments.filter((comment) => comment.post_id === postId);

  return (
    <Card className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Recent comments</h3>
      {items.map((comment) => (
        <div key={comment.id} className="flex gap-3">
          <UserAvatar name={comment.author.name} avatarUrl={comment.author.avatar_url} className="h-9 w-9" />
          <div className="flex-1 rounded-xl bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{comment.author.name}</p>
              <span className="text-xs text-muted">{formatRelativeDate(comment.created_at)}</span>
            </div>
            <p className="mt-1 text-sm text-slate-700">{comment.content}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-xl border border-border px-4 py-3 text-sm"
          placeholder="Add a comment"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Button
          onClick={() => {
            const result = addComment(postId, content);
            if (result.error) {
              setError(result.error);
              return;
            }
            setContent("");
            setError(null);
            setSuccess("Comment added");
            window.setTimeout(() => setSuccess(null), 1500);
          }}
        >
          Reply
        </Button>
      </div>
      {error ? <p className="text-sm text-rose-500">{error}</p> : null}
      {success ? <p className="text-sm text-accent">{success}</p> : null}
    </Card>
  );
}
