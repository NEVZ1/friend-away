"use client";

import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import type { Conversation } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

export function InboxList({
  conversations,
  onSelect,
  activeParticipantId
}: {
  conversations: Conversation[];
  onSelect?: (participantId: string) => void;
  activeParticipantId?: string;
}) {
  return (
    <Card className="space-y-3">
      <h2 className="text-lg font-semibold">Recent chats</h2>
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          type="button"
          onClick={() => onSelect?.(conversation.participant.id)}
          className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${
            activeParticipantId === conversation.participant.id ? "bg-primary/10" : "bg-slate-50"
          }`}
        >
          <UserAvatar name={conversation.participant.name} avatarUrl={conversation.participant.avatar_url} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-sm font-semibold">{conversation.participant.name}</p>
              <span className="text-xs text-muted">{formatRelativeDate(conversation.last_message_at)}</span>
            </div>
            <p className="truncate text-xs text-muted">{conversation.last_message}</p>
          </div>
          {conversation.unread_count > 0 ? (
            <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
              {conversation.unread_count}
            </span>
          ) : null}
        </button>
      ))}
    </Card>
  );
}
