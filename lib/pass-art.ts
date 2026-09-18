import QRCode from "qrcode";
import { party } from "./event";
import type { Guest } from "./guest";

const paper = "#f5f0e5",
  white = "#fffdf8",
  ink = "#171716",
  red = "#df1f26",
  green = "#126044",
  pitchLine = "#6d9a88",
  muted = "#6f6a61";

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

function fittedText(
  ctx: CanvasRenderingContext2D,
  value: string,
  x: number,
  y: number,
  maxWidth: number,
  {
    color = ink,
    font = "Manrope",
    maxSize = 66,
    minSize = 22,
  }: {
    color?: string;
    font?: "Manrope" | "Oswald";
    maxSize?: number;
    minSize?: number;
  } = {},
) {
  let size = maxSize;
  ctx.font = `700 ${size}px ${font}, sans-serif`;
  while (ctx.measureText(value).width > maxWidth && size > minSize) {
    size--;
    ctx.font = `700 ${size}px ${font}, sans-serif`;
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
  ctx.strokeStyle = pitchLine;
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
  c.fillRect(0, 0, 1000, 96);
  text(c, "AADIL’S MATCHDAY", 56, 62, 27, white);
  text(c, "INVITATION", 787, 62, 23, white);

  text(c, "A PERSONAL INVITATION FOR", 56, 153, 19, red);
  fittedText(c, guest.name, 56, 230, 888, { maxSize: 68 });
  text(c, "YOU’RE ON THE TEAM.", 57, 278, 18, muted);

  c.fillStyle = green;
  c.fillRect(0, 322, 1000, 598);
  pitch(c, 48, 366, 904, 510);
  c.globalAlpha = 0.13;
  text(c, "10", 432, 840, 500, white, "Oswald");
  c.globalAlpha = 1;
  text(c, "MOHAMMED", 58, 468, 55, white, "Oswald");
  text(c, "AADIL’S", 58, 588, 112, white, "Oswald");
  text(c, "MATCHDAY", 58, 706, 108, white, "Oswald");
  text(c, "FOOTBALL · FRIENDS · A BIG DAY", 62, 834, 18, white);

  text(c, "MATCHDAY", 56, 977, 16, red);
  text(c, "SATURDAY, 26 SEPTEMBER 2026", 56, 1020, 29);
  text(c, "KICK-OFF", 56, 1082, 15, red);
  text(c, "1:00 PM – 5:00 PM", 56, 1121, 25);
  text(c, "VENUE", 505, 1082, 15, red);
  fittedText(c, party.venue, 505, 1121, 430, { maxSize: 25, minSize: 18 });
  text(c, party.location, 505, 1158, 18, muted);
  c.strokeStyle = "#d8d0c2";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(56, 1188);
  c.lineTo(944, 1188);
  c.stroke();
  text(c, "DRESS CODE", 56, 1224, 14, red);
  text(c, "YOUR FAVOURITE FOOTBALL JERSEY", 180, 1224, 16);

  if (guest.isDemo) {
    text(c, "SAMPLE", 805, 153, 19, red);
  }

  const pass = document.createElement("canvas");
  pass.width = 1000;
  pass.height = 1120;
  const p = canvas2d(pass);
  p.fillStyle = paper;
  p.fillRect(0, 0, 1000, 1120);
  p.fillStyle = red;
  p.fillRect(0, 0, 1000, 100);
  text(p, "AADIL’S MATCHDAY", 55, 64, 28, white);
  text(p, "GIFT PASS", 760, 64, 24, white);

  text(p, "ONE SPECIAL GIFT · RESERVED FOR", 55, 158, 18, red);
  fittedText(p, guest.name, 55, 230, 890, { maxSize: 62 });
  text(p, "KEEP THIS QR PRIVATE UNTIL COLLECTION.", 57, 270, 16, muted);

  p.fillStyle = green;
  p.fillRect(0, 310, 1000, 570);
  p.save();
  p.globalAlpha = 0.55;
  pitch(p, 35, 344, 930, 500);
  p.restore();
  p.globalAlpha = 0.1;
  text(p, "10", 674, 835, 390, white, "Oswald");
  p.globalAlpha = 1;

  const qr = document.createElement("canvas");
  await QRCode.toCanvas(qr, url, {
    width: 470,
    margin: 4,
    errorCorrectionLevel: "M",
    color: { dark: "#17241fff", light: "#ffffffff" },
  });
  p.fillStyle = white;
  p.fillRect(55, 360, 490, 490);
  p.drawImage(qr, 65, 370, 470, 470);

  text(p, "YOUR GIFT IS", 600, 442, 43, white, "Oswald");
  text(p, "WAITING AT", 600, 492, 43, white, "Oswald");
  text(p, "THE GIFT TABLE.", 600, 542, 43, white, "Oswald");
  text(p, "Show this QR to the party host.", 600, 610, 18, white);
  text(p, "One pass. One gift. All yours.", 600, 648, 18, white);

  p.strokeStyle = "#c8c1b5";
  p.lineWidth = 2;
  p.setLineDash([8, 8]);
  p.beginPath();
  p.moveTo(0, 880);
  p.lineTo(1000, 880);
  p.stroke();
  p.setLineDash([]);

  text(p, "PASS NUMBER", 55, 940, 14, red);
  fittedText(p, guest.number, 55, 988, 500, { maxSize: 31, minSize: 24 });
  text(p, party.shortDate, 55, 1033, 19, muted);

  text(
    p,
    guest.isDemo ? "SAMPLE PASS" : "KEEP YOUR PASS PRIVATE",
    627,
    955,
    18,
    red,
  );
  text(p, "A saved image does not show live status.", 540, 1002, 16, muted);
  text(p, "Staff confirm collection from the live pass.", 526, 1034, 16, muted);

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
