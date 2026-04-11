"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function InviteCard({ city }: { city: string }) {
  const [copied, setCopied] = useState(false);
  const inviteLink = `https://friend-away.vercel.app/auth/signup?city=${encodeURIComponent(city)}`;

  return (
    <Card className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Invite Friends</h3>
      <p className="text-sm text-muted">
        Bring more people into {city}. Invitations improve your city feed and unlock better matches.
      </p>
      <div className="rounded-xl border border-border bg-slate-50 px-3 py-2 text-xs text-slate-600">{inviteLink}</div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={async () => {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
          }}
        >
          {copied ? "Copied" : "Copy Invite Link"}
        </Button>
      </div>
    </Card>
  );
}
