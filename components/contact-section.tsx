export function ContactSection() {
  return (
    <section id="contact" className="py-16">
      <h2 className="mb-12 text-xs uppercase tracking-wide text-muted-foreground">
        Contact
      </h2>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="text-2xl font-bold leading-tight text-balance lg:text-3xl">
            Interested in collaboration, visiting the lab, or joining our research?
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Email
            </p>
            <a
              href="mailto:slidelab@algomau.ca"
              className="text-lg font-bold hover:underline"
            >
              slidelab@algomau.ca
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Location
            </p>
            <p className="text-lg font-bold">Algoma University, Canada</p>
            <p className="text-sm text-muted-foreground">
              School of Computer Science and IT
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
              Social
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/SLIDE-Studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wide hover:underline"
              >
                GitHub
              </a>
              <a
                href="https://scholar.google.com/citations?user=NE2tiHsAAAAJ&hl=ko&oi=ao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wide hover:underline"
              >
                Scholar
              </a>
              <a
                href="https://www.linkedin.com/company/slideresearch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-wide hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Join CTA */}
      <div className="mt-16 border-t border-border pt-8">
        <p className="text-sm text-muted-foreground">
          {"We're always looking for curious, compassionate researchers. If you're interested in HCI, inclusive design, or social computing, reach out."}
        </p>
      </div>
    </section>
  )
}
