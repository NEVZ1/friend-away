"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/queries";

type ActionState = {
  error?: string;
  success?: string;
};

function getProfilePayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    country_origin: String(formData.get("country_origin") ?? "").trim(),
    current_city: String(formData.get("current_city") ?? "").trim(),
    arrival_date: String(formData.get("arrival_date") ?? "").trim(),
    user_type: String(formData.get("user_type") ?? "other"),
    bio: String(formData.get("bio") ?? "").trim(),
    avatar_url: String(formData.get("avatar_url") ?? "").trim(),
    onboarding_completed: true
  };
}

export async function completeOnboarding(_state: ActionState | void, formData: FormData): Promise<ActionState | void> {
  const payload = getProfilePayload(formData);

  if (!payload.name || !payload.country_origin || !payload.current_city || !payload.arrival_date) {
    return { error: "Complete the core profile fields to continue." };
  }

  if (!hasSupabaseEnv()) {
    redirect("/");
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to sign in first." };
  }

  const { error } = await (supabase.from("users") as any).upsert({
    id: user.id,
    email: user.email ?? "",
    ...payload
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateProfile(_state: ActionState | void, formData: FormData): Promise<ActionState> {
  const payload = getProfilePayload(formData);

  if (!payload.name || !payload.country_origin || !payload.current_city || !payload.arrival_date) {
    return { error: "Complete the core profile fields before saving." };
  }

  if (!hasSupabaseEnv()) {
    return { success: "Demo mode: connect Supabase to persist profile changes." };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You need to sign in first." };
  }

  const { error } = await (supabase.from("users") as any).update(payload).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  revalidatePath("/profile/edit");
  return { success: "Profile updated." };
}
