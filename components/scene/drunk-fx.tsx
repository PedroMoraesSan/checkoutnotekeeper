"use client";

import { BeerStein } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

export function DrunkStage({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) {
  const intensity = Math.min(level, 5) / 5;

  return (
    <div
      className={cn("absolute inset-0", intensity > 0 && "drunk-stage")}
      style={
        {
          "--drunk": intensity,
          animationDuration: `${Math.max(2.2, 5.5 - level * 0.55)}s`,
        } as React.CSSProperties
      }
    >
      {children}
      {intensity > 0 ? (
        <>
          <div className="drunk-chroma drunk-chroma-r" />
          <div className="drunk-chroma drunk-chroma-c" />
          <div className="drunk-vignette" />
          <div className="drunk-glow" />
        </>
      ) : null}
    </div>
  );
}

export function DrunkMeter({ level }: { level: number }) {
  if (level <= 0) return null;

  const copy =
    level >= 5
      ? "Saideira? Talvez amanhã."
      : level >= 3
        ? "A mesa tá dançando junto."
        : "Saúde. A ideia fica mais solta.";

  return (
    <div className="pointer-events-none absolute top-24 right-4 z-30 max-w-[220px] border border-border bg-background/85 px-3 py-2 backdrop-blur-sm">
      <p className="flex items-center gap-2 text-mono-sm uppercase tracking-[0.08em] text-muted-foreground">
        <BeerStein size={12} weight="fill" className="text-[#c47a12]" />
        Teor {level}/5
      </p>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1",
              i < level ? "bg-[#c47a12]" : "bg-border",
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-caption text-muted-foreground">{copy}</p>
    </div>
  );
}
