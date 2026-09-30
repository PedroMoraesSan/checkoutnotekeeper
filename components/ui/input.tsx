import { cn } from "@/lib/cn";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-10 w-full rounded-[2px] border border-border bg-card px-3 text-body-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground hover:border-foreground/25 focus:border-brand-ink focus:ring-1 focus:ring-brand-ink disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
