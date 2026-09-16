import QRCode from "qrcode";
import { party } from "./event";
import type { Guest } from "./guest";

const paper = "#f8f4eb",
  ink = "#202922",
  red = "#b72e28",
  green = "#164f3d";
function text(
  ctx: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  size: number,
  color = ink,
  font = "Manrope",
) {
  ctx.fillStyle = color;
  ctx.font = `700 ${size}px ${font}, sans-serif`;
  ctx.fillText(value, x, y);
}
function name(
  ctx: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  maxWidth: number,
  color = ink,
) {
  let size = 66;
  ctx.font = `700 ${size}px Manrope, sans-serif`;
  while (ctx.measureText(value).width > maxWidth && size > 22) {
    size--;
    ctx.font = `700 ${size}px Manrope, sans-serif`;
  }
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);
}
function pitch(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  ctx.save();
  ctx.strokeStyle = "#51806e";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);
  ctx.beginPath();
  ctx.moveTo(x + w / 2, y);
  ctx.lineTo(x + w / 2, y + h);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h / 2, h / 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeRect(x, y + h / 4, w / 7, h / 2);
  ctx.strokeRect(x + w - w / 7, y + h / 4, w / 7, h / 2);
  ctx.restore();
}
async function file(canvas: HTMLCanvasElement, filename: string) {
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Image generation failed."))),
      "image/png",
    ),
  );
  return new File([blob], filename, { type: "image/png" });
}

function canvas2d(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable.");
  return ctx;
}

export async function makePassArt(guest: Guest, url: string) {
  await document.fonts.ready;
  const invitation = document.createElement("canvas");
  invitation.width = 1000;
  invitation.height = 1250;
  const c = canvas2d(invitation);
  c.fillStyle = paper;
  c.fillRect(0, 0, 1000, 1250);
  c.fillStyle = red;
  c.fillRect(0, 0, 1000, 22);
  text(c, "A PERSONAL INVITATION", 64, 95, 24, red);
  name(c, guest.name, 64, 185, 870);
  c.fillStyle = green;
  c.fillRect(0, 295, 1000, 690);
  pitch(c, 52, 350, 896, 560);
  c.globalAlpha = 0.18;
  text(c, "10", 410, 855, 500, "#ffffff", "Oswald");
  c.globalAlpha = 1;
  text(c, "MOHAMMED", 64, 450, 63, paper, "Oswald");
  text(c, "AADIL’S", 64, 573, 118, paper, "Oswald");
  text(c, "MATCHDAY", 64, 700, 115, paper, "Oswald");
  text(c, "SATURDAY, 26 SEPTEMBER 2026", 64, 1048, 29, red);
  text(c, "1:00 PM — 5:00 PM", 64, 1100, 30);
  text(c, party.venue, 64, 1170, 34);
  text(c, party.location, 64, 1215, 25);
  if (guest.isDemo) {
    text(c, "SAMPLE", 790, 95, 24, red);
  }

  const pass = document.createElement("canvas");
  pass.width = 1000;
  pass.height = 1120;
  const p = canvas2d(pass);
  p.fillStyle = paper;
  p.fillRect(0, 0, 1000, 1120);
  p.fillStyle = red;
  p.fillRect(0, 0, 1000, 100);
  text(p, "AADIL’S MATCHDAY", 55, 64, 28, "#fff");
  text(p, "GIFT PASS", 735, 64, 26, "#fff");
  text(p, "FOR", 55, 170, 20, red);
  name(p, guest.name, 55, 245, 890);
  const qr = document.createElement("canvas");
  await QRCode.toCanvas(qr, url, {
    width: 500,
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#17241fff", light: "#ffffffff" },
  });
  p.drawImage(qr, 250, 300, 500, 500);
  text(p, "SHOW AT THE GIFT TABLE", 255, 865, 31, ink, "Oswald");
  p.strokeStyle = "#aaa99c";
  p.setLineDash([8, 8]);
  p.beginPath();
  p.moveTo(0, 925);
  p.lineTo(1000, 925);
  p.stroke();
  text(p, guest.number, 55, 1010, 32);
  text(
    p,
    guest.isDemo ? "SAMPLE PASS" : "KEEP YOUR PASS PRIVATE",
    600,
    1010,
    23,
    red,
  );
  return {
    invitation: await file(invitation, `${guest.number}-invitation.png`),
    pass: await file(pass, `${guest.number}-gift-pass.png`),
  };
}
export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function createPassArtwork({
  guest,
  url,
}: {
  guest: Guest;
  url: string;
}) {
  const artwork = await makePassArt(guest, url);
  return [artwork.invitation, artwork.pass];
}

export const downloadArtwork = downloadFile;
