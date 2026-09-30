import { cn } from "@/lib/cn";

const widths = {
  page: "max-w-[1240px]",
  prose: "max-w-[720px]",
  form: "max-w-[520px]",
  cta: "max-w-[380px]",
} as const;

export function Container({
  className,
  width = "page",
  ...props
}: React.ComponentProps<"div"> & { width?: keyof typeof widths }) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)}
      {...props}
    />
  );
}
