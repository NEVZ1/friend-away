import { AppShell } from "@/components/app-shell";
import { ChatWindow } from "@/components/chat-window";
import { DemoMessagesScreen } from "@/components/demo/demo-messages-screen";
import { InboxList } from "@/components/inbox-list";
import { getConversations, getCurrentUser, getMessages, hasSupabaseEnv } from "@/lib/supabase/queries";

export default async function MessagesPage() {
  if (!hasSupabaseEnv()) {
    return <DemoMessagesScreen />;
  }

  const [user, thread, inbox] = await Promise.all([getCurrentUser(), getMessages(), getConversations()]);

  return (
    <AppShell
      title="Messages"
      subtitle="Direct conversations that turn online connections into real plans."
      city={user.current_city}
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <InboxList conversations={inbox} />
        <ChatWindow messages={thread} />
      </div>
    </AppShell>
  );
}
