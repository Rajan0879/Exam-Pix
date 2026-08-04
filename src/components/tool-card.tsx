import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      to="/tools/$slug"
      params={{ slug: tool.slug }}
      className="card-surface hover-lift group flex flex-col gap-3 p-5"
    >
      <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" />
      </span>
      <div>
        <h3 className="flex items-center gap-1 text-base font-bold text-foreground">
          {tool.name}
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </h3>
        <p className="text-xs font-medium text-primary">{tool.tagline}</p>
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </Link>
  );
}
