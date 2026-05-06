const newsItems = [
  {
    date: "2026.06",
    text: "Dr. Nam received Algoma University Research Fund of $5,000 for 1 year.",
  },
  {
    date: "2026.06",
    text: "Joel Varghese received Algoma University Research Student Fund of $3,000.",
  },
  {
    date: "2026.05",
    text: "Joel Varghese and Dr. Nam authored a demo paper in IEEE VR.",
  },
  {
    date: "2026.05",
    text: "Dr. Nam co-authored a paper in CHI2026.",
  },
  {
    date: "2026.04",
    text: "Dr. Nam authored a paper in ACM TACCESS.",
  },
]

export function News() {
  return (
    <aside className="w-64 shrink-0 pt-24">
      <div className="sticky top-24 rounded-md border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-wider text-primary">
          News
        </h2>
        <ol className="flex flex-col gap-4">
          {newsItems.map((item, i) => (
            <li key={i} className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-muted-foreground">
                {item.date}
              </span>
              <p className="text-xs leading-relaxed text-foreground">
                {item.text}
              </p>
              {i < newsItems.length - 1 && (
                <div className="mt-2 border-b border-border" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
