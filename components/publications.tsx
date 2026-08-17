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
    <section id="works" className="relative border-t border-border py-20">
      <div className="mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="mb-4 text-sm text-muted-foreground">Research output</p>
          <h2 className="text-5xl font-light tracking-tight md:text-6xl">Works</h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm leading-relaxed text-muted-foreground sm:block">Selected publications, projects, and research contributions from the studio.</p>
      </div>

      <Stagger className="flex flex-col">
        {visible.map((pub, idx) => (
          <StaggerItem
            key={idx}
            className="group flex flex-col gap-4 border-t border-border py-7 last:border-b sm:flex-row sm:items-start sm:gap-8"
          >
            <div className="shrink-0 overflow-hidden border border-border bg-muted">
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
                    className="text-base font-medium leading-snug tracking-tight text-card-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground lg:text-lg"
                  >
                    {pub.title}
                    <ArrowUpRight className="ml-1 inline-block h-4 w-4 text-primary" />
                  </a>
                ) : (
                  <h3 className="text-base font-medium leading-snug tracking-tight text-card-foreground lg:text-lg">
                    {pub.title}
                  </h3>
                )}
                <span className="font-mono text-xs text-muted-foreground">
                  {pub.year}
                </span>
                {pub.award && (
                  <span className="inline-block border border-foreground px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
                    {pub.award}
                  </span>
                )}
                {pub.rank && (
                  <span className="inline-block border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {pub.rank}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pub.authors}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
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
