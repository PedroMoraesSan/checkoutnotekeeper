import { cn } from "@/lib/cn";

export function Card({
  className,
  elevated = false,
  ...props
}: React.ComponentProps<"div"> & { elevated?: boolean }) {
  return (
    <div
      className={cn(
        "border border-border bg-card text-card-foreground",
        elevated && "shadow-elevated",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 border-b border-border p-5", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-h3", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-body-sm text-muted-foreground", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center gap-3 border-t border-border p-5", className)}
      {...props}
    />
  );
}
