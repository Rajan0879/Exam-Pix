import { useState } from "react";
import { CheckCircle2, Download, Loader2, ShieldCheck, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { UploadBox } from "@/components/upload-box";
import { Button } from "@/components/ui/button";
import { downloadBlob, loadImage, processImage, type ProcessResult } from "@/lib/image";
import type { DocSpec, Exam } from "@/lib/exams";

export function ExamUploadPanel({ exam }: { exam: Exam }) {
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [results, setResults] = useState<Record<string, ProcessResult>>({});
  const [busy, setBusy] = useState(false);

  const uploaded = exam.specs.filter((s) => files[s.label]).length;

  const generate = async () => {
    const pending = exam.specs.filter((s) => files[s.label]);
    if (pending.length === 0) {
      toast.error("Upload at least one document first.");
      return;
    }
    setBusy(true);
    try {
      const next: Record<string, ProcessResult> = {};
      for (const spec of pending) {
        const f = files[spec.label];
        if (!f) continue;
        const img = await loadImage(f);
        next[spec.label] = await processImage(img, {
          width: spec.width,
          height: spec.height,
          maxKb: spec.maxKb,
          format: "image/jpeg",
          background: "#ffffff",
          fit: spec.label === "Photograph" ? "cover" : "contain",
          whiten: spec.label !== "Photograph",
          darkenInk: spec.label !== "Photograph",
        });
      }
      setResults(next);
      toast.success(`${pending.length} file(s) ready for ${exam.name}`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const fileNameFor = (spec: DocSpec) =>
    `${exam.slug}-${spec.label.toLowerCase().replace(/\s+/g, "-")}.jpg`;

  return (
    <aside className="card-surface flex flex-col gap-5 p-5 lg:sticky lg:top-24">
      <div>
        <h2 className="text-lg font-bold">Prepare your documents</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Presets for {exam.name} are applied automatically. {uploaded}/{exam.specs.length} uploaded.
        </p>
      </div>

      <div className="grid gap-4">
        {exam.specs.map((spec) => (
          <UploadBox
            key={spec.label}
            compact
            label={spec.label}
            hint={`${spec.dimensions} • ${spec.fileSize}`}
            file={files[spec.label] ?? null}
            onFile={(f) => setFiles((prev) => ({ ...prev, [spec.label]: f }))}
          />
        ))}
      </div>

      <Button
        size="lg"
        className="min-h-12 w-full rounded-xl text-base font-semibold"
        onClick={generate}
        disabled={busy || uploaded === 0}
      >
        {busy ? (
          <>
            <Loader2 className="size-5 animate-spin" /> Generating
          </>
        ) : (
          <>
            <Wand2 className="size-5" /> Generate for {exam.name}
          </>
        )}
      </Button>

      {Object.keys(results).length > 0 && (
        <div className="grid gap-3 border-t border-border pt-4">
          <h3 className="flex items-center gap-2 text-sm font-bold text-success">
            <CheckCircle2 className="size-4" /> Ready to download
          </h3>
          {exam.specs.map((spec) => {
            const res = results[spec.label];
            if (!res) return null;
            return (
              <div
                key={spec.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-2.5"
              >
                <img
                  src={res.url}
                  alt={`${spec.label} output`}
                  className="size-12 shrink-0 rounded-lg border border-border bg-card object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{spec.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {res.width}×{res.height} px • {res.kb} KB
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label={`Download ${spec.label}`}
                  className="min-h-11 min-w-11 shrink-0 rounded-xl"
                  onClick={() => downloadBlob(res.blob, fileNameFor(spec))}
                >
                  <Download className="size-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <p className="flex items-start gap-2 rounded-xl bg-success/8 p-3 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
        Everything runs inside your browser. Your photo never leaves your device and nothing is
        stored on any server.
      </p>
    </aside>
  );
}
