"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUpRight, X } from "lucide-react"
import { projects } from "@/data/projects"

export function Research() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeProject = projects.find((p) => p.id === activeId)

  const close = useCallback(() => setActiveId(null), [])

  useEffect(() => {
    if (!activeId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [activeId, close])

  return (
    <section id="research" className="py-24">
      <div className="mb-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          Research
        </p>
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Selected Projects
        </h2>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className="group text-left [perspective:1000px]"
          >
            <div className="relative h-56 w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-md [backface-visibility:hidden]">
                {project.image ? (
                  <div className="h-24 w-full shrink-0 overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-2 w-full shrink-0 bg-primary" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold leading-snug tracking-tight text-card-foreground">
                    {project.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-md border border-primary/20 bg-primary p-6 text-left shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div>
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-wider text-primary-foreground/70">
                    {project.year}
                  </span>
                  <h3 className="mb-4 text-base font-bold leading-snug text-primary-foreground">
                    {project.title}
                  </h3>
                  <p className="line-clamp-4 text-sm leading-relaxed text-primary-foreground/85">
                    {project.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 pt-4 font-mono text-[10px] uppercase tracking-wider text-primary-foreground/90">
                  Click to expand <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Expanded Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
        >
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            style={{ animation: "fadeIn 180ms ease-out" }}
          />

          <div
            className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-md border border-border bg-card shadow-xl md:max-h-[85vh] md:flex-row"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "modalIn 220ms ease-out" }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-md bg-card/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left: Media */}
            <div className="flex w-full shrink-0 items-center justify-center bg-muted md:w-1/2">
              {activeProject.video ? (
                <iframe
                  src={activeProject.video}
                  title={activeProject.title}
                  className="aspect-video w-full md:h-full md:min-h-[400px] md:aspect-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeProject.image ? (
                <img
                  src={activeProject.image}
                  alt={`Preview of ${activeProject.title}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center md:h-full md:min-h-[400px] md:aspect-auto">
                  <span className="text-8xl font-bold text-primary/10">
                    {activeProject.id}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Text */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  {activeProject.category}
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {activeProject.year}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-snug tracking-tight text-card-foreground md:text-2xl">
                {activeProject.title}
              </h3>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                {activeProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-muted px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-xs uppercase tracking-wider text-primary transition-colors duration-150 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  View Project <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
