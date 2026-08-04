import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Clock3,
  MousePointerClick,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { ExamSearch } from "@/components/exam-search";
import { ExamCard } from "@/components/exam-card";
import { ToolCard } from "@/components/tool-card";
import { SectionHeading } from "@/components/section-heading";
import { TrustStrip } from "@/components/trust-strip";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { exams } from "@/lib/exams";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/lib/blogs";

const title = "ExamPix — Resize Photo & Signature for Government Exams";
const description =
  "Search your exam, upload your photo and download perfectly resized photo, signature and thumb impression files in seconds. Free and private.";

const faqs = [
  {
    q: "Is ExamPix free to use?",
    a: "Yes. Every tool is free and there is no signup, no watermark and no daily limit.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "No. All processing happens locally in your browser using canvas, so your documents never leave your device.",
  },
  {
    q: "Which exams are supported?",
    a: "SSC, Railway, Banking, UPSC, NTA and major state exams are preloaded with exact dimensions. You can also use the manual tools for any other exam.",
  },
  {
    q: "What if my exam is not listed?",
    a: "Use the Photo Resize or Compress tool and enter the dimensions and KB limit from your official notification.",
  },
  {
    q: "Will the quality drop after compression?",
    a: "ExamPix resizes first and then finds the highest quality that fits your KB budget, so the output stays as sharp as the limit allows.",
  },
];

const testimonials = [
  {
    name: "Ankit Sharma",
    role: "SSC CGL aspirant, Patna",
    text: "My photo kept getting rejected on the SSC portal. ExamPix gave me the exact 413x531 at 48 KB on the first try.",
  },
  {
    name: "Priya Nair",
    role: "IBPS PO aspirant, Kochi",
    text: "Signature and thumb impression in one place with the right sizes. Finished the whole form on my phone.",
  },
  {
    name: "Rahul Verma",
    role: "NEET UG aspirant, Jaipur",
    text: "I liked that nothing gets uploaded anywhere. The preview shows the size before I download.",
  },
];

const whyUs = [
  {
    icon: Zap,
    title: "Ready in seconds",
    body: "Presets for every listed exam mean no manual maths. Upload, generate, download.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Processing happens in your browser. No uploads, no storage, nothing to delete later.",
  },
  {
    icon: MousePointerClick,
    title: "Two clicks to done",
    body: "Search your exam and you are already on the upload panel with the right settings.",
  },
  {
    icon: Sparkles,
    title: "Portal-accurate output",
    body: "Exact pixel dimensions and KB ceilings taken from official notifications.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="container-page animate-fade-up py-14 text-center sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3 py-1.5 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5" /> 100% browser-based • No signup
          </span>
          <h1 className="text-hero mx-auto mt-5 max-w-4xl text-foreground text-balance">
            Resize Photo & Signature for Government Exams in Seconds
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Search your exam, upload your photo, and download perfectly resized documents instantly.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <ExamSearch />
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="min-h-12 rounded-xl px-6 font-semibold">
              <Link to="/search">
                Search Exam <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 rounded-xl px-6 font-semibold"
            >
              <Link to="/tools/$slug" params={{ slug: "photo-resize" }}>
                Manual Resize
              </Link>
            </Button>
          </div>

          <div className="mt-9">
            <TrustStrip />
          </div>
        </div>
      </section>

      {/* Popular exams */}
      <section className="container-page py-14 sm:py-16">
        <SectionHeading
          eyebrow="Popular exams"
          title="Presets for the exams students ask about most"
          description="Exact dimensions and file size limits, already filled in."
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold text-primary">
              <Link to="/exams">
                View all <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {exams.slice(0, 8).map((e) => (
            <ExamCard key={e.slug} exam={e} />
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="border-y border-border bg-card">
        <div className="container-page py-14 sm:py-16">
          <SectionHeading
            eyebrow="Tools"
            title="Everything you need for one application form"
            description="Seven focused tools instead of one confusing editor."
            action={
              <Button asChild variant="ghost" className="rounded-xl font-semibold text-primary">
                <Link to="/tools">
                  All tools <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-page py-14 sm:py-16">
        <SectionHeading
          align="center"
          eyebrow="Why ExamPix"
          title="Built for students filling forms on a phone"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((f) => (
            <div key={f.title} className="card-surface p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Updates */}
      <section className="border-y border-border bg-card">
        <div className="container-page py-14 sm:py-16">
          <SectionHeading
            eyebrow="Exam updates"
            title="Latest document requirement changes"
            description="Requirement notes pulled from the most recent notifications."
          />
          <ul className="grid gap-3 lg:grid-cols-2">
            {exams.slice(0, 6).map((e) => (
              <li key={e.slug}>
                <Link
                  to="/exams/$slug"
                  params={{ slug: e.slug }}
                  className="hover-lift flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-foreground">
                    <Bell className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold">{e.name}</span>
                    <span className="block text-sm text-muted-foreground">{e.updates}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Blogs */}
      <section className="container-page py-14 sm:py-16">
        <SectionHeading
          eyebrow="Guides"
          title="Latest from the blog"
          action={
            <Button asChild variant="ghost" className="rounded-xl font-semibold text-primary">
              <Link to="/blogs">
                All articles <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to="/blogs/$slug"
              params={{ slug: p.slug }}
              className="card-surface hover-lift flex flex-col gap-3 p-5"
            >
              <span className="inline-flex w-fit rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-primary">
                {p.category}
              </span>
              <h3 className="text-lg leading-snug font-bold">{p.title}</h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 className="size-3.5" /> {p.readMinutes} min read
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card">
        <div className="container-page py-14 sm:py-16">
          <SectionHeading align="center" eyebrow="Testimonials" title="Trusted by students" />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card-surface flex flex-col gap-4 p-5">
                <Quote className="size-6 text-primary/40" />
                <blockquote className="text-sm leading-relaxed text-foreground">{t.text}</blockquote>
                <figcaption className="mt-auto">
                  <div className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions students ask before uploading"
              description="Still unsure? The contact page gets a reply within a working day."
            />
            <Button asChild variant="outline" className="rounded-xl font-semibold">
              <Link to="/contact">Contact support</Link>
            </Button>
          </div>
          <Accordion type="single" collapsible className="card-surface px-5">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-page pb-16">
        <div className="rounded-3xl border border-border bg-primary px-6 py-12 text-center sm:px-12">
          <h2 className="text-section text-primary-foreground">Get exam document alerts</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-primary-foreground/80">
            One short email when a major exam changes its photo or signature requirements. No spam.
          </p>
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-h-12 rounded-xl border-transparent bg-card"
            />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="min-h-12 rounded-xl font-semibold"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
