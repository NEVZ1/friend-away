"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Compass, Home, MessageCircleMore, Shapes, UserRound, Zap } from "lucide-react";

import { useDemo } from "@/components/demo/demo-provider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/communities", label: "Communities", icon: Shapes },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/messages", label: "Messages", icon: MessageCircleMore },
  { href: "/profile", label: "Profile", icon: UserRound }
];

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  const { currentUser, quickStart, state } = useDemo();
  const unreadCount = currentUser
    ? state.notifications.filter((notification) => notification.user_id === currentUser.id && !notification.read).length
    : 0;

  function startGuestSession() {
    const pool: Array<[string, string]> = [
      ["Alex", "Guest"],
      ["Mina", "Visitor"],
      ["Noah", "Explorer"],
      ["Lara", "Traveller"]
    ];
    const [first, last] = pool[Date.now() % pool.length];
    const result = quickStart({ first_name: first, last_name: last });
    if (!result.error) {
      router.push("/");
    }
  }

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto w-[min(94%,700px)] rounded-2xl border border-white/80 bg-white/90 p-2 shadow-soft backdrop-blur">
      {!currentUser ? (
        <button
          type="button"
          onClick={startGuestSession}
          className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white"
        >
          <Zap className="h-4 w-4" />
          Start in 1 tap
        </button>
      ) : null}
      <div className="grid grid-cols-6 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? currentPath === "/" : currentPath.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-xl px-2 py-3 text-xs font-medium transition",
                active ? "bg-primary text-white" : "text-muted hover:bg-slate-50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.href === "/notifications" && unreadCount > 0 ? (
                <span className="absolute right-2 top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
