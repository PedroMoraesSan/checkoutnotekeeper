import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Guardanapo",
    short_name: "Guardanapo",
    description:
      "Um bloco de notas simples, com cara de mesa de bar. Escreve, pendura e fecha a conta quando resolver.",
    start_url: "/mesa",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#c5dcf0",
    theme_color: "#f6f6f6",
    lang: "pt-BR",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
