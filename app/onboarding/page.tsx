import { DemoProfileForm } from "@/components/demo/demo-profile-form";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile-form";
import { completeOnboarding } from "@/app/profile/actions";
import { currentUser } from "@/lib/mock-data";

export default function OnboardingPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-hero px-4 py-10">
        <DemoProfileForm mode="onboarding" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-4 py-10">
      <Card className="w-full max-w-3xl space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FriendAway onboarding</p>
          <h1 className="mt-3 text-3xl font-semibold">Set up your city profile</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Tell FriendAway where you are, when you arrived, and what kind of communities should find you first.
          </p>
        </div>
        <ProfileForm action={completeOnboarding} submitLabel="Finish onboarding" user={currentUser} />
      </Card>
    </main>
  );
}
