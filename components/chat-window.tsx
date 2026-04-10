"use client";

import { SendHorizonal } from "lucide-react";

import { MessageBubble } from "@/components/message-bubble";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { currentUser } from "@/lib/mock-data";
import type { Message } from "@/lib/types";

export function ChatWindow({ messages }: { messages: Message[] }) {
  const liveMessages = useRealtimeMessages(messages);

  return (
    <Card className="flex h-[520px] flex-col gap-4">
      <div className="border-b border-slate-100 pb-4">
        <p className="font-semibold">Mateus Silva</p>
        <p className="text-sm text-muted">Planning a coffee meetup in Berlin</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {liveMessages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            isOwnMessage={message.sender_id === currentUser.id}
          />
        ))}
      </div>
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-primary"
          placeholder="Write a message"
        />
        <Button className="gap-2">
          Send
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
