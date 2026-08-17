import Link from "next/link"
import { ArrowRight, ExternalLink, FileText } from "lucide-react"
import { newsItems } from "@/lib/news-data"

const PREVIEW_COUNT = 5

export function News() {
  const visible = newsItems.slice(0, PREVIEW_COUNT)

  return (
    <aside className="w-full shrink-0 border-t border-border py-10 lg:w-72 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-16">
      <div className="sticky top-28">
        <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="text-sm font-normal tracking-normal">News</h2>
          <Link href="/news" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            All updates <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <ol className="flex flex-col">
          {visible.map((item, i) => (
            <li key={i} className="border-b border-border py-4 first:pt-0">
              <span className="mb-1 block text-xs text-muted-foreground">{item.date}</span>
              <p className="text-sm leading-relaxed text-foreground [&_a]:underline [&_a]:underline-offset-3" dangerouslySetInnerHTML={{ __html: item.text }} />
              <div className="mt-2 flex gap-3">
                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-3 hover:text-foreground"><ExternalLink className="h-3 w-3" />Link</a>}
                {item.paper && <a href={item.paper} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-3 hover:text-foreground"><FileText className="h-3 w-3" />Paper</a>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
