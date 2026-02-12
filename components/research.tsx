"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/data/projects"

export function Research() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section id="research" className="px-6 py-24 lg:px-12">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Research
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Selected Projects
          </h2>
        </div>
        <span className="hidden font-mono text-xs text-muted-foreground md:block">
          {projects.length} Active Projects
        </span>
      </div>

      <div className="flex flex-col">
        {projects.map((project, idx) => (
          <a
            key={project.id}
            href={project.link || "#"}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            className="group relative border-t border-border py-8 transition-all last:border-b hover:bg-card lg:py-10"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-0">
              <div className="flex items-center gap-4 lg:w-16 lg:pt-1">
                <span className="font-mono text-xs text-muted-foreground">
                  {project.id}
                </span>
                <div
                  className={`h-3 w-3 rounded-full bg-primary transition-transform ${
                    hoveredIdx === idx ? "scale-150" : ""
                  }`}
                />
              </div>

              <div className="lg:flex-1">
                <h3 className="text-2xl font-bold tracking-tight lg:text-3xl">
                  {project.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slide-blue-light px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 lg:w-72 lg:pt-1">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>

              <div className="hidden lg:block lg:w-96">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slide-blue-light px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end lg:w-12 lg:pt-1">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
