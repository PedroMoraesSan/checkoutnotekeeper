export function Texture({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={className ?? "pointer-events-none absolute inset-0 overflow-hidden"}
    >
      <div className="absolute inset-0 bg-grid-fine" />
      <div className="absolute inset-0 bg-grain" />
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgb(0_7_205_/_0.2),transparent_68%)]" />
    </div>
  );
}
