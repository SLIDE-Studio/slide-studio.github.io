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
        <main className="pt-8">
          <Reveal>
            <Works />
          </Reveal>
        </main>
        <Footer />
      </div>
    </>
  )
}
