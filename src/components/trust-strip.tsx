import { Check } from "lucide-react";

const points = [
  "Files processed securely",
  "Files automatically deleted",
  "No signup required",
  "Fast processing",
  "Mobile friendly",
  "Trusted by thousands of students",
];

export function TrustStrip() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {points.map((p) => (
        <li key={p} className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Check className="size-4 shrink-0 text-success" />
          {p}
        </li>
      ))}
    </ul>
  );
}
