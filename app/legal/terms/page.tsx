import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-hero px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Card className="space-y-4">
          <h1 className="text-2xl font-semibold">FriendAway Terms of Service</h1>
          <p className="text-sm text-muted">Effective date: April 10, 2026</p>
          <p className="text-sm text-slate-700">
            FriendAway helps people living abroad connect by city and community. By using the app, you agree not to post illegal
            content, abuse others, or misuse private information.
          </p>
          <h2 className="text-lg font-semibold">Account responsibilities</h2>
          <p className="text-sm text-slate-700">
            You are responsible for your account activity and for keeping your login credentials secure. We may suspend accounts
            involved in spam, harassment, impersonation, fraud, or coordinated abuse.
          </p>
          <h2 className="text-lg font-semibold">Content and moderation</h2>
          <p className="text-sm text-slate-700">
            You keep ownership of your content. By posting, you grant FriendAway permission to display and distribute your content
            inside the service. Reported content may be reviewed and removed to protect user safety.
          </p>
          <h2 className="text-lg font-semibold">Liability and availability</h2>
          <p className="text-sm text-slate-700">
            FriendAway is provided on an as-is basis. We work to keep the service available but cannot guarantee uninterrupted
            operation. We are not responsible for offline interactions between users.
          </p>
        </Card>
        <p className="text-sm text-muted">
          Questions? See <Link href="/legal/privacy" className="text-primary">Privacy Policy</Link> and{" "}
          <Link href="/legal/community-guidelines" className="text-primary">Community Guidelines</Link>.
        </p>
      </div>
    </main>
  );
}
