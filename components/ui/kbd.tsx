import { cn } from "@/lib/cn";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center border border-border bg-muted px-1.5 font-mono text-mono-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
