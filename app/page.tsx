import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { News } from "@/components/news"
// import { Research } from "@/components/research"
import { Team } from "@/components/team"
import { Works } from "@/components/publications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ShaderBackground } from "@/components/shader-background"
import { IntroLoader } from "@/components/intro-loader"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Marquee } from "@/components/marquee"
import { Reveal } from "@/components/reveal"

export default function Page() {
  return (
    <IntroLoader>
      <SmoothScroll />
      <ShaderBackground />
      <div className="relative z-10 mx-auto max-w-5xl border-x border-border bg-background/40 backdrop-blur-[2px]">
        <Nav />
        <main className="flex flex-col gap-8 px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <Hero />
            </div>
            <News />
          </div>
        </main>

        <div className="my-4">
          <Marquee
            items={[
              "Inclusive Design",
              "Human-Computer Interaction",
              "Accessibility",
              "Social Computing",
              "Equity",
              "Tangible Interfaces",
            ]}
          />
        </div>

        <main className="flex flex-col gap-8 px-6 lg:px-10">
          {/* <Research /> */}
          <Reveal>
            <Team />
          </Reveal>
          <Reveal>
            <Works preview />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>
        <Footer />
      </div>
    </IntroLoader>
  )
}
