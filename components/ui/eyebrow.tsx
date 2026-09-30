import { cn } from "@/lib/cn";

export function Eyebrow({
  className,
  mark = true,
  children,
  ...props
}: React.ComponentProps<"p"> & { mark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-mono-sm uppercase tracking-wider text-muted-foreground",
        className,
      )}
      {...props}
    >
      {mark ? <span aria-hidden className="size-1.5 shrink-0 bg-brand" /> : null}
      {children}
    </p>
  );
}
