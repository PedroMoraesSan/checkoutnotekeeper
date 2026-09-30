import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

export function Section({
  className,
  eyebrow,
  title,
  description,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      {(eyebrow || title || description) && (
        <header className="mb-10 flex max-w-[720px] flex-col gap-3">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {title ? <h2 className="text-h1">{title}</h2> : null}
          {description ? (
            <p className="text-body-lg text-muted-foreground">{description}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
