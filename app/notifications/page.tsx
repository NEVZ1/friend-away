import { AppShell } from "@/components/app-shell";
import { DemoNotificationsScreen } from "@/components/demo/demo-notifications-screen";
import { markAllNotificationsReadAction } from "@/app/social/actions";
import { Card } from "@/components/ui/card";
import { getCurrentUser, getNotifications, hasSupabaseEnv } from "@/lib/supabase/queries";
import { formatRelativeDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function NotificationsPage() {
  if (!hasSupabaseEnv()) {
    return <DemoNotificationsScreen />;
  }

  const [user, notifications] = await Promise.all([getCurrentUser(), getNotifications()]);

  return (
    <AppShell title="Notifications" subtitle="Keep up with likes, comments, messages, and community updates." city={user.current_city}>
      <div className="space-y-4">
        <form action={markAllNotificationsReadAction} className="flex justify-end">
          <Button variant="secondary">Mark all as read</Button>
        </form>
        {notifications.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">No notifications yet. Activity from your network will appear here.</p>
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
