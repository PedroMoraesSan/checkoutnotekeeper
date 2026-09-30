import { cn } from "@/lib/cn";

export function Surface({
  tone = "dev",
  className,
  ...props
}: React.ComponentProps<"div"> & { tone?: "dev" | "you" }) {
  return (
    <div
      data-surface={tone}
      className={cn(
        "bg-background text-foreground",
        tone === "dev" ? "dark" : "surface-you",
        className,
      )}
      {...props}
    />
  );
}
