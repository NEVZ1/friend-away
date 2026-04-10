import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-hero px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Card className="space-y-4">
          <h1 className="text-2xl font-semibold">FriendAway Privacy Policy</h1>
          <p className="text-sm text-muted">Effective date: April 10, 2026</p>
          <p className="text-sm text-slate-700">
            We collect profile details (name, email, city, origin country, bio), content you post, and messaging metadata required
            to run the service.
          </p>
          <h2 className="text-lg font-semibold">How data is used</h2>
          <p className="text-sm text-slate-700">
            Data is used to personalize city feeds, recommend communities, support messaging, prevent abuse, and improve product
            quality.
          </p>
          <h2 className="text-lg font-semibold">Storage and retention</h2>
          <p className="text-sm text-slate-700">
            We store data in managed cloud infrastructure and apply role-based access control. Content may be retained for safety
            investigations, legal obligations, and service continuity.
          </p>
          <h2 className="text-lg font-semibold">Your controls</h2>
          <p className="text-sm text-slate-700">
            You can update profile fields, request account deletion, and report abusive content. For account-level requests, contact
            support through the product profile support entry.
          </p>
        </Card>
      </div>
    </main>
  );
}
