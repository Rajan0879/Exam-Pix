import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { blogPosts } from "@/lib/blogs";

const title = "Exam Document Guides & Tips — ExamPix Blog";
const description =
  "Guides on photo sizes, signature scanning and application form mistakes for Indian government exams.";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/blogs" },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blogs" }]} />
      <h1 className="text-section">Guides & tips</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Practical articles on preparing documents for exam applications.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to="/blogs/$slug"
            params={{ slug: p.slug }}
            className="card-surface hover-lift flex flex-col gap-3 p-6"
          >
            <span className="inline-flex w-fit rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-primary">
              {p.category}
            </span>
            <h2 className="text-xl leading-snug font-bold">{p.title}</h2>
            <p className="text-sm text-muted-foreground">{p.excerpt}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" /> {p.readMinutes} min read
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
