import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Clock3 } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { blogPosts, getPost, type BlogPost } from "@/lib/blogs";

export const Route = createFileRoute("/blogs/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — ExamPix" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} — ExamPix` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blogs/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blogs/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Blogs", to: "/blogs" }, { label: post.category }]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0">
          <span className="inline-flex rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-primary">
            {post.category}
          </span>
          <h1 className="text-section mt-3">{post.title}</h1>
          <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-4" /> {post.readMinutes} min read
            </span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          {post.sections.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2 id={s.heading.toLowerCase().replace(/\s+/g, "-")} className="text-xl font-bold">
                {s.heading}
              </h2>
              {s.body.map((b) => (
                <p key={b} className="mt-3 leading-relaxed text-muted-foreground">
                  {b}
                </p>
              ))}
            </section>
          ))}

          <div className="card-surface mt-10 flex flex-col items-start gap-3 bg-brand-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">Ready to prepare your documents?</h2>
              <p className="text-sm text-muted-foreground">Takes under a minute, no signup.</p>
            </div>
            <Button asChild className="min-h-11 shrink-0 rounded-xl font-semibold">
              <Link to="/tools/$slug" params={{ slug: "photo-resize" }}>
                Resize Photo Now
              </Link>
            </Button>
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Table of contents" className="card-surface p-5">
            <h2 className="text-sm font-bold">On this page</h2>
            <ul className="mt-3 grid gap-2">
              {post.sections.map((s) => (
                <li key={s.heading}>
                  <a
                    href={`#${s.heading.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4">
            <h2 className="text-sm font-bold">Related articles</h2>
            <ul className="mt-3 grid gap-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: p.slug }}
                    className="flex items-start justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-brand-soft"
                  >
                    <span className="line-clamp-2">{p.title}</span>
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
