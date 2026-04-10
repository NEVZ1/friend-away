import { Bookmark, Flag, Heart, MessageSquare, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { PostMediaGallery } from "@/components/post-media-gallery";
import { UserAvatar } from "@/components/user-avatar";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/lib/utils";

export function PostCard({
  post,
  viewerId,
  onToggleLike,
  onToggleSave,
  onReport
}: {
  post: Post;
  viewerId?: string | null;
  onToggleLike?: (postId: string) => void;
  onToggleSave?: (postId: string) => void;
  onReport?: (postId: string) => void;
}) {
  const liked = Boolean(viewerId && (post.liked_by ?? []).includes(viewerId));
  const saved = Boolean(viewerId && (post.saved_by ?? []).includes(viewerId));

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
      {post.media_urls && post.media_urls.length > 0 ? <PostMediaGallery mediaUrls={post.media_urls} /> : null}
      <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          {post.comments_count ?? 0} comments
        </span>
        <button
          type="button"
          onClick={() => onToggleLike?.(post.id)}
          className={cn("inline-flex items-center gap-2", liked ? "text-rose-500" : "text-muted")}
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-current" : "")} />
          {post.likes_count ?? 0}
        </button>
        <button
          type="button"
          onClick={() => onToggleSave?.(post.id)}
          className={cn("inline-flex items-center gap-2", saved ? "text-primary" : "text-muted")}
        >
          <Bookmark className={cn("h-4 w-4", saved ? "fill-current" : "")} />
          {post.saves_count ?? 0}
        </button>
        <button type="button" onClick={() => onReport?.(post.id)} className="inline-flex items-center gap-2 text-muted">
          <Flag className="h-4 w-4" />
          {post.reports_count ?? 0}
        </button>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{post.city} feed</span>
      </div>
    </Card>
  );
}
