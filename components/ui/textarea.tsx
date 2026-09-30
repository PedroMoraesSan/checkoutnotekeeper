import { cn } from "@/lib/cn";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full resize-y rounded-[2px] border border-border bg-card px-3 py-2.5 text-body-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-foreground/25 focus:border-brand-ink focus:ring-1 focus:ring-brand-ink disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
