import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/SLIDE-Studio/" },
  { label: "Scholar", href: "https://scholar.google.com/citations?user=NE2tiHsAAAAJ&hl=ko&oi=ao" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/slideresearch" },
]

export function Contact() {
  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="mb-4 text-sm text-muted-foreground">Contact</p>
          <h2 className="text-5xl font-light tracking-tight md:text-6xl">Get in touch.</h2>
        </div>
        <div className="flex flex-col gap-10">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Interested in collaboration, visiting the lab, or joining our research? We welcome inquiries from designers, engineers, and anyone passionate about inclusive technology.</p>
          <div className="grid gap-8 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Email</p>
              <a href="mailto:slidelab@algomau.ca" className="inline-flex items-center gap-2 text-base underline underline-offset-4">slidelab@algomau.ca <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Location</p>
              <p className="text-base">Algoma University, Canada</p>
              <p className="text-sm text-muted-foreground">School of Computer Science and IT</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
            {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm underline decoration-border underline-offset-4 hover:decoration-foreground">{link.label}<ArrowUpRight className="h-3.5 w-3.5" /></a>)}
          </div>
        </div>
      </div>
    </section>
  )
}
