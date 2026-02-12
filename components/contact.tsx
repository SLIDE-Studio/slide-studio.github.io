import { ArrowUpRight } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 lg:px-12">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Connect
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Interested in collaboration, visiting the lab, or joining our
            research? We welcome inquiries from designers, engineers,
            and anyone passionate about inclusive technology.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Email
            </span>
            <a
              href="mailto:hello@slide-studio.org"
              className="group flex items-center gap-2 text-lg font-bold transition-colors hover:text-primary"
            >
              hello@slide-studio.org
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Location
            </span>
            <p className="text-lg font-bold">
              HCI Building, Room 302
            </p>
            <p className="text-sm text-muted-foreground">
              School of Information & Design
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Office Hours
            </span>
            <p className="text-lg font-bold">
              Mon - Fri, 10:00 - 17:00
            </p>
          </div>

          <div className="flex gap-6 pt-4">
            {["Twitter", "GitHub", "Scholar"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
