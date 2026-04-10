import { CommunityCard } from "@/components/community-card";
import type { Community } from "@/lib/types";

export function CommunitySuggestionCard({ community }: { community: Community }) {
  return <CommunityCard community={community} />;
}
