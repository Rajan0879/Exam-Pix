import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Menu, Newspaper, Search } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/search", label: "Search", icon: Search, exact: false },
  { to: "/tools", label: "Tools", icon: LayoutGrid, exact: false },
  { to: "/blogs", label: "Blogs", icon: Newspaper, exact: false },
  { to: "/about", label: "More", icon: Menu, exact: false },
] as const;

export function MobileNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-muted-foreground transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
