"use client";

import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { InboxList } from "@/components/inbox-list";
import { DemoLoadingScreen } from "@/components/demo/demo-loading-screen";
import { MessageBubble } from "@/components/message-bubble";
import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DemoMessagesScreen() {
  const { currentUser, isReady, state, sendMessage } = useDemo();
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const conversations = useMemo(
    () =>
      state.profiles
        .filter(
          (profile) =>
            profile.id !== currentUser?.id &&
            (profile.name.toLowerCase().includes(query.toLowerCase()) ||
              profile.current_city.toLowerCase().includes(query.toLowerCase()))
        )
        .map((profile) => {
          const thread = state.messages.filter(
            (message) =>
              (message.sender_id === profile.id && message.receiver_id === currentUser?.id) ||
              (message.sender_id === currentUser?.id && message.receiver_id === profile.id)
          );
          const last = thread[thread.length - 1];
          return {
            id: `conversation-${profile.id}`,
            participant: profile,
            last_message: last?.content ?? "No messages yet",
            last_message_at: last?.created_at ?? profile.created_at,
            unread_count: thread.filter((message) => message.sender_id === profile.id).slice(-3).length
          };
        }),
    [currentUser?.id, query, state.messages, state.profiles]
  );

  useEffect(() => {
    if (!activeUserId && conversations[0]) {
      setActiveUserId(conversations[0].participant.id);
    }
    if (activeUserId && !conversations.some((item) => item.participant.id === activeUserId)) {
      setActiveUserId(conversations[0]?.participant.id ?? null);
    }
  }, [activeUserId, conversations]);

  const activeConversation = conversations.find((item) => item.participant.id === activeUserId) ?? conversations[0];
  const thread = state.messages.filter(
    (message) =>
      activeConversation &&
      ((message.sender_id === activeConversation.participant.id && message.receiver_id === currentUser?.id) ||
        (message.sender_id === currentUser?.id && message.receiver_id === activeConversation.participant.id))
  );

  if (!isReady) {
    return <DemoLoadingScreen />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <AppShell title="Messages" subtitle="Direct conversations that turn online connections into real plans." city={currentUser.current_city}>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <Card className="p-4">
            <input
              className="w-full rounded-xl border border-border px-4 py-3 text-sm"
              placeholder="Search people or cities"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Card>
          <InboxList
            conversations={conversations}
            onSelect={setActiveUserId}
            activeParticipantId={activeConversation?.participant.id}
          />
        </div>
        <Card className="flex h-[520px] flex-col gap-4">
          {activeConversation ? (
            <div className="border-b border-slate-100 pb-4">
              <p className="font-semibold">{activeConversation.participant.name}</p>
              <p className="text-sm text-muted">
                {activeConversation.participant.country_origin} in {activeConversation.participant.current_city}
              </p>
            </div>
          ) : null}
          <div className="flex-1 space-y-3 overflow-y-auto">
            {!activeConversation ? <p className="text-sm text-muted">No conversation matches this search.</p> : null}
            {activeConversation && thread.length === 0 ? <p className="text-sm text-muted">No messages yet. Start the conversation.</p> : null}
            {thread.map((message) => (
              <MessageBubble key={message.id} content={message.content} isOwnMessage={message.sender_id === currentUser.id} />
            ))}
          </div>
          <div className="flex gap-3">
            <input
              className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-sm"
              placeholder="Write a message"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <Button
              onClick={() => {
                if (!activeConversation) {
                  return;
                }
                const result = sendMessage(activeConversation.participant.id, content);
                if (!result.error) {
                  setContent("");
                  setFeedback("Message sent");
                  window.setTimeout(() => setFeedback(null), 1500);
                }
              }}
              disabled={!activeConversation}
            >
              Send
            </Button>
          </div>
          {feedback ? <p className="text-sm text-accent">{feedback}</p> : null}
        </Card>
      </div>
    </AppShell>
  );
}
