import { cn } from "@/lib/cn";

export function Switch({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <input
      type="checkbox"
      role="switch"
      className={cn(
        "relative h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full border border-border bg-muted transition-colors before:absolute before:top-0.5 before:left-0.5 before:size-3.5 before:rounded-full before:bg-foreground before:transition-transform checked:border-brand checked:bg-brand checked:before:translate-x-4 checked:before:bg-brand-on-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
