import type { Comment } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { formatRelativeDate } from "@/lib/utils";

export function CommentSection({ items }: { items: Comment[] }) {
  return (
    <Card className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Recent comments</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted">No comments yet. Be the first to help.</p>
      ) : null}
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
    </Card>
  );
}
