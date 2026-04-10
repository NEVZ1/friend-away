import Image from "next/image";

import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name: string;
  avatarUrl: string;
  className?: string;
};

export function UserAvatar({ name, avatarUrl, className }: UserAvatarProps) {
  return (
    <div className={cn("relative h-11 w-11 overflow-hidden rounded-full border border-white/80", className)}>
      <Image src={avatarUrl} alt={name} fill className="object-cover" sizes="44px" />
    </div>
  );
}
