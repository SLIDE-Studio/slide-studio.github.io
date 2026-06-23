import { Flower2, Sun, Leaf, Snowflake, Camera, type LucideIcon } from "lucide-react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ShaderBackground } from "@/components/shader-background"
import { PlaygroundBackground } from "@/components/playground-background"
import { SmoothScroll } from "@/components/smooth-scroll"
import { AlbumGallery } from "@/components/album-gallery"
import { albums } from "@/lib/album-data"

export const metadata = {
  title: "Album — SLIDE Studio",
  description: "Seasonal photos from life around the SLIDE Studio lab.",
}

// Playful accent color per season (uses existing theme tokens).
const seasonStyles: Record<
  string,
  { icon: LucideIcon; chip: string; ring: string }
> = {
  Spring: { icon: Flower2, chip: "bg-accent/15 text-accent", ring: "ring-accent/30" },
  Summer: { icon: Sun, chip: "bg-primary/15 text-primary", ring: "ring-primary/30" },
  Fall: { icon: Leaf, chip: "bg-destructive/15 text-destructive", ring: "ring-destructive/30" },
  Winter: { icon: Snowflake, chip: "bg-secondary/40 text-secondary-foreground", ring: "ring-border" },
}

export default function AlbumPage() {
  return (
    <>
      <SmoothScroll />
      <ShaderBackground />
      <PlaygroundBackground />
      <div className="relative z-10 mx-auto max-w-6xl border-x border-border bg-background/40 backdrop-blur-[2px]">
        <Nav />
        <main className="px-6 pt-28 pb-16 lg:px-10">
          <h1 className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
            Album
          </h1>
          <p className="mb-3 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Seasons in the Studio
          </p>
          <p className="mb-12 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A seasonal scrapbook of life around the lab — outings, celebrations,
            and the little moments in between.
          </p>

          <div className="flex flex-col gap-16">
            {albums.map((album) => {
              const style = seasonStyles[album.season]
              const SeasonIcon = style?.icon ?? Camera
              return (
                <section key={album.id} id={album.id} className="scroll-mt-28">
                  <div className="mb-6 flex flex-wrap items-baseline gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider ${style?.chip ?? "bg-muted text-muted-foreground"}`}
                    >
                      <SeasonIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {album.season} {album.year}
                    </span>
                    {album.description && (
                      <p className="text-sm text-muted-foreground">
                        {album.description}
                      </p>
                    )}
                  </div>

                  {album.photos.length > 0 ? (
                    <AlbumGallery
                      photos={album.photos}
                      ringClass={style?.ring ?? "ring-border"}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                      <SeasonIcon
                        className="mb-3 h-8 w-8 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium text-foreground">
                        No photos yet
                      </p>
                      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                        Photos for {album.season} {album.year} will appear here
                        once they&apos;re uploaded.
                      </p>
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
