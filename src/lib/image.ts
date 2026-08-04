export type ProcessOptions = {
  width: number;
  height: number;
  maxKb?: number | undefined;
  format?: "image/jpeg" | "image/png" | "image/webp";
  background?: string;
  fit?: "cover" | "contain";
  whiten?: boolean;
  darkenInk?: boolean;
};

export type ProcessResult = {
  url: string;
  blob: Blob;
  kb: number;
  width: number;
  height: number;
};

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image file."));
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed."))),
      type,
      quality,
    );
  });
}

/** Draw, then binary-search JPEG quality until the blob fits the KB budget. */
export async function processImage(
  img: HTMLImageElement,
  opts: ProcessOptions,
): Promise<ProcessResult> {
  const {
    width,
    height,
    maxKb,
    format = "image/jpeg",
    background = "#ffffff",
    fit = "cover",
    whiten = false,
    darkenInk = false,
  } = opts;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available in this browser.");

  if (format !== "image/png") {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const scale =
    fit === "cover"
      ? Math.max(canvas.width / img.width, canvas.height / img.height)
      : Math.min(canvas.width / img.width, canvas.height / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);

  if (whiten || darkenInk) {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const px = data.data;
    for (let i = 0; i < px.length; i += 4) {
      const lum = 0.299 * (px[i] ?? 0) + 0.587 * (px[i + 1] ?? 0) + 0.114 * (px[i + 2] ?? 0);
      if (whiten && lum > 170) {
        px[i] = px[i + 1] = px[i + 2] = 255;
      } else if (darkenInk && lum < 120) {
        const k = Math.max(0, lum - 45);
        px[i] = px[i + 1] = px[i + 2] = k;
      }
    }
    ctx.putImageData(data, 0, 0);
  }

  const budget = maxKb ? maxKb * 1024 : Infinity;
  let quality = 0.92;
  let blob = await canvasToBlob(canvas, format, quality);

  if (format !== "image/png") {
    let low = 0.05;
    let high = 0.95;
    for (let i = 0; i < 8 && blob.size > budget; i++) {
      quality = (low + high) / 2;
      blob = await canvasToBlob(canvas, format, quality);
      if (blob.size > budget) high = quality;
      else low = quality;
    }
  }

  return {
    url: URL.createObjectURL(blob),
    blob,
    kb: Math.round((blob.size / 1024) * 10) / 10,
    width: canvas.width,
    height: canvas.height,
  };
}

export async function buildPrintSheet(img: HTMLImageElement, copies: number, background: string) {
  const cellW = 413;
  const cellH = 531;
  const cols = copies <= 4 ? 2 : 4;
  const rows = Math.ceil(copies / cols);
  const gap = 16;
  const canvas = document.createElement("canvas");
  canvas.width = cols * cellW + (cols + 1) * gap;
  canvas.height = rows * cellH + (rows + 1) * gap;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scale = Math.max(cellW / img.width, cellH / img.height);
  for (let i = 0; i < copies; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = gap + c * (cellW + gap);
    const y = gap + r * (cellH + gap);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, cellW, cellH);
    ctx.clip();
    ctx.fillStyle = background;
    ctx.fillRect(x, y, cellW, cellH);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, x + (cellW - dw) / 2, y + (cellH - dh) / 2, dw, dh);
    ctx.restore();
  }

  const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
  return { url: URL.createObjectURL(blob), blob, kb: Math.round(blob.size / 1024) };
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const cmToPx = (cm: number, dpi = 300) => Math.round((cm / 2.54) * dpi);
export const pxToCm = (px: number, dpi = 300) => Math.round(((px / dpi) * 2.54 + Number.EPSILON) * 100) / 100;
