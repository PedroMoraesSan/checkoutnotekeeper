import { CanvasTexture, SRGBColorSpace } from "three";

function fontFamily(token: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(token).trim() ||
    fallback
  );
}

function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(/\s+/);
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
      if (yy > 430) break;
    } else {
      line = test;
    }
  }
  if (line && yy <= 430) ctx.fillText(line, x, yy);
}

export function makeNapkinTexture(text: string, closed = false) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  ctx.fillStyle = "#f2ead9";
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = "rgba(180, 140, 90, 0.08)";
  for (let i = 0; i < 18; i += 1) {
    ctx.fillRect(20 + i * 26, 0, 1, 512);
  }

  ctx.strokeStyle = "rgba(30, 77, 140, 0.1)";
  ctx.lineWidth = 1;
  for (let y = 92; y < 470; y += 38) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(472, y);
    ctx.stroke();
  }

  const hand = fontFamily("--font-caveat", "cursive");
  ctx.fillStyle = "#1e4d8c";
  ctx.font = `40px ${hand}`;
  wrap(ctx, text, 48, 108, 416, 42);

  if (closed) {
    ctx.save();
    ctx.translate(350, 390);
    ctx.rotate(-0.32);
    ctx.strokeStyle = "#c43b3b";
    ctx.lineWidth = 5;
    ctx.strokeRect(-78, -30, 156, 60);
    ctx.fillStyle = "#c43b3b";
    ctx.font = `26px ${fontFamily("--font-jetbrains-mono", "monospace")}`;
    ctx.fillText("PAGO", -36, 10);
    ctx.restore();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}
