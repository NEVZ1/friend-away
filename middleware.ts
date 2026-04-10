import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith("/auth");
  const isPublicRoute = isAuthRoute || pathname.startsWith("/api") || pathname === "/favicon.ico";

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
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
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !isPublicRoute) {
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
    const profile = data as { name?: string | null; current_city?: string | null; onboarding_completed?: boolean | null } | null;

    const needsOnboarding =
      !profile || !profile.name || !profile.current_city || profile.onboarding_completed === false;

    if (needsOnboarding && pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    if (!needsOnboarding && pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
