import { DemoProfileForm } from "@/components/demo/demo-profile-form";
import { ProfileForm } from "@/components/profile-form";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/supabase/queries";
import { updateProfile } from "@/app/profile/actions";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <main className="min-h-screen bg-hero px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <DemoProfileForm mode="edit" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hero px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Card className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Edit profile</p>
            <h1 className="mt-3 text-3xl font-semibold">Update your FriendAway identity</h1>
            <p className="mt-2 text-sm text-muted">Keep your city, arrival context, and bio fresh so recommendations stay relevant.</p>
          </div>
          <ProfileForm action={updateProfile} submitLabel="Save profile" user={user} />
        </Card>
      </div>
    </main>
  );
}
