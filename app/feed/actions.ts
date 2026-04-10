"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/queries";

type ActionState = {
  error?: string;
  success?: string;
};

export async function createPost(_state: ActionState, formData: FormData): Promise<ActionState> {
  const content = String(formData.get("content") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const mediaUrls = String(formData.get("media_urls") ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!content || !city) {
    return { error: "Add some context before posting." };
  }

  if (!hasSupabaseEnv()) {
    return { success: "Demo mode: connect Supabase to persist new posts." };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to be logged in to post." };
  }

  let error: { message: string } | null = null;
  const withMedia = await (supabase.from("posts") as any).insert({
    user_id: user.id,
    city,
    content,
    media_urls: mediaUrls
  });
  error = withMedia.error ?? null;

  if (error?.message?.toLowerCase().includes("media_urls")) {
    const fallback = await (supabase.from("posts") as any).insert({
      user_id: user.id,
      city,
      content
    });
    error = fallback.error ?? null;
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: "Your post is live." };
}
