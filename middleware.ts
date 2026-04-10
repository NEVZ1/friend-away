import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublishableKey, getSupabaseUrl, hasSupabasePublicEnv } from "@/lib/supabase/env";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const previewMode = process.env.NEXT_PUBLIC_PUBLIC_PREVIEW !== "false";
  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicRoute = isAuthRoute || pathname.startsWith("/api") || pathname === "/favicon.ico";

  if (!hasSupabasePublicEnv()) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({
    request
  });

  try {
    const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: Record<string, unknown>) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request
          });
          response.cookies.set({ name, value: "", ...options });
        }
      }
    });

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user && !isPublicRoute && !previewMode) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (user && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (user) {
      const { data } = await supabase
        .from("users")
        .select("name,current_city,onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();
      const profile = data as
        | { name?: string | null; current_city?: string | null; onboarding_completed?: boolean | null }
        | null;

      const needsOnboarding = !profile || !profile.name || !profile.current_city || profile.onboarding_completed === false;

      if (needsOnboarding && pathname !== "/onboarding") {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }

      if (!needsOnboarding && pathname === "/onboarding") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (_error) {
    return NextResponse.next({ request });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
