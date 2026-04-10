"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useDemo } from "@/components/demo/demo-provider";

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
    if (currentUser && isAuthRoute) {
      router.replace("/");
      return;
    }

    if (currentUser && onboardingDone && isOnboardingRoute) {
      router.replace("/");
    }
  }, [currentUser, isReady, pathname, router]);

  return null;
}
