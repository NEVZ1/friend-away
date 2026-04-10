import { MessageSquare, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import type { Post } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="space-y-4 transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)]">
      <div className="flex items-start gap-3">
        <UserAvatar name={post.author.name} avatarUrl={post.author.avatar_url} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted">
                {post.author.country_origin} in {post.city}
              </p>
            </div>
            <p className="text-sm text-muted">{formatRelativeDate(post.created_at)}</p>
          </div>
          {post.community ? (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" />
              {post.community.name}
            </div>
          ) : null}
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-700">{post.content}</p>
      <div className="flex items-center gap-5 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          {post.comments_count ?? 0} comments
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{post.city} feed</span>
      </div>
    </Card>
  );
}
