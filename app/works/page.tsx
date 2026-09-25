import { Nav } from "@/components/nav"
import { Works } from "@/components/publications"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Reveal } from "@/components/reveal"

export default function WorksPage() {
  return (
    <>
      <SmoothScroll />
      <div className="mx-auto max-w-6xl border-x border-border bg-background">
        <Nav />
        <main className="px-6 pt-8 lg:px-10">
          <Reveal>
            <Works />
          </Reveal>
        </main>
        <Footer />
      </div>
    </>
  )
}
