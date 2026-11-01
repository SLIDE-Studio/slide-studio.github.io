import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"

export default function ArchivePage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl border-x border-border bg-background">
      <Nav />
      <main className="flex flex-col gap-10 px-6 py-12 lg:px-10 lg:py-16">
        <header className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Archive</p>
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">Past website designs</h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            A small collection of earlier visual directions for SLIDE Studio.
          </p>
        </header>
        <figure className="flex flex-col gap-4">
          <div className="overflow-hidden border border-border bg-muted">
            <img
              src="/images/archive/past-website-designs.png"
              alt="Past SLIDE Studio website design with a colorful wordmark and geometric shapes"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="font-mono text-xs text-muted-foreground">Past website designs</figcaption>
        </figure>
      </main>
      <Footer />
    </div>
  )
}
