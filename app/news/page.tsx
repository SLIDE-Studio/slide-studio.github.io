import { ExternalLink, FileText } from "lucide-react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { newsItems } from "@/lib/news-data"

export const metadata = {
  title: "News — SLIDE Studio",
  description: "Latest news and updates from the SLIDE Studio research group.",
}

export default function NewsPage() {
  return (
    <>
      <SmoothScroll />
      <div className="mx-auto max-w-6xl border-x border-border bg-background">
        <Nav />
      <main className="px-6 pb-20 pt-16 lg:px-10">
        <p className="mb-4 text-sm text-muted-foreground">News</p>
        <h1 className="mb-16 max-w-3xl text-5xl font-light tracking-tight text-foreground md:text-7xl">
          Latest updates
        </h1>

        <ol className="flex flex-col divide-y divide-border">
          {newsItems.map((item, i) => (
            <li key={i} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <span className="w-20 shrink-0 font-sans text-xs text-muted-foreground">
                {item.date}
              </span>
              <div className="flex flex-col gap-1">
                <p
                  className="text-sm leading-relaxed text-foreground [&_a]:underline [&_a]:decoration-muted-foreground [&_a]:underline-offset-2 [&_a:hover]:text-primary [&_a:hover]:decoration-primary"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-sans text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Link
                  </a>
                )}
                {item.paper && (
                  <a
                    href={item.paper}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-sans text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    <FileText className="h-3 w-3" />
                    Paper
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
      </div>
    </>
  )
}
