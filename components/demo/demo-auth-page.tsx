"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDemo } from "@/components/demo/demo-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const seededAccounts = [
  { name: "Aylin", email: "aylin@friendaway.app" },
  { name: "Mateus", email: "mateus@example.com" },
  { name: "Sofia", email: "sofia@example.com" }
];
const guestNamePool = [
  ["Alex", "Guest"],
  ["Mina", "Visitor"],
  ["Noah", "Explorer"],
  ["Lara", "Traveller"]
];

export function DemoAuthPage({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { login, quickStart, resetDemo } = useDemo();
  const [error, setError] = useState<string | null>(null);

  function startGuestSession() {
    const index = Date.now() % guestNamePool.length;
    const [first, last] = guestNamePool[index];
    const result = quickStart({ first_name: first, last_name: last });
    if (result.error) {
      setError(result.error);
      return;
    }
    router.push("/");
  }

  function onSubmit(formData: FormData) {
    if (mode === "login") {
      const result = login(String(formData.get("email") ?? ""));
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push("/");
      return;
    }

    const result = quickStart({
      first_name: String(formData.get("first_name") ?? ""),
      last_name: String(formData.get("last_name") ?? "")
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-4">
      <Card className="w-full max-w-lg space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FriendAway demo mode</p>
          <h1 className="mt-3 text-3xl font-semibold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm text-muted">
            {mode === "login"
              ? "Use a seeded email like aylin@friendaway.app, mateus@example.com, or sofia@example.com."
              : "Start in seconds with only your name. You can edit profile details later."}
          </p>
        </div>
        {mode === "login" ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Fast entry</p>
            <button
              type="button"
              onClick={startGuestSession}
              className="w-full rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-left transition hover:bg-primary/10"
            >
              <p className="text-sm font-semibold text-primary">Continue as guest</p>
              <p className="text-xs text-muted">Instant dashboard access, no typing required.</p>
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Seeded accounts</p>
            <div className="grid gap-2 md:grid-cols-3">
              {seededAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    const result = login(account.email);
                    if (result.error) {
                      setError(result.error);
                      return;
                    }
                    router.push("/");
                  }}
                  className="rounded-xl border border-border bg-slate-50 px-3 py-3 text-left transition hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold">{account.name}</p>
                  <p className="truncate text-xs text-muted">{account.email}</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm text-muted">
          <span>Browser-only data. Safe to experiment.</span>
          <button
            type="button"
            className="font-medium text-primary"
            onClick={() => {
              resetDemo();
              setError(null);
            }}
          >
            Restore sample data
          </button>
        </div>
        <form action={(formData) => onSubmit(formData)} className={mode === "login" ? "space-y-4" : "grid gap-4 md:grid-cols-2"}>
          {mode === "signup" ? (
            <>
              <input className="rounded-xl border border-border px-4 py-3" placeholder="First name" name="first_name" />
              <input className="rounded-xl border border-border px-4 py-3" placeholder="Surname" name="last_name" />
            </>
          ) : null}
          {mode === "login" ? (
            <input
              className="w-full rounded-xl border border-border px-4 py-3"
              placeholder="Email"
              type="email"
              name="email"
              autoFocus
            />
          ) : null}
          {error ? <p className={mode === "login" ? "text-sm text-rose-500" : "text-sm text-rose-500 md:col-span-2"}>{error}</p> : null}
          <Button className={mode === "login" ? "w-full" : "md:col-span-2"}>
            {mode === "login" ? "Log in" : "Start Demo"}
          </Button>
        </form>
        <p className="text-sm text-muted">
          {mode === "login" ? "New here? " : "Already have an account? "}
          <Link href={mode === "login" ? "/auth/signup" : "/auth/login"} className="font-medium text-primary">
            {mode === "login" ? "Create your account" : "Log in"}
          </Link>
        </p>
        {mode === "signup" ? (
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-muted">
            This creates a local browser-only demo profile and opens your dashboard immediately.
          </div>
        ) : null}
      </Card>
    </main>
  );
}
