import { cn } from "@/lib/cn";

export function Checkbox({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        className={cn(
          "peer size-4 cursor-pointer appearance-none rounded-[2px] border border-border bg-card transition-colors checked:border-brand checked:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-40",
          className,
        )}
        {...props}
      />
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute size-3 text-brand-on-brand opacity-0 peer-checked:opacity-100"
        aria-hidden
      >
        <path
          d="M3.5 8.5 6.5 11.5 12.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}
