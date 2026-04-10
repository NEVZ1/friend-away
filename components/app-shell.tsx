import { Bell, Search } from "lucide-react";

import { BottomNav } from "@/components/bottom-nav";
import { DemoSessionControls } from "@/components/demo/demo-session-controls";

export function AppShell({
  children,
  title,
  subtitle,
  aside,
  city
}: Readonly<{
  children: React.ReactNode;
  title: string;
  subtitle: string;
  aside?: React.ReactNode;
  city?: string;
}>) {
  return (
    <div className="min-h-screen bg-hero">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 pb-28 pt-6 md:px-6 lg:px-8">
        <main className="min-w-0 flex-1">
          <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/80 p-5 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                FriendAway
              </span>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-1 text-sm text-muted">{subtitle}</p>
              <div className="mt-4">
                <DemoSessionControls />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-muted">
                <Search className="h-4 w-4" />
                Search city, people, communities
              </div>
              <button className="rounded-xl border border-slate-200 bg-white p-3 text-slate-600">
                <Bell className="h-4 w-4" />
              </button>
              {city ? <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium">{city}</div> : null}
            </div>
          </header>
          {children}
        </main>
        {aside ? <aside className="hidden w-[320px] shrink-0 lg:block">{aside}</aside> : null}
      </div>
      <BottomNav />
    </div>
  );
}
