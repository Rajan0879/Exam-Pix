import { useCallback, useRef, useState } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadBoxProps = {
  label: string;
  hint?: string;
  file: File | null;
  onFile: (file: File | null) => void;
  compact?: boolean;
};

export function UploadBox({ label, hint, file, onFile, compact = false }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const accept = useCallback(
    (f: File | undefined) => {
      if (!f) return;
      if (!f.type.startsWith("image/")) return;
      setPreview(URL.createObjectURL(f));
      onFile(f);
    },
    [onFile],
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {file && (
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
          >
            <X className="size-3.5" /> Remove
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "group flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-4 text-center transition-all",
          compact ? "min-h-28 py-4" : "min-h-44 py-8",
          dragging && "border-primary bg-brand-soft",
          preview && "border-solid bg-card",
        )}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={`${label} preview`}
              className={cn("rounded-lg object-contain", compact ? "max-h-20" : "max-h-32")}
            />
            <span className="truncate text-xs text-muted-foreground">{file?.name}</span>
          </>
        ) : (
          <>
            <span className="grid size-11 place-items-center rounded-full bg-brand-soft text-primary transition-transform group-hover:scale-105">
              {dragging ? <Upload className="size-5" /> : <ImagePlus className="size-5" />}
            </span>
            <span className="text-sm font-semibold text-foreground">
              Tap to upload or drag a file here
            </span>
            {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label={label}
        onChange={(e) => accept(e.target.files?.[0])}
      />
    </div>
  );
}
