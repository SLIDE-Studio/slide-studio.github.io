import { ArrowUpRight } from "lucide-react"
import { publications } from "@/data/publications"

export function Works() {
  return (
    <section id="works" className="relative rounded-md border border-border bg-card px-6 py-20 lg:px-10">
      <div className="mb-14">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
          Output
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-card-foreground md:text-4xl lg:text-5xl">
          Works
        </h2>
      </div>

      <div className="flex flex-col">
        {publications.map((pub, idx) => (
          <div
            key={idx}
            className="group flex flex-col gap-3 border-t border-border py-6 transition-colors duration-200 last:border-b hover:bg-muted/30 lg:flex-row lg:items-start lg:gap-8 lg:py-7"
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
                    className="text-base font-bold leading-snug tracking-tight text-card-foreground underline decoration-transparent underline-offset-2 transition-colors duration-150 hover:decoration-primary focus-visible:ring-2 focus-visible:ring-ring lg:text-lg"
                  >
                    {pub.title}
                    <ArrowUpRight className="ml-1 inline-block h-4 w-4 text-primary" />
                  </a>
                ) : (
                  <h3 className="text-base font-bold leading-snug tracking-tight text-card-foreground lg:text-lg">
                    {pub.title}
                  </h3>
                )}
                {pub.award && (
                  <span className="inline-block rounded-sm bg-primary px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                    {pub.award}
                  </span>
                )}
                {pub.rank && (
                  <span className="inline-block rounded-sm border border-primary/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {pub.rank}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pub.authors}
              </p>
              <p className="mt-1 font-mono text-xs text-primary/80">
                {pub.venue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
