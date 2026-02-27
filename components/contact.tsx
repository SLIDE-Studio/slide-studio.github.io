import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/SLIDE-Studio/" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=NE2tiHsAAAAJ&hl=ko&oi=ao" },
]

export function Contact() {
  return (
    <section id="contact" className="py-24">
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
              href="mailto:slidelab@algomau.ca"
              className="group flex items-center gap-2 text-lg font-bold transition-colors hover:text-primary"
            >
              slidelab@algomau.ca
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Location
            </span>
            <p className="text-lg font-bold">
              Algoma University, Canada
            </p>
            <p className="text-sm text-muted-foreground">
              School of Computer Science and IT
            </p>
          </div>

          <div className="flex gap-6 pt-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
