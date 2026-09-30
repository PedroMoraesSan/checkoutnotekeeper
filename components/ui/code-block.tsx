import { cn } from "@/lib/cn";

export function CodeBlock({
  className,
  filename,
  children,
  ...props
}: React.ComponentProps<"pre"> & { filename?: string }) {
  return (
    <div className="overflow-hidden border border-border bg-card">
      {filename ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-mono-sm uppercase tracking-wider text-muted-foreground">
            {filename}
          </span>
        </div>
      ) : null}
      <pre
        className={cn(
          "overflow-x-auto p-4 text-mono-md text-foreground",
          className,
        )}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
