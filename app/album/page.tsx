import { Flower2, Sun, Leaf, Snowflake, Camera, type LucideIcon } from "lucide-react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
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
  Spring: { icon: Flower2, chip: "text-foreground", ring: "ring-border" },
  Summer: { icon: Sun, chip: "text-foreground", ring: "ring-border" },
  Fall: { icon: Leaf, chip: "text-foreground", ring: "ring-border" },
  Winter: { icon: Snowflake, chip: "text-foreground", ring: "ring-border" },
}

export default function AlbumPage() {
  return (
    <>
      <SmoothScroll />
      <div className="mx-auto max-w-6xl border-x border-border bg-background">
        <Nav />
        <main className="px-6 pb-20 pt-16 lg:px-10">
          <p className="mb-4 text-sm text-muted-foreground">Album</p>
          <h1 className="mb-6 text-balance text-5xl font-light tracking-tight text-foreground md:text-7xl">
            Seasons in the studio
          </h1>
          <p className="mb-16 max-w-xl text-base leading-relaxed text-muted-foreground">
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
                      className={`inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm ${style?.chip ?? "text-foreground"}`}
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
                    <div className="flex flex-col items-center justify-center border border-dashed border-border px-6 py-16 text-center">
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
