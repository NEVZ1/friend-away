import { CalendarDays, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import type { UserProfile } from "@/lib/types";
import { getArrivalCohort } from "@/lib/utils";

export function ProfileHeader({ user }: { user: UserProfile }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="h-28 bg-gradient-to-r from-primary via-sky-500 to-accent" />
      <div className="px-6 pb-6">
        <div className="-mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <UserAvatar name={user.name} avatarUrl={user.avatar_url} className="h-20 w-20 border-4 border-white" />
            <div>
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <p className="text-sm text-muted">
                {user.country_origin} to {user.current_city}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                {user.user_type}
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Arrival cohort: <span className="font-semibold text-text">{getArrivalCohort(user.arrival_date)}</span>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700">{user.bio}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
            <MapPin className="h-4 w-4" />
            {user.current_city}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
            <CalendarDays className="h-4 w-4" />
            Arriving {user.arrival_date}
          </span>
        </div>
      </div>
    </Card>
  );
}
