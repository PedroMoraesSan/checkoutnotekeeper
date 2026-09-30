import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-[2px] font-mono uppercase tracking-[0.08em]",
  {
    variants: {
      tone: {
        default: "border border-border bg-transparent text-muted-foreground",
        brand: "bg-brand text-brand-on-brand",
        success: "bg-success/15 text-success",
        warning: "bg-warning/15 text-warning",
        destructive: "bg-destructive/15 text-destructive",
      },
      size: {
        sm: "text-mono-2xs px-1.5 py-0.5",
        md: "text-mono-xs px-2 py-1",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  },
);

export function Badge({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ tone, size }), className)} {...props} />
  );
}
