import { Link } from "@tanstack/react-router";
import { ScanLine, ShieldCheck } from "lucide-react";
import { exams } from "@/lib/exams";
import { tools } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card pb-24 lg:pb-0">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <ScanLine className="size-5" />
            </span>
            <span className="font-display text-lg font-extrabold">ExamPix</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            India's all-in-one photo and document portal for government exam applications. Free, fast
            and private.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            <ShieldCheck className="size-3.5" /> Processed in your browser
          </p>
        </div>

        <nav aria-label="Popular exams">
          <h3 className="text-sm font-bold text-foreground">Popular Exams</h3>
          <ul className="mt-4 grid gap-2.5">
            {exams.slice(0, 6).map((e) => (
              <li key={e.slug}>
                <Link
                  to="/exams/$slug"
                  params={{ slug: e.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {e.name} photo size
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Tools">
          <h3 className="text-sm font-bold text-foreground">Tools</h3>
          <ul className="mt-4 grid gap-2.5">
            {tools.slice(0, 6).map((t) => (
              <li key={t.slug}>
                <Link
                  to="/tools/$slug"
                  params={{ slug: t.slug }}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className="text-sm font-bold text-foreground">Company</h3>
          <ul className="mt-4 grid gap-2.5">
            {[
              { to: "/about", label: "About us" },
              { to: "/contact", label: "Contact" },
              { to: "/blogs", label: "Blog" },
              { to: "/search", label: "Search exams" },
              { to: "/exams", label: "All exams" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ExamPix. Not affiliated with any government body.</p>
          <p>Always verify requirements with the official exam notification.</p>
        </div>
      </div>
    </footer>
  );
}
