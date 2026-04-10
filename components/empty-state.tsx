import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Card className="py-10 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p>
      {ctaHref && ctaLabel ? (
        <div className="mt-5">
          <Link href={ctaHref}>
            <Button>{ctaLabel}</Button>
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
