import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Research } from "@/components/research"
import { Team } from "@/components/team"
import { Publications } from "@/components/publications"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Research />
        <Team />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
