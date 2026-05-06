import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { newsItems } from "@/lib/news-data"

export const metadata = {
  title: "News — SLIDE Studio",
  description: "Latest news and updates from the SLIDE Studio research group.",
}

export default function NewsPage() {
  return (
    <div className="relative mx-auto max-w-6xl border-x border-border">
      <Nav />
      <main className="px-6 pt-28 pb-16 lg:px-10">
        <h1 className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
          News
        </h1>
        <p className="mb-10 text-2xl font-bold tracking-tight text-foreground">
          Latest Updates
        </p>

        <ol className="flex flex-col divide-y divide-border">
          {newsItems.map((item, i) => (
            <li key={i} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">
                {item.date}
              </span>
              <p className="text-sm leading-relaxed text-foreground">{item.text}</p>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  )
}
