"use client";

import dynamic from "next/dynamic";

const MesaExperience = dynamic(
  () =>
    import("@/components/scene/mesa-experience").then(
      (mod) => mod.MesaExperience,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-dvh items-center justify-center bg-[#c5dcf0] text-mono-sm uppercase tracking-wider text-muted-foreground">
        Arrumando a mesa…
      </div>
    ),
  },
);

export function MesaView() {
  return <MesaExperience />;
}
