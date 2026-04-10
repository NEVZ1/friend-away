import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-hero px-4">
      <Card className="w-full max-w-xl space-y-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FriendAway</p>
        <h1 className="text-3xl font-semibold">That page does not exist</h1>
        <p className="text-sm text-muted">
          The link may be outdated or the community may not have been created in this environment yet.
        </p>
        <div>
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}
