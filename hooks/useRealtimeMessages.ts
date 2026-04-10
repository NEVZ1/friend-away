"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import type { Message } from "@/lib/types";

export function useRealtimeMessages(initialMessages: Message[]) {
  const [items, setItems] = useState(initialMessages);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("messages-stream")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages"
        },
        (payload) => {
          setItems((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return items;
}
