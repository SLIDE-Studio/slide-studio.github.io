"use client"

import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { publications } from "@/data/publications"
import { Stagger, StaggerItem } from "@/components/motion/stagger"

const PREVIEW_COUNT = 5

export function Works({ preview = false }: { preview?: boolean }) {
  const visible = preview ? publications.slice(0, PREVIEW_COUNT) : publications
  const hasMore = preview && publications.length > PREVIEW_COUNT

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

      <Stagger className="flex flex-col">
        {visible.map((pub, idx) => (
          <StaggerItem
            key={idx}
            className="group flex flex-col gap-3 border-t border-border py-6 transition-all duration-300 last:border-b hover:bg-muted/30 hover:pl-2 sm:flex-row sm:items-start sm:gap-6 lg:py-7"
          >
            <div className="shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              {pub.thumbnail ? (
                <img
                  src={pub.thumbnail || "/placeholder.svg"}
                  alt={`Thumbnail for ${pub.title}`}
                  className="h-20 w-28 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex h-20 w-28 items-center justify-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  {pub.tag ?? "Work"}
                </div>
              )}
            </div>

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
                <span className="font-mono text-xs text-muted-foreground">
                  {pub.year}
                </span>
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
          </StaggerItem>
        ))}
      </Stagger>

      {hasMore && (
        <Link
          href="/works"
          className="mt-8 flex w-full items-center justify-center gap-1 border-t border-border pt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          See more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </section>
  )
}
