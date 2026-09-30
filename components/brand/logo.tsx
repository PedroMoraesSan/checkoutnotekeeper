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
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <path
          d="M4 5.5h10.5L18 9.2V17.5H4V5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M14.5 5.5V9.2H18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {wordmark ? (
        <span className="text-[15px] tracking-tight">Guardanapo</span>
      ) : (
        <span className="sr-only">Guardanapo</span>
      )}
    </span>
  );
}
