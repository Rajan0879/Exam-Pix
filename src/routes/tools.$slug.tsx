import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ImageWorkspace } from "@/components/image-workspace";
import { TrustStrip } from "@/components/trust-strip";
import { getTool, tools, type Tool } from "@/lib/tools";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }): { tool: Tool } => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tool not found — ExamPix" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = loaderData.tool;
    const title = `${t.name} — Free Online Tool for Exam Forms | ExamPix`;
    return {
      meta: [
        { title },
        { name: "description", content: t.description },
        { property: "og:title", content: title },
        { property: "og:description", content: t.description },
        { property: "og:url", content: `/tools/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/tools/${params.slug}` }],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData() as { tool: Tool };
  const others = tools.filter((t) => t.slug !== tool.slug);

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: tool.name }]}
      />
      <h1 className="text-section">{tool.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{tool.description}</p>

      <div className="mt-8">
        <ImageWorkspace tool={tool} />
      </div>

      <div className="mt-10">
        <TrustStrip />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Other tools</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                to="/tools/$slug"
                params={{ slug: t.slug }}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-brand-soft"
              >
                {t.name}
                <ArrowRight className="size-4 shrink-0 text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
