import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Research } from "@/components/research"
import { Team } from "@/components/team"
import { Works } from "@/components/publications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ParallaxShapes } from "@/components/parallax-shapes"
import { IntroLoader } from "@/components/intro-loader"

export default function Page() {
  return (
    <IntroLoader>
      <ParallaxShapes />
      <Nav />
      <main className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <Hero />
        <Research />
        <Team />
        <Works />
        <Contact />
      </main>
      <Footer />
    </IntroLoader>
  )
}
