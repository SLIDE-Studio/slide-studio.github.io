"use client"

import { useState, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

type Photo = {
  src: string
  alt: string
  caption?: string
}

export function AlbumGallery({
  photos,
  ringClass = "ring-border",
}: {
  photos: Photo[]
  ringClass?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )

  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const active = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((photo, i) => (
          <figure
            key={i}
            className={`group relative break-inside-avoid overflow-hidden rounded-xl border border-border bg-card ring-1 ring-inset ${ringClass} transition-transform duration-300 hover:-translate-y-1`}
          >
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget
                setOpenIndex(i)
              }}
              className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View larger: ${photo.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
            {photo.caption && (
              <figcaption className="px-3 py-2 font-mono text-xs text-muted-foreground">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
        {active && (
          <DialogContent
            className="flex h-[94dvh] w-[calc(100vw-2rem)] max-w-none flex-col overflow-hidden p-3 pt-12 sm:p-4 sm:pt-12"
            aria-describedby={undefined}
            data-lenis-prevent
            onCloseAutoFocus={(event) => {
              event.preventDefault()
              triggerRef.current?.focus({ preventScroll: true })
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); next() }
              if (event.key === "ArrowLeft") { event.preventDefault(); prev() }
            }}
          >
            <DialogTitle className="sr-only">{active.alt}</DialogTitle>
            <figure className="flex min-h-0 flex-1 flex-col gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.src}
                alt={active.alt}
                className="min-h-0 w-full flex-1 object-contain"
              />
              {active.caption && (
                <figcaption className="text-center font-mono text-sm text-muted-foreground">
                  {active.caption}
                </figcaption>
              )}
            </figure>
            {photos.length > 1 && (
              <div className="flex shrink-0 items-center justify-center gap-4">
                <button type="button" onClick={prev} aria-label="Previous photo" className="flex size-10 items-center justify-center rounded-full border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </button>
                <span className="text-sm text-muted-foreground" aria-live="polite">{openIndex! + 1} / {photos.length}</span>
                <button type="button" onClick={next} aria-label="Next photo" className="flex size-10 items-center justify-center rounded-full border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <ChevronRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
