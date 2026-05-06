import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { News } from "@/components/news"
import { Research } from "@/components/research"
import { Team } from "@/components/team"
import { Works } from "@/components/publications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FluidBackground } from "@/components/fluid-background"
import { IntroLoader } from "@/components/intro-loader"

export default function Page() {
  return (
    <IntroLoader>
      <FluidBackground />
      <div className="relative z-10 mx-auto max-w-5xl border-x border-border">
        <Nav />
        <main className="flex flex-col gap-8 px-6 lg:px-10">
          <div className="flex flex-row items-start gap-6">
            <div className="min-w-0 flex-1">
              <Hero />
            </div>
            <News />
          </div>
          <Research />
          <Team />
          <Works />
          <Contact />
        </main>
        <Footer />
      </div>
    </IntroLoader>
  )
}
