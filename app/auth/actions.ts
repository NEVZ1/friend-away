"use server";

import { redirect } from "next/navigation";

import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type AuthState = {
  error?: string;
};

export async function login(_previousState: AuthState | void, formData: FormData): Promise<AuthState | void> {
  if (!hasSupabasePublicEnv()) {
    return { error: "Supabase environment variables are missing." };
  }

  const supabase = await createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signup(_previousState: AuthState | void, formData: FormData): Promise<AuthState | void> {
  if (!hasSupabasePublicEnv()) {
    return { error: "Supabase environment variables are missing." };
  }

  const supabase = await createClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "");
  const currentCity = String(formData.get("current_city") ?? "");
  const countryOrigin = String(formData.get("country_origin") ?? "");
  const arrivalDate = String(formData.get("arrival_date") ?? "");
  const userType = String(formData.get("user_type") ?? "other");
  const bio = String(formData.get("bio") ?? "");

  if (!email || !password || !name || !currentCity || !countryOrigin || !arrivalDate) {
    return { error: "Please fill in all required fields." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        current_city: currentCity,
        country_origin: countryOrigin,
        arrival_date: arrivalDate,
        user_type: userType,
        bio
      }
    }
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    await (supabase.from("users") as any).upsert({
      id: data.user.id,
      email,
      name,
      current_city: currentCity,
      country_origin: countryOrigin,
      arrival_date: arrivalDate,
      user_type: userType,
      bio,
      onboarding_completed: false
    });
  }

  redirect("/onboarding");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}
