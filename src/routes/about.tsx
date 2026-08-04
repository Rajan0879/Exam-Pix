import { createFileRoute } from "@tanstack/react-router";
import { Lock, Smartphone, Users, Zap } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

const title = "About ExamPix — Exam Document Portal for Indian Students";
const description =
  "ExamPix helps students prepare photos, signatures and documents for Indian government exam applications, privately and for free.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  { icon: Lock, title: "Privacy first", body: "No uploads, no accounts, no tracking of your files." },
  { icon: Zap, title: "Speed", body: "Every task should finish in under a minute on a mid-range phone." },
  { icon: Smartphone, title: "Mobile first", body: "Most aspirants fill forms on a phone, so that is the primary design target." },
  { icon: Users, title: "Free access", body: "Preparing an application should never cost money at a cyber cafe." },
];

function AboutPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <h1 className="text-section">About ExamPix</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        Thousands of government exam applications are rejected every year because a photo was a few
        kilobytes too large or a signature was scanned at the wrong size. ExamPix exists to remove
        that entire category of problem — one search, one upload, one download.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
        Every tool runs inside your browser. Your photograph, signature and thumb impression are
        never transmitted anywhere, which means there is nothing to leak and nothing to delete.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="card-surface p-5">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
              <v.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold">{v.title}</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
        ExamPix is an independent product and is not affiliated with, endorsed by, or connected to any
        government body or recruitment commission. Always confirm requirements with the official
        notification for your exam.
      </p>
    </div>
  );
}
