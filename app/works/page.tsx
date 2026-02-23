import { Nav } from "@/components/nav"
import { Works } from "@/components/publications"
import { Footer } from "@/components/footer"

export default function WorksPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Works />
      </main>
      <Footer />
    </>
  )
}
