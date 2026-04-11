"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function toggleFollowAction(targetUserId: string) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user || !targetUserId || targetUserId === user.id) {
    return;
  }

  const followsTable = supabase.from("follows") as any;
  const notificationsTable = supabase.from("notifications") as any;

  const { data: existing } = await followsTable
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", targetUserId)
    .maybeSingle();

  if (existing?.id) {
    await followsTable.delete().eq("id", existing.id);
  } else {
    const {
      data: { user: actor }
    } = await supabase.auth.getUser();
    await followsTable.insert({
      follower_id: user.id,
      following_id: targetUserId
    });

    await notificationsTable.insert({
      user_id: targetUserId,
      actor_name: actor?.user_metadata?.name ?? "A FriendAway user",
      type: "system",
      text: "started following you.",
      related_user_id: user.id
    });
  }

  revalidatePath("/discover");
  revalidatePath("/profile");
}

export async function markAllNotificationsReadAction() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await (supabase.from("notifications") as any).update({ read: true }).eq("user_id", user.id).eq("read", false);
  revalidatePath("/notifications");
}
