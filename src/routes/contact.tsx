import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const title = "Contact ExamPix — Request an Exam or Report an Issue";
const description =
  "Ask a question, request a new exam preset, or report a problem with a photo or signature tool.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <h1 className="text-section">Contact us</h1>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Missing exam preset? Wrong dimension listed? Tell us and we will update it, usually within
            a working day.
          </p>
          <ul className="mt-6 grid gap-3">
            <li className="card-surface flex items-center gap-3 p-4">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-primary">
                <Mail className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Email</p>
                <p className="text-sm text-muted-foreground">support@exampix.in</p>
              </div>
            </li>
            <li className="card-surface flex items-center gap-3 p-4">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-primary">
                <MessageSquare className="size-5" />
              </span>
              <div>
                <p className="text-sm font-bold">Typical reply time</p>
                <p className="text-sm text-muted-foreground">Within one working day</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          className="card-surface grid gap-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thanks — your message has been noted.");
            (e.currentTarget as HTMLFormElement).reset();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" required placeholder="Ankit Sharma" className="min-h-11 rounded-xl" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-h-11 rounded-xl"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              required
              placeholder="Add preset for MP Police"
              className="min-h-11 rounded-xl"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required rows={5} className="rounded-xl" />
          </div>
          <Button type="submit" size="lg" className="min-h-12 rounded-xl font-semibold">
            <Send className="size-4" /> Send message
          </Button>
        </form>
      </div>
    </div>
  );
}
