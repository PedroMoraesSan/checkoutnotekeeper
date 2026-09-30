import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const alertVariants = cva("flex gap-3 border p-4 text-body-sm", {
  variants: {
    tone: {
      info: "border-border bg-card text-foreground",
      success: "border-success/30 bg-success/10 text-foreground",
      warning: "border-warning/30 bg-warning/10 text-foreground",
      destructive: "border-destructive/30 bg-destructive/10 text-foreground",
    },
  },
  defaultVariants: { tone: "info" },
});

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  destructive: AlertCircle,
};

const iconClass = {
  info: "text-brand-ink",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

export function Alert({
  className,
  tone = "info",
  title,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & { title?: string }) {
  const Icon = icons[tone ?? "info"];

  return (
    <div role="status" className={cn(alertVariants({ tone }), className)} {...props}>
      <Icon
        className={`mt-0.5 size-4 shrink-0 ${iconClass[tone ?? "info"]}`}
        strokeWidth={1.5}
      />
      <div className="flex flex-col gap-1">
        {title ? <p className="text-h3">{title}</p> : null}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
