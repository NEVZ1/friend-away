"use client";

import { AppShell } from "@/components/app-shell";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";
import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";

export function DemoNotificationsScreen() {
  const { currentUser, isReady, markNotificationsRead, state } = useDemo();

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  const viewer = currentUser ?? state.profiles[0];
  const notifications = state.notifications
    .filter((notification) => notification.user_id === viewer.id)
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));

  return (
    <AppShell title="Notifications" subtitle="Keep up with likes, comments, messages, and community updates." city={viewer.current_city}>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button variant="secondary" onClick={markNotificationsRead}>
            Mark all as read
          </Button>
        </div>
        {notifications.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">No notifications yet. Activity from your network appears here.</p>
          </Card>
        ) : null}
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.read ? "border-slate-200" : "border-primary/40 bg-primary/5"}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold">{notification.actor_name}</p>
                <p className="text-sm text-slate-700">{notification.text}</p>
              </div>
              <p className="text-xs text-muted">{formatRelativeDate(notification.created_at)}</p>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
