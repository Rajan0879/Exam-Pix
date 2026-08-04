import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-8 gap-4",
        align === "center"
          ? "flex flex-col items-center text-center"
          : "grid grid-cols-[minmax(0,1fr)_auto] items-end sm:flex sm:justify-between",
      )}
    >
      <div className={cn("min-w-0", align === "center" && "max-w-2xl")}>
        {eyebrow && (
          <span className="mb-2 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="text-section text-foreground">{title}</h2>
        {description && <p className="mt-2 text-base text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
