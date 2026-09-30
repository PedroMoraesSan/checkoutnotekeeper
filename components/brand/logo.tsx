import { cn } from "@/lib/cn";

export function Logo({
  className,
  wordmark = true,
}: {
  className?: string;
  wordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-foreground", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
      >
        <rect x="1" y="1" width="20" height="20" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 11.2 9.2 14.4 16 7.2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {wordmark ? (
        <span className="text-[15px] tracking-tight">Checkout Note Keeper</span>
      ) : (
        <span className="sr-only">Checkout Note Keeper</span>
      )}
    </span>
  );
}
