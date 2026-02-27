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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            type="button"
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className="group text-left [perspective:1000px]"
          >
            <div className="relative h-52 w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 flex flex-col overflow-hidden rounded-lg border border-border bg-card [backface-visibility:hidden]">
                {project.image ? (
                  <div className="h-20 w-full shrink-0 overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-1.5 w-full shrink-0 bg-primary" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {project.category}
                  </span>
                  <h3 className="text-base font-bold leading-snug tracking-tight text-card-foreground">
                    {project.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slide-blue-light px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-lg border border-primary/30 bg-primary p-6 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div>
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-wider text-primary-foreground/60">
                    {project.year}
                  </span>
                  <h3 className="mb-4 text-base font-bold leading-snug text-primary-foreground">
                    {project.title}
                  </h3>
                  <p className="line-clamp-4 text-xs leading-relaxed text-primary-foreground/75">
                    {project.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 pt-4 font-mono text-[10px] uppercase tracking-wider text-primary-foreground/80">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
        >
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            style={{ animation: "fadeIn 200ms ease-out" }}
          />

          <div
            className="relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-2xl md:max-h-[85vh] md:flex-row"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "modalIn 250ms ease-out" }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
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
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                  {activeProject.category}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {activeProject.year}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-snug tracking-tight text-card-foreground md:text-2xl">
                {activeProject.title}
              </h3>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {activeProject.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slide-blue-light px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary"
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
                  className="mt-auto inline-flex items-center gap-1.5 pt-8 font-mono text-xs uppercase tracking-wider text-primary transition-colors hover:text-primary/70"
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
