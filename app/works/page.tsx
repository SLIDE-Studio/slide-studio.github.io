import { Nav } from "@/components/nav"
import { Works } from "@/components/publications"
import { Footer } from "@/components/footer"
import { ShaderBackground } from "@/components/shader-background"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Reveal } from "@/components/reveal"

export default function WorksPage() {
  return (
    <>
      <SmoothScroll />
      <ShaderBackground />
      <div className="relative z-10 mx-auto max-w-6xl border-x border-border bg-background/40 backdrop-blur-[2px]">
        <Nav />
        <main className="pt-16">
          <Reveal>
            <Works />
          </Reveal>
        </main>
        <Footer />
      </div>
    </>
  )
}
