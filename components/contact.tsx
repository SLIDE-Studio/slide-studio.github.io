import { ArrowUpRight, Mail, MapPin } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/SLIDE-Studio/" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=NE2tiHsAAAAJ&hl=ko&oi=ao" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/slideresearch"}, 
]

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Connect
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Interested in collaboration, visiting the lab, or joining our
            research? We welcome inquiries from designers, engineers,
            and anyone passionate about inclusive technology.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <a
                href="mailto:slidelab@algomau.ca"
                className="group flex items-center gap-2 text-base font-bold transition-colors duration-150 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring md:text-lg"
              >
                slidelab@algomau.ca
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Location
              </span>
              <p className="text-base font-bold md:text-lg">
                Algoma University, Canada
              </p>
              <p className="text-sm text-muted-foreground">
                School of Computer Science and IT
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-4 border-t border-border pt-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-card/60 px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-card hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
