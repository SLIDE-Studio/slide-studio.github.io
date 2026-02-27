import { Nav } from "@/components/nav"
import { Works } from "@/components/publications"
import { Footer } from "@/components/footer"

export default function WorksPage() {
  return (
    <div className="relative mx-auto max-w-6xl border-x border-border">
      <Nav />
      <main className="pt-16">
        <Works />
      </main>
      <Footer />
    </div>
  )
}
