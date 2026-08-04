import { useEffect, useRef, useState } from "react";
import {
  Download,
  Loader2,
  RefreshCw,
  Settings2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { UploadBox } from "@/components/upload-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  buildPrintSheet,
  cmToPx,
  downloadBlob,
  loadImage,
  processImage,
  pxToCm,
  type ProcessResult,
} from "@/lib/image";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/tools";

const backgrounds = [
  { label: "White", value: "#ffffff" },
  { label: "Light blue", value: "#dbeafe" },
  { label: "Light grey", value: "#f1f5f9" },
  { label: "Cream", value: "#fdf6e3" },
];

const ratios = [
  { label: "Free", value: "free" },
  { label: "3:4 (photo)", value: "3:4" },
  { label: "1:1 (square)", value: "1:1" },
  { label: "4:3", value: "4:3" },
  { label: "16:9", value: "16:9" },
];

export function ImageWorkspace({ tool }: { tool: Tool }) {
  const mode = tool.mode;
  const isSignature = mode === "signature";
  const isPassport = mode === "passport";
  const isCompress = mode === "compress";
  const isBackground = mode === "background";
  const isConvert = mode === "convert";

  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [sheet, setSheet] = useState<{ url: string; blob: Blob; kb: number } | null>(null);

  const [width, setWidth] = useState(isSignature ? 413 : isPassport ? 413 : 413);
  const [height, setHeight] = useState(isSignature ? 155 : 531);
  const [maxKb, setMaxKb] = useState(isSignature ? 20 : 50);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [background, setBackground] = useState("#ffffff");
  const [ratio, setRatio] = useState("3:4");
  const [unit, setUnit] = useState<"px" | "cm">("px");
  const [whiten, setWhiten] = useState(isSignature);
  const [darkenInk, setDarkenInk] = useState(isSignature);
  const [copies, setCopies] = useState(8);
  const originalKb = file ? Math.round(file.size / 1024) : 0;
  const firstRun = useRef(true);

  useEffect(() => {
    if (!file) {
      setImg(null);
      setResult(null);
      setSheet(null);
      return;
    }
    let cancelled = false;
    loadImage(file)
      .then((loaded) => {
        if (cancelled) return;
        setImg(loaded);
        if (isCompress || isConvert || isBackground) {
          setWidth(loaded.width);
          setHeight(loaded.height);
        }
      })
      .catch((e: Error) => toast.error(e.message));
    return () => {
      cancelled = true;
    };
  }, [file, isCompress, isConvert, isBackground]);

  const applyRatio = (w: number, r: string) => {
    if (r === "free") return height;
    const [a, b] = r.split(":").map(Number);
    if (!a || !b) return height;
    return Math.round((w * b) / a);
  };

  const generate = async () => {
    if (!img) {
      toast.error("Upload an image first.");
      return;
    }
    setBusy(true);
    try {
      const res = await processImage(img, {
        width,
        height,
        maxKb: isConvert ? undefined : maxKb,
        format,
        background,
        fit: isSignature || isBackground ? "contain" : "cover",
        whiten: whiten || isBackground,
        darkenInk,
      });
      setResult(res);
      if (isPassport) {
        const s = await buildPrintSheet(img, copies, background);
        setSheet(s);
      }
      toast.success(`Ready — ${res.width} x ${res.height} px, ${res.kb} KB`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
      firstRun.current = false;
    }
  };

  const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Controls */}
      <div className="card-surface flex flex-col gap-6 p-5 sm:p-6">
        <UploadBox
          label="1. Upload your image"
          hint="JPG, PNG or WEBP • processed on your device"
          file={file}
          onFile={setFile}
        />

        <div className="border-t border-border pt-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
            <Settings2 className="size-4 text-primary" />
            2. Settings
          </h3>

          <div className="grid gap-4">
            {!isCompress && !isConvert && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="w-input">Width ({unit})</Label>
                    <Input
                      id="w-input"
                      type="number"
                      min={16}
                      value={unit === "px" ? width : pxToCm(width)}
                      onChange={(e) => {
                        const v = Number(e.target.value) || 0;
                        const px = unit === "px" ? v : cmToPx(v);
                        setWidth(px);
                        if (ratio !== "free") setHeight(applyRatio(px, ratio));
                      }}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="h-input">Height ({unit})</Label>
                    <Input
                      id="h-input"
                      type="number"
                      min={16}
                      value={unit === "px" ? height : pxToCm(height)}
                      onChange={(e) => {
                        const v = Number(e.target.value) || 0;
                        setHeight(unit === "px" ? v : cmToPx(v));
                        setRatio("free");
                      }}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <Label>Unit</Label>
                    <Select value={unit} onValueChange={(v) => setUnit(v as "px" | "cm")}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="px">Pixels</SelectItem>
                        <SelectItem value="cm">Centimetres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label>Aspect ratio</Label>
                    <Select
                      value={ratio}
                      onValueChange={(v) => {
                        setRatio(v);
                        if (v !== "free") setHeight(applyRatio(width, v));
                      }}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ratios.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            {r.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {!isConvert && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="kb-slider">Target file size</Label>
                  <span className="text-sm font-semibold text-primary">{maxKb} KB</span>
                </div>
                <Slider
                  id="kb-slider"
                  min={5}
                  max={500}
                  step={5}
                  value={[maxKb]}
                  onValueChange={(v) => setMaxKb(v[0] ?? maxKb)}
                />
              </div>
            )}

            {(isBackground || isPassport || isSignature) && (
              <div className="grid gap-1.5">
                <Label>Background</Label>
                <div className="flex flex-wrap gap-2">
                  {backgrounds.map((b) => (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => setBackground(b.value)}
                      className={cn(
                        "flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-medium transition-colors hover:border-primary/50",
                        background === b.value && "border-primary bg-brand-soft text-primary",
                      )}
                    >
                      <span
                        className="size-4 rounded-full border border-border"
                        style={{ backgroundColor: b.value }}
                      />
                      {b.label}
                    </button>
                  ))}
                  <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-border px-3 text-sm font-medium">
                    Custom
                    <input
                      type="color"
                      aria-label="Custom background colour"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="size-6 cursor-pointer rounded border-0 bg-transparent p-0"
                    />
                  </label>
                </div>
              </div>
            )}

            {isSignature && (
              <div className="grid gap-3 rounded-xl bg-muted/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="whiten" className="font-medium">
                    Whiten background
                  </Label>
                  <Switch id="whiten" checked={whiten} onCheckedChange={setWhiten} />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="darken" className="font-medium">
                    Darken ink
                  </Label>
                  <Switch id="darken" checked={darkenInk} onCheckedChange={setDarkenInk} />
                </div>
              </div>
            )}

            {isPassport && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="copies">Copies on print sheet</Label>
                  <span className="text-sm font-semibold text-primary">{copies}</span>
                </div>
                <Slider
                  id="copies"
                  min={2}
                  max={12}
                  step={2}
                  value={[copies]}
                  onValueChange={(v) => setCopies(v[0] ?? copies)}
                />
              </div>
            )}

            <div className="grid gap-1.5">
              <Label>Output format</Label>
              <Select value={format} onValueChange={(v) => setFormat(v as typeof format)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image/jpeg">JPG — accepted everywhere</SelectItem>
                  <SelectItem value="image/png">PNG — lossless</SelectItem>
                  <SelectItem value="image/webp">WEBP — smallest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="min-h-12 w-full rounded-xl text-base font-semibold"
          onClick={generate}
          disabled={!img || busy}
        >
          {busy ? (
            <>
              <Loader2 className="size-5 animate-spin" /> Processing
            </>
          ) : (
            <>
              <Wand2 className="size-5" /> Generate
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      <div className="card-surface flex flex-col gap-4 p-5 sm:p-6 lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-bold">
            <Sparkles className="size-4 text-primary" /> Live preview
          </h3>
          {result && (
            <button
              onClick={generate}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <RefreshCw className="size-3.5" /> Regenerate
            </button>
          )}
        </div>

        <div className="grid min-h-64 place-items-center rounded-xl border border-border bg-muted/40 p-5">
          {busy ? (
            <Skeleton className="shimmer h-48 w-40 rounded-xl" />
          ) : result ? (
            <img
              src={result.url}
              alt="Processed output preview"
              className="max-h-72 rounded-lg border border-border bg-card object-contain shadow-soft"
            />
          ) : (
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">Nothing generated yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload an image and press Generate to see the output here.
              </p>
            </div>
          )}
        </div>

        {result && (
          <>
            <dl className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-muted/60 p-3">
                <dt className="text-xs text-muted-foreground">Dimensions</dt>
                <dd className="mt-0.5 text-sm font-bold">
                  {result.width}×{result.height}
                </dd>
              </div>
              <div className="rounded-xl bg-muted/60 p-3">
                <dt className="text-xs text-muted-foreground">New size</dt>
                <dd className="mt-0.5 text-sm font-bold text-success">{result.kb} KB</dd>
              </div>
              <div className="rounded-xl bg-muted/60 p-3">
                <dt className="text-xs text-muted-foreground">Original</dt>
                <dd className="mt-0.5 text-sm font-bold text-muted-foreground">{originalKb} KB</dd>
              </div>
            </dl>

            <Button
              size="lg"
              variant="secondary"
              className="min-h-12 w-full rounded-xl text-base font-semibold"
              onClick={() => downloadBlob(result.blob, `exampix-${tool.slug}.${ext}`)}
            >
              <Download className="size-5" /> Download {ext.toUpperCase()}
            </Button>
          </>
        )}

        {sheet && (
          <div className="grid gap-3 border-t border-border pt-4">
            <h4 className="text-sm font-bold">Print sheet ({copies} copies)</h4>
            <img
              src={sheet.url}
              alt="Passport photo print sheet preview"
              className="max-h-64 self-center rounded-lg border border-border object-contain"
            />
            <Button
              variant="outline"
              className="min-h-11 rounded-xl font-semibold"
              onClick={() => downloadBlob(sheet.blob, "exampix-passport-sheet.jpg")}
            >
              <Download className="size-4" /> Download sheet ({sheet.kb} KB)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
