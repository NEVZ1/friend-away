"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useDemo } from "@/components/demo/demo-provider";

const protectedRoutes = ["/", "/communities", "/discover", "/messages", "/profile"];

export function DemoRouteGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { isReady, currentUser } = useDemo();

  useEffect(() => {
    if (!isReady || process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return;
    }

    const currentPath = pathname ?? "/";
    const onboardingDone = currentUser?.onboarding_completed;
    const isAuthRoute = currentPath.startsWith("/auth");
    const isOnboardingRoute = currentPath === "/onboarding";
    const needsAuth = protectedRoutes.some((route) => currentPath === route || currentPath.startsWith(`${route}/`));

    if (!currentUser && needsAuth) {
      router.replace("/auth/login");
      return;
    }

    if (currentUser && isAuthRoute) {
      router.replace(onboardingDone ? "/" : "/onboarding");
      return;
    }

    if (currentUser && !onboardingDone && !isOnboardingRoute) {
      router.replace("/onboarding");
      return;
    }

    if (currentUser && onboardingDone && isOnboardingRoute) {
      router.replace("/");
    }
  }, [currentUser, isReady, pathname, router]);

  return null;
}
