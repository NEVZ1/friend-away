import { Card } from "@/components/ui/card";

export default function CommunityGuidelinesPage() {
  return (
    <main className="min-h-screen bg-hero px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Card className="space-y-4">
          <h1 className="text-2xl font-semibold">Community Guidelines</h1>
          <p className="text-sm text-muted">Effective date: April 10, 2026</p>
          <p className="text-sm text-slate-700">FriendAway is for practical support and real friendships while living abroad.</p>
          <h2 className="text-lg font-semibold">Allowed</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>City tips, relocation questions, and meetup coordination</li>
            <li>Respectful disagreement without personal attacks</li>
            <li>Sharing opportunities that are transparent and lawful</li>
          </ul>
          <h2 className="text-lg font-semibold">Not allowed</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>Harassment, hate speech, threats, or doxxing</li>
            <li>Scams, impersonation, coordinated spam, or exploitative services</li>
            <li>Illegal content or promotion of unsafe activity</li>
          </ul>
          <h2 className="text-lg font-semibold">Enforcement</h2>
          <p className="text-sm text-slate-700">
            Violations can result in content removal, temporary restrictions, or permanent bans depending on severity and repeat
            behavior.
          </p>
        </Card>
      </div>
    </main>
  );
}
