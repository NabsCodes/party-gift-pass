import JSZip from "jszip";
import { makePassArt } from "@/lib/pass-art";
import type { PassPayload } from "@/lib/guest";

export async function createBulkPassZip(
  passes: PassPayload[],
  onProgress: (complete: number, total: number) => void,
  skippedNumbers: string[] = [],
) {
  const zip = new JSZip();
  const issues = [...skippedNumbers];
  let next = 0;
  let complete = 0;

  async function worker() {
    while (next < passes.length) {
      const pass = passes[next++];
      try {
        const artwork = await makePassArt(pass.guest, pass.passUrl);
        zip.file(artwork.invitation.name, artwork.invitation);
        zip.file(artwork.pass.name, artwork.pass);
      } catch {
        issues.push(pass.guest.number);
      }
      complete += 1;
      onProgress(complete, passes.length);
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(2, passes.length) }, () => worker()),
  );
  if (issues.length) {
    zip.file(
      "EXPORT-ISSUES.txt",
      `These passes were not included:\n${[...new Set(issues)].join("\n")}\n`,
    );
  }
  return {
    blob: await zip.generateAsync({ type: "blob", compression: "STORE" }),
    issues: [...new Set(issues)],
  };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
