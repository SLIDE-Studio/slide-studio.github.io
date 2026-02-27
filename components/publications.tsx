import { ArrowUpRight } from "lucide-react"
import { publications } from "@/data/publications"

export function Works() {
  return (
    <section id="works" className="relative bg-card py-24">
      <div className="mb-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Output
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-card-foreground md:text-5xl">
          Works
        </h2>
      </div>

      <div className="flex flex-col gap-0">
        {publications.map((pub, idx) => (
          <div
            key={idx}
            className="group flex flex-col gap-2 border-t border-border py-6 transition-colors last:border-b hover:bg-background/50 lg:flex-row lg:items-start lg:gap-8 lg:py-8"
          >
            <span className="shrink-0 font-mono text-xs text-muted-foreground lg:w-16 lg:pt-1">
              {pub.year}
            </span>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold leading-snug tracking-tight text-card-foreground underline decoration-transparent transition-colors hover:decoration-primary lg:text-xl"
                  >
                    {pub.title}
                    <ArrowUpRight className="ml-1 inline-block h-4 w-4 text-primary" />
                  </a>
                ) : (
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-card-foreground lg:text-xl">
                    {pub.title}
                  </h3>
                )}
                {pub.award && (
                  <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                    {pub.award}
                  </span>
                )}
                {pub.rank && (
                  <span className="inline-block rounded-full border border-primary/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {pub.rank}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {pub.authors}
              </p>
              <p className="mt-1 font-mono text-xs text-primary/70">
                {pub.venue}
              </p>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
