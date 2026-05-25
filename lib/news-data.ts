// Add new items at the TOP of this array — they will automatically appear first.
// Each item supports:
//   date: "YYYY.MM"
//   text: news text (plain text or HTML with <a> tags)
//   link?: optional external URL — renders as a "↗" icon link after the text
export const newsItems: { date: string; text: string; link?: string }[] = [
  {
    date: "2026.05",
    text: "Dr. Nam joined the <a href=\"https://www.southampton.ac.uk/research/institutes-centres/centre-for-sudden-death/our-people\">Centre for Sudden Death</a> as an external member.",
  },
  {
    date: "2026.05",
    text: "Dr. Nam received Algoma University Research Fund.",
  },
  {
    date: "2026.05",
    text: "Joel Varghese received Algoma University Research Student Fund with Dr. Nam.",
  },
  {
    date: "2026.05",
    text: "Dr. Nam co-authored a paper in CHI2026.",
  },
  {
    date: "2026.04",
    text: "Dr. Nam authored a paper in ACM TACCESS.",
  },
  {
    date: "2026.03",
    text: "Dr. Nam authored and Joel Varghese co-authored a demo paper in IEEE VR.",
  },
  {
    date: "2025.10",
    text: "Dr. Nam authored a demo paper in IEEE ISMAR.",
  },
]
