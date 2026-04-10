"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { UserProfile } from "@/lib/types";

export function DemoProfileForm({
  user,
  mode
}: {
  user?: UserProfile;
  mode: "onboarding" | "edit";
}) {
  const router = useRouter();
  const { completeOnboarding, currentUser, updateProfile } = useDemo();
  const [error, setError] = useState<string | null>(null);
  const targetUser = user ?? currentUser;

  if (!targetUser) {
    return null;
  }

  return (
    <Card className="w-full max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {mode === "onboarding" ? "FriendAway onboarding" : "Edit profile"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          {mode === "onboarding" ? "Set up your city profile" : "Update your FriendAway identity"}
        </h1>
      </div>
      <form
        action={(formData) => {
          const payload = {
            name: String(formData.get("name") ?? ""),
            current_city: String(formData.get("current_city") ?? ""),
            country_origin: String(formData.get("country_origin") ?? ""),
            arrival_date: String(formData.get("arrival_date") ?? ""),
            user_type: String(formData.get("user_type") ?? "other") as UserProfile["user_type"],
            bio: String(formData.get("bio") ?? ""),
            avatar_url: String(formData.get("avatar_url") ?? "")
          };

          if (!payload.name || !payload.current_city || !payload.country_origin || !payload.arrival_date) {
            setError("Complete the required profile fields.");
            return;
          }

          if (mode === "onboarding") {
            completeOnboarding(payload);
            router.push("/");
            return;
          }

          updateProfile(payload);
          router.push("/profile");
        }}
        className="grid gap-4 md:grid-cols-2"
      >
        <input className="rounded-xl border border-border px-4 py-3 md:col-span-2" name="name" defaultValue={targetUser.name} />
        <input className="rounded-xl border border-border px-4 py-3" name="country_origin" defaultValue={targetUser.country_origin} />
        <input className="rounded-xl border border-border px-4 py-3" name="current_city" defaultValue={targetUser.current_city} />
        <input className="rounded-xl border border-border px-4 py-3" type="date" name="arrival_date" defaultValue={targetUser.arrival_date} />
        <select className="rounded-xl border border-border px-4 py-3" name="user_type" defaultValue={targetUser.user_type}>
          <option value="student">Student</option>
          <option value="worker">Worker</option>
          <option value="expat">Expat</option>
          <option value="other">Other</option>
        </select>
        <input className="rounded-xl border border-border px-4 py-3 md:col-span-2" name="avatar_url" defaultValue={targetUser.avatar_url} />
        <textarea className="min-h-32 rounded-xl border border-border px-4 py-3 md:col-span-2" name="bio" defaultValue={targetUser.bio} />
        {error ? <p className="text-sm text-rose-500 md:col-span-2">{error}</p> : null}
        <Button className="md:col-span-2">{mode === "onboarding" ? "Finish onboarding" : "Save profile"}</Button>
      </form>
    </Card>
  );
}
