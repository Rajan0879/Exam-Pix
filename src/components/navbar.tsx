import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ScanLine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/search", label: "Search Exams" },
  { to: "/exams", label: "All Exams" },
  { to: "/tools", label: "Tools" },
  { to: "/blogs", label: "Blogs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <ScanLine className="size-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">ExamPix</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-brand-soft hover:text-primary",
                  pathname === l.to && "text-foreground",
                )}
                activeProps={{ className: "bg-brand-soft text-primary" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-xl font-semibold sm:inline-flex">
            <Link to="/tools/$slug" params={{ slug: "photo-resize" }}>
              Resize Now
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="min-h-11 min-w-11 rounded-xl lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container-page flex items-center justify-between py-3">
            <span className="text-sm font-semibold text-muted-foreground">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="container-page grid gap-1 pb-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-brand-soft hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
