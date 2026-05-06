import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { newsItems } from "@/lib/news-data"

const PREVIEW_COUNT = 5

export function News() {
  const visible = newsItems.slice(0, PREVIEW_COUNT)
  const hasMore = newsItems.length > PREVIEW_COUNT

  return (
    <aside className="w-64 shrink-0 pt-24">
      <div className="sticky top-24 rounded-md border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-wider text-primary">
          News
        </h2>
        <ol className="flex flex-col gap-4">
          {visible.map((item, i) => (
            <li key={i} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted-foreground">
                {item.date}
              </span>
              <p className="text-xs leading-relaxed text-foreground">
                {item.text}
              </p>
              {i < visible.length - 1 && (
                <div className="mt-2 border-b border-border" />
              )}
            </li>
          ))}
        </ol>

        {hasMore && (
          <Link
            href="/news"
            className="mt-4 flex w-full items-center justify-center gap-1 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            See more
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </aside>
  )
}
