import { cn } from "@/lib/cn";

export function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-body-sm text-foreground", className)}
      {...props}
    />
  );
}
