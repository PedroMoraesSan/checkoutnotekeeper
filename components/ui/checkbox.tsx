import { cn } from "@/lib/cn";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 shrink-0 appearance-none rounded-[2px] border border-border bg-card transition-colors checked:border-brand checked:bg-brand checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%230f0f0f%22 stroke-width=%222%22><path d=%22M3.5 8.5 6.5 11.5 12.5 4.5%22/></svg>')] checked:bg-center checked:bg-no-repeat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}
