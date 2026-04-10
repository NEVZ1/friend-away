export default function Loading() {
  return (
    <main className="min-h-screen bg-hero px-4 py-6">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="h-32 animate-pulse rounded-3xl bg-white/70" />
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div className="h-48 animate-pulse rounded-3xl bg-white/70" />
            <div className="h-56 animate-pulse rounded-3xl bg-white/70" />
          </div>
          <div className="hidden h-72 animate-pulse rounded-3xl bg-white/70 lg:block" />
        </div>
      </div>
    </main>
  );
}
