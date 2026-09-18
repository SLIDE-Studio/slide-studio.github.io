// Add new items at the TOP of this array — they will automatically appear first.
// Each item supports:
//   date: "YYYY.MM"
//   text: news text (plain text or HTML with <a> tags)
//   link?: optional external URL — renders as a "Link" icon link after the text
//   paper?: optional URL to a paper/PDF — renders as a "Paper" icon link after the text
export const newsItems: { date: string; text: string; link?: string; paper?: string }[] = [
  // {
  //   date: "2026.10",
  //   text: "A full paper by Muhammad & Joel was published at the IEEE International Symposium on Emerging Metaverse (ISEMV), UCLan, Cyprus.",
  //   link: "https://ieee-isemv.org/",
  // },
  // {
  //   date: "2026.10",
  //   text: "A short paper (poster) by Joel, Muhammad, Harris was published at the ACM Symposium on Spatial User Interaction (SUI), Bari, Italy.",
  //   link: "https://sui.acm.org/2026/",
  // },
  // {
  //   date: "2026.10",
  //   text: "A short paper (poster) by Joel, Tarang, Muhammad, Niya was published at the IEEE International Symposium on Mixed and Augmented Reality (ISMAR), Bari, Italy.",
  //   link: "https://www.ieeeismar.net/2026/",
  // },
  {
    date: "2026.09",
    text: "Dr. Nam officially joined the Cochrane: Priority Setting Methods Group as a Co-Convenor.",
    link: "https://www.cochrane.org/about-us/news/cochrane-methods-report-2026#anchor-hellos-and-goodbyes-",
  },
  {
    date: "2026.07",
    text: "Two short papers (poster) by Joel, Niya, Muhammad were accepted the International Conference on Human-Computer Interaction (HCII), Montreal, Canada.",
    link: "https://2026.hci.international/",
  },
  {
    date: "2026.06",
    text: "We will hold a demo booth at the Virtual Reality Toronto (VRTO) Spatial Media World Conference.",
    link: "https://conference.virtualreality.to/exhibit/algoma-university/",
  },
  {
    date: "2026.05",
    text: "Masir, Rachit, Tarang, Harris will present a demo at the 26' Graphics Interface conference.",
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
    text: "Joel received Algoma University Research Student Fund with Dr. Nam.",
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
    text: "Dr. Nam and Joel co-authored a demo paper in IEEE VR.",
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
