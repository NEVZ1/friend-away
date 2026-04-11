import Link from "next/link";

import { signup } from "@/app/auth/actions";
import { AuthForm } from "@/components/auth/auth-form";
import { DemoAuthPage } from "@/components/demo/demo-auth-page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isPublicPreviewMode } from "@/lib/supabase/env";

export default function SignupPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || isPublicPreviewMode()) {
    return <DemoAuthPage mode="signup" />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-4">
      <Card className="w-full max-w-lg space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FriendAway</p>
          <h1 className="mt-3 text-3xl font-semibold">Create your account</h1>
          <p className="mt-2 text-sm text-muted">Build your profile around where you are and where you came from.</p>
        </div>
        <AuthForm
          action={signup}
          submitLabel="Join FriendAway"
          fields={
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-xl border border-border px-4 py-3 md:col-span-2"
                placeholder="Full name"
                name="name"
              />
              <input className="rounded-xl border border-border px-4 py-3" placeholder="Origin country" name="country_origin" />
              <input className="rounded-xl border border-border px-4 py-3" placeholder="Current city" name="current_city" />
              <input className="rounded-xl border border-border px-4 py-3" placeholder="Arrival date" type="date" name="arrival_date" />
              <select className="rounded-xl border border-border px-4 py-3" name="user_type" defaultValue="other">
                <option value="student">Student</option>
                <option value="worker">Worker</option>
                <option value="expat">Expat</option>
                <option value="other">Other</option>
              </select>
              <input className="rounded-xl border border-border px-4 py-3" placeholder="Email" type="email" name="email" />
              <input
                className="rounded-xl border border-border px-4 py-3 md:col-span-2"
                placeholder="Password"
                type="password"
                name="password"
              />
              <textarea
                className="min-h-28 rounded-xl border border-border px-4 py-3 md:col-span-2"
                placeholder="Short bio"
                name="bio"
              />
            </div>
          }
        />
        <div className="flex justify-end">
          <Link href="/auth/login?guest=1">
            <Button variant="secondary">Continue as guest</Button>
          </Link>
        </div>
        <p className="text-sm text-muted">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary">
            Log in
          </Link>
        </p>
      </Card>
    </main>
  );
}
