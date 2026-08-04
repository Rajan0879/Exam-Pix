import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Info, ListChecks } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExamUploadPanel } from "@/components/exam-upload-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { exams, getExam, type Exam } from "@/lib/exams";
import { blogPosts } from "@/lib/blogs";

export const Route = createFileRoute("/exams/$slug")({
  loader: ({ params }): { exam: Exam } => {
    const exam = getExam(params.slug);
    if (!exam) throw notFound();
    return { exam };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Exam not found — ExamPix" }, { name: "robots", content: "noindex" }],
      };
    }
    const e = loaderData.exam;
    const title = `${e.name} Photo & Signature Size ${new Date().getFullYear()} — ExamPix`;
    const description = `Official ${e.name} photo, signature and document size requirements. Resize and download in seconds, free and private.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/exams/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/exams/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: e.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: ExamDetail,
});

function ExamDetail() {
  const { exam } = Route.useLoaderData();
  const related = exams.filter((e) => e.slug !== exam.slug && e.category === exam.category).slice(0, 3);
  const fallbackRelated = exams.filter((e) => e.slug !== exam.slug).slice(0, 3);
  const relatedExams = related.length > 0 ? related : fallbackRelated;

  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "All exams", to: "/exams" },
          { label: exam.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-full">
              {exam.category}
            </Badge>
            <Badge variant="outline" className="rounded-full border-success/25 bg-success/10 text-success">
              {exam.status}
            </Badge>
          </div>
          <h1 className="text-section mt-3">{exam.name} photo & signature size</h1>
          <p className="mt-2 text-muted-foreground">{exam.fullName}</p>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4">
            <Info className="mt-0.5 size-5 shrink-0 text-accent-foreground" />
            <p className="text-sm text-foreground">{exam.updates}</p>
          </div>

          {/* Requirements */}
          <section className="mt-9">
            <h2 className="text-xl font-bold">Document requirements</h2>
            <div className="card-surface mt-4 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Document</th>
                    <th className="px-4 py-3 font-semibold">Dimensions</th>
                    <th className="px-4 py-3 font-semibold">File size</th>
                    <th className="px-4 py-3 font-semibold">Format</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.specs.map((s) => (
                    <tr key={s.label} className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">{s.label}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.dimensions}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.fileSize}</td>
                      <td className="px-4 py-3 text-muted-foreground">{s.format}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Instructions */}
          <section className="mt-9">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <ListChecks className="size-5 text-primary" /> Important instructions
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {exam.instructions.map((i) => (
                <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {i}
                </li>
              ))}
            </ul>
          </section>

          {/* Mistakes */}
          <section className="mt-9">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <AlertTriangle className="size-5 text-destructive" /> Common mistakes
            </h2>
            <ul className="mt-4 grid gap-2.5">
              {exam.mistakes.map((m) => (
                <li key={m} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                  {m}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mt-9">
            <h2 className="text-xl font-bold">{exam.name} document FAQ</h2>
            <Accordion type="single" collapsible className="card-surface mt-4 px-5">
              {exam.faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related */}
          <section className="mt-9 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold">Related exams</h2>
              <ul className="mt-3 grid gap-2">
                {relatedExams.map((e) => (
                  <li key={e.slug}>
                    <Link
                      to="/exams/$slug"
                      params={{ slug: e.slug }}
                      className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-brand-soft"
                    >
                      {e.name} photo size
                      <ArrowRight className="size-4 shrink-0 text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold">Related guides</h2>
              <ul className="mt-3 grid gap-2">
                {blogPosts.slice(0, 3).map((p) => (
                  <li key={p.slug}>
                    <Link
                      to="/blogs/$slug"
                      params={{ slug: p.slug }}
                      className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-brand-soft"
                    >
                      <span className="line-clamp-1">{p.title}</span>
                      <ArrowRight className="size-4 shrink-0 text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="card-surface mt-9 flex flex-col items-start gap-3 bg-brand-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold">Need a custom size instead?</h2>
              <p className="text-sm text-muted-foreground">
                Enter any dimensions and KB target in the manual tool.
              </p>
            </div>
            <Button asChild className="min-h-11 shrink-0 rounded-xl font-semibold">
              <Link to="/tools/$slug" params={{ slug: "photo-resize" }}>
                Open manual resize
              </Link>
            </Button>
          </div>
        </div>

        <ExamUploadPanel exam={exam} />
      </div>
    </div>
  );
}
