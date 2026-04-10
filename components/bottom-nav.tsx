"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, MessageCircleMore, Shapes, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/communities", label: "Communities", icon: Shapes },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/messages", label: "Messages", icon: MessageCircleMore },
  { href: "/profile", label: "Profile", icon: UserRound }
];

export function BottomNav() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[min(92%,560px)] rounded-2xl border border-white/80 bg-white/90 p-2 shadow-soft backdrop-blur">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium transition",
                active ? "bg-primary text-white" : "text-muted hover:bg-slate-50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
