import Link from "next/link";

import { login } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth/auth-form";
import { DemoAuthPage } from "@/components/demo/demo-auth-page";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return <DemoAuthPage mode="login" />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-4">
      <Card className="w-full max-w-md space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FriendAway</p>
          <h1 className="mt-3 text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Log in to your city network and continue the conversation.</p>
        </div>
        <AuthForm
          action={login}
          submitLabel="Log in"
          fields={
            <>
              <input
                className="w-full rounded-xl border border-border px-4 py-3"
                placeholder="Email"
                type="email"
                name="email"
              />
              <input
                className="w-full rounded-xl border border-border px-4 py-3"
                placeholder="Password"
                type="password"
                name="password"
              />
            </>
          }
        />
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-muted">
          Demo mode works without Supabase, but real auth requires `.env.local` values.
        </div>
        <p className="text-sm text-muted">
          New here?{" "}
          <Link href="/auth/signup" className="font-medium text-primary">
            Create your account
          </Link>
        </p>
      </Card>
    </main>
  );
}
