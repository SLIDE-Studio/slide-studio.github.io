import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { News } from "@/components/news"
// import { Research } from "@/components/research"
import { Team } from "@/components/team"
import { Works } from "@/components/publications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { LatestGroupPhoto } from "@/components/latest-group-photo"

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <LatestGroupPhoto />
      <div className="mx-auto max-w-6xl border-x border-border bg-background">
        <Nav />
        <main className="flex flex-col gap-8 px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <Hero />
            </div>
            <News />
          </div>
        </main>

        <div className="border-y border-border px-6 py-5 lg:px-10">
          <p className="text-sm text-muted-foreground">
            Inclusive design · Human-computer interaction · Accessibility · Social computing · Equity · Tangible interfaces
          </p>
        </div>

        <main className="flex flex-col gap-8 px-6 lg:px-10">
          {/* <Research /> */}
          <Team />
          <Works preview />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
