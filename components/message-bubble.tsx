import { cn } from "@/lib/utils";

export function MessageBubble({
  content,
  isOwnMessage
}: {
  content: string;
  isOwnMessage: boolean;
}) {
  return (
    <div className={cn("flex", isOwnMessage ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
          isOwnMessage ? "bg-primary text-white" : "bg-white text-slate-700"
        )}
      >
        {content}
      </div>
    </div>
  );
}
