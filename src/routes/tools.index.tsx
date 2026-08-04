import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToolCard } from "@/components/tool-card";
import { TrustStrip } from "@/components/trust-strip";
import { tools } from "@/lib/tools";

const title = "Free Image Tools for Exam Forms — ExamPix";
const description =
  "Resize, compress, crop and convert photos, signatures and passport photos for any exam application form. Free and browser-based.";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools" }]} />
      <h1 className="text-section">Document tools</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Seven focused tools that each do one job well. Nothing is uploaded to a server.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
      <div className="mt-10">
        <TrustStrip />
      </div>
    </div>
  );
}
