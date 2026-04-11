import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import type { UserProfile } from "@/lib/types";

export function UserSuggestionCard({
  user,
  isFollowing = false,
  onToggleFollow,
  action
}: {
  user: UserProfile;
  isFollowing?: boolean;
  onToggleFollow?: (userId: string) => void;
  action?: React.ReactNode;
}) {
  return (
    <Card className="flex items-center gap-4">
      <UserAvatar name={user.name} avatarUrl={user.avatar_url} className="h-12 w-12" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{user.name}</p>
        <p className="truncate text-sm text-muted">
          {user.country_origin} • {user.user_type}
        </p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" />
          {user.current_city}
        </p>
      </div>
      {action ?? (
        <Button
          variant={isFollowing ? "ghost" : "secondary"}
          onClick={() => onToggleFollow?.(user.id)}
        >
          {isFollowing ? "Following" : "Connect"}
        </Button>
      )}
    </Card>
  );
}
