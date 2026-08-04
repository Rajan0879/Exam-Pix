import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2 } from "lucide-react";
import type { Exam } from "@/lib/exams";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<Exam["status"], string> = {
  Open: "bg-success/12 text-success border-success/25",
  Upcoming: "bg-accent/15 text-accent-foreground border-accent/35",
  Closed: "bg-muted text-muted-foreground border-border",
};

export function ExamCard({ exam }: { exam: Exam }) {
  return (
    <Link
      to="/exams/$slug"
      params={{ slug: exam.slug }}
      className="card-surface hover-lift group flex flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft font-display text-xs font-bold text-primary">
          {exam.initials}
        </span>
        <Badge variant="outline" className={cn("rounded-full", statusStyles[exam.status])}>
          {exam.status}
        </Badge>
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-lg font-bold text-foreground">{exam.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{exam.short}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
        <span className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3.5 shrink-0" />
          <span className="truncate">{exam.authority}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
          Resize
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
