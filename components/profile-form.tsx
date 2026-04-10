"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/lib/types";

type ActionState = {
  error?: string;
  success?: string;
};

type ProfileAction = (state: ActionState | void, formData: FormData) => Promise<ActionState | void>;

export function ProfileForm({
  action,
  submitLabel,
  user
}: {
  action: ProfileAction;
  submitLabel: string;
  user: UserProfile;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="grid gap-4 md:grid-cols-2">
      <input className="rounded-xl border border-border px-4 py-3 md:col-span-2" name="name" defaultValue={user.name} />
      <input
        className="rounded-xl border border-border px-4 py-3"
        name="country_origin"
        defaultValue={user.country_origin}
      />
      <input className="rounded-xl border border-border px-4 py-3" name="current_city" defaultValue={user.current_city} />
      <input
        className="rounded-xl border border-border px-4 py-3"
        type="date"
        name="arrival_date"
        defaultValue={user.arrival_date}
      />
      <select className="rounded-xl border border-border px-4 py-3" name="user_type" defaultValue={user.user_type}>
        <option value="student">Student</option>
        <option value="worker">Worker</option>
        <option value="expat">Expat</option>
        <option value="other">Other</option>
      </select>
      <input className="rounded-xl border border-border px-4 py-3 md:col-span-2" name="avatar_url" defaultValue={user.avatar_url} />
      <textarea className="min-h-32 rounded-xl border border-border px-4 py-3 md:col-span-2" name="bio" defaultValue={user.bio} />
      {state?.error ? <p className="text-sm text-rose-500 md:col-span-2">{state.error}</p> : null}
      {state?.success ? <p className="text-sm text-accent md:col-span-2">{state.success}</p> : null}
      <Button className="md:col-span-2" disabled={pending}>
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
