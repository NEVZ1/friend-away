import { CommunityCard } from "@/components/community-card";
import type { Community } from "@/lib/types";

export function CommunityList({ communities }: { communities: Community[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {communities.map((community) => (
        <CommunityCard key={community.id} community={community} />
      ))}
    </div>
  );
}
