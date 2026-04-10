import { Card } from "@/components/ui/card";

export function DiscoverSection({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      {children}
    </Card>
  );
}
