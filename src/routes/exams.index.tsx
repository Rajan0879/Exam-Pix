import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExamCard } from "@/components/exam-card";
import { examCategories, exams } from "@/lib/exams";
import { cn } from "@/lib/utils";

const title = "All Government Exams — Photo & Signature Sizes | ExamPix";
const description =
  "Browse every supported government exam with its official photo, signature and thumb impression size requirements.";

export const Route = createFileRoute("/exams/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/exams" },
    ],
    links: [{ rel: "canonical", href: "/exams" }],
  }),
  component: AllExams,
});

function AllExams() {
  const [category, setCategory] = useState<string>("All");
  const list = exams.filter((e) => category === "All" || e.category === category);

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "All exams" }]} />
      <h1 className="text-section">All government exams</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Pick your exam to see requirements, common mistakes and a ready upload panel.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {examCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "min-h-9 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary",
              category === c && "border-primary bg-brand-soft text-primary",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((e) => (
          <ExamCard key={e.slug} exam={e} />
        ))}
      </div>
    </div>
  );
}
