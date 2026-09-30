import type { Metadata } from "next";
import { MesaView } from "@/components/scene/mesa-view";

export const metadata: Metadata = {
  title: "Mesa 1 · Guardanapo",
  description: "Rabisca no guardanapo. Anota aí, que a conta a gente fecha depois.",
};

export default function MesaPage() {
  return <MesaView />;
}
