import { ArrowUpRight } from "lucide-react"
import { publications } from "@/data/publications"

export function Publications() {
  return (
    <section id="publications" className="bg-card px-6 py-24 lg:px-12">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Output
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-card-foreground md:text-5xl">
            Publications
          </h2>
        </div>
        <span className="hidden font-mono text-xs text-muted-foreground md:block">
          Selected Works
        </span>
      </div>

      <div className="flex flex-col gap-0">
        {publications.map((pub, idx) => {
          const Wrapper = pub.link ? "a" : "div"
          const wrapperProps = pub.link
            ? { href: pub.link, target: "_blank" as const, rel: "noopener noreferrer" }
            : {}

          return (
            <Wrapper
              key={idx}
              {...wrapperProps}
              className="group flex flex-col gap-2 border-t border-border py-6 transition-colors last:border-b hover:bg-background/50 lg:flex-row lg:items-start lg:gap-8 lg:py-8"
            >
              <span className="shrink-0 font-mono text-xs text-muted-foreground lg:w-16 lg:pt-1">
                {pub.year}
              </span>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold leading-snug tracking-tight text-card-foreground lg:text-xl">
                    {pub.title}
                  </h3>
                  {pub.award && (
                    <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                      {pub.award}
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

              {pub.link && (
                <ArrowUpRight className="mt-1 hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary lg:block" />
              )}
            </Wrapper>
          )
        })}
      </div>
    </section>
  )
}
