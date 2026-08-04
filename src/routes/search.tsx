import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX, TrendingUp } from "lucide-react";
import { z } from "zod";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExamCard } from "@/components/exam-card";
import { ExamSearch } from "@/components/exam-search";
import { Button } from "@/components/ui/button";
import { examCategories, popularSearches, searchExams } from "@/lib/exams";
import { cn } from "@/lib/utils";

const title = "Search Government Exams — ExamPix";
const description =
  "Find your government exam and get the exact photo, signature and thumb impression requirements instantly.";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/search" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const [category, setCategory] = useState<string>("All");
  const results = useMemo(() => searchExams(q ?? "", category), [q, category]);

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Search exams" }]} />

      <h1 className="text-section">Search your exam</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Type an exam name and open its page to get presets, requirements and the upload panel.
      </p>

      <div className="mt-6 max-w-3xl">
        <ExamSearch showPopular={false} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
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

      {!q && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <TrendingUp className="size-4 text-accent" /> Trending:
          </span>
          {popularSearches.map((p) => (
            <Link
              key={p}
              to="/search"
              search={{ q: p }}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary"
            >
              {p}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        {results.length} exam{results.length === 1 ? "" : "s"}
        {q ? ` matching “${q}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((e) => (
            <ExamCard key={e.slug} exam={e} />
          ))}
        </div>
      ) : (
        <div className="card-surface mt-4 grid place-items-center gap-3 p-12 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="size-6" />
          </span>
          <h2 className="text-lg font-bold">No exam matched that search</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Your exam may not be listed yet. Use the manual resize tool with the dimensions from your
            official notification.
          </p>
          <Button asChild className="rounded-xl font-semibold">
            <Link to="/tools/$slug" params={{ slug: "photo-resize" }}>
              Open manual resize
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
