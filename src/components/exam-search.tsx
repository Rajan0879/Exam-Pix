import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { exams, popularSearches } from "@/lib/exams";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExamSearch({
  size = "lg",
  showPopular = true,
}: {
  size?: "lg" | "md";
  showPopular?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return exams
      .filter((e) => e.name.toLowerCase().includes(q) || e.fullName.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const submit = (value: string) => {
    navigate({ to: "/search", search: { q: value } });
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(query);
        }}
        className={cn(
          "flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft transition-shadow focus-within:border-primary focus-within:shadow-lift",
          size === "lg" ? "sm:p-2.5" : "",
        )}
      >
        <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search SSC CGL, UPSC, NEET..."
          aria-label="Search for your exam"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
            size === "lg" ? "py-2 text-base sm:text-lg" : "py-1.5 text-base",
          )}
        />
        <Button
          type="submit"
          size={size === "lg" ? "lg" : "default"}
          className="shrink-0 rounded-xl font-semibold"
        >
          <span className="hidden sm:inline">Search Exam</span>
          <Search className="size-4 sm:hidden" />
        </Button>
      </form>

      {focused && suggestions.length > 0 && (
        <ul className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-lift">
          {suggestions.map((e) => (
            <li key={e.slug}>
              <button
                type="button"
                onMouseDown={() => navigate({ to: "/exams/$slug", params: { slug: e.slug } })}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-brand-soft"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-[10px] font-bold text-primary">
                  {e.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{e.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{e.fullName}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showPopular && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Popular:</span>
          {popularSearches.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => submit(p)}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-brand-soft hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
