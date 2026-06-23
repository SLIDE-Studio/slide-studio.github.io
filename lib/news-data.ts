// Add new items at the TOP of this array — they will automatically appear first.
// Each item supports:
//   date: "YYYY.MM"
//   text: news text (plain text or HTML with <a> tags)
//   link?: optional external URL — renders as a "Link" icon link after the text
//   paper?: optional URL to a paper/PDF — renders as a "Paper" icon link after the text
export const newsItems: { date: string; text: string; link?: string; paper?: string }[] = [
  {
    date: "2026.06",
    text: "Demo at the Virtual Reality Toronto Spatial Media World Conference.",
    link: "https://conference.virtualreality.to/exhibit/algoma-university/",    
  },
  {
    date: "2026.05",
    text: "Masir Javed, Rachit Ranabhat, Tarang Rana, Harris Adedeji will present a demo at the 26' Graphics Interface conference.",
    link: "https://conferences.graphicsinterface.org/2026/posters-and-demonstrations/#demos",
    paper: "/papers/gi26-echolocation-game-demo.pdf",
  },
  {
    date: "2026.05",
    text: "Dr. Nam co-authored a paper for PDC2026.",
    link: "https://dl.acm.org/doi/abs/10.1145/3796624.3796648",
  },
  {
    date: "2026.05",
    text: "Dr. Nam joined the Centre for Sudden Death at the U of Southampton, UK as an external member.",
    link: "https://www.southampton.ac.uk/research/institutes-centres/centre-for-sudden-death/our-people",
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
    link: "https://dl.acm.org/doi/full/10.1145/3772318.3790521",
  },
  {
    date: "2026.04",
    text: "Dr. Nam authored a paper in ACM TACCESS.",
    link: "https://dl.acm.org/doi/abs/10.1145/3806043",
  },
  {
    date: "2026.03",
    text: "Dr. Nam authored and Joel Varghese co-authored a demo paper in IEEE VR.",
    link: "https://ieeexplore.ieee.org/abstract/document/11489900",
  },
  {
    date: "2026.03",
    text: "Dr. Nam authored a demo paper in IEEE VR.",
    link: "https://ieeexplore.ieee.org/document/11489879",
  },
  {
    date: "2025.10",
    text: "Dr. Nam authored a demo paper in IEEE ISMAR.",
    link: "https://ieeexplore.ieee.org/abstract/document/11236378",
  },
]
