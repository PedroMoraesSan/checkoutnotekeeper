import { cn } from "@/lib/cn";

export function Highlight({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline bg-brand-deep px-[0.18em] text-white box-decoration-clone",
        className,
      )}
      {...props}
    />
  );
}
