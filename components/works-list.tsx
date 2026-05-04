import { publications } from "@/data/publications"

export function WorksList() {
  return (
    <section id="works" className="py-16">
      <h2 className="mb-12 text-xs uppercase tracking-wide text-muted-foreground">
        Publications
      </h2>

      <div className="flex flex-col">
        {publications.map((pub, idx) => (
          <div
            key={idx}
            className="group flex flex-col gap-2 border-t border-border py-6 last:border-b lg:flex-row lg:items-baseline lg:gap-8"
          >
            <span className="shrink-0 text-xs text-muted-foreground lg:w-14">
              {pub.year}
            </span>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold leading-snug hover:underline"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <h3 className="text-sm font-bold leading-snug">
                    {pub.title}
                  </h3>
                )}
                {pub.award && (
                  <span className="bg-foreground px-2 py-0.5 text-[10px] uppercase tracking-wide text-background">
                    {pub.award}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {pub.authors}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {pub.venue}
                {pub.rank && <span className="ml-2">({pub.rank})</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
