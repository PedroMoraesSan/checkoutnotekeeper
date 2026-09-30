import { cn } from "@/lib/cn";

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-10 w-full appearance-none rounded-[2px] border border-border bg-card bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 fill=%22none%22 stroke=%22%23888%22 stroke-width=%221.5%22><path d=%22M2 4l4 4 4-4%22/></svg>')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat px-3 pr-9 text-body-sm text-foreground outline-none transition-colors hover:border-foreground/25 focus:border-brand-ink focus:ring-1 focus:ring-brand-ink disabled:opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
