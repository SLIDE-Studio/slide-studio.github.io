export type Publication = {
  /** Reference tag, e.g. "[C13]", "[J2]" */
  tag?: string
  /** Paper title */
  title: string
  /** Comma-separated author list, e.g. "Last, F., Last, F." */
  authors: string
  /** Full venue name */
  venue: string
  /** Publication year */
  year: string
  /** Optional DOI or link to paper */
  link?: string
  /** Optional award, e.g. "Best Paper", "Honorable Mention" */
  award?: string
  /** Optional ranking note, e.g. "CORE rank A*", "ERA rank B" */
  rank?: string
}

/**
 * ───────────────────────────────────────────────
 *  SLIDE Publications
 * ───────────────────────────────────────────────
 *  To add a new publication, copy the template
 *  below and fill in the fields:
 *
 *  {
 *    tag: "[C14]",                                   // optional
 *    title: "Your Paper Title",
 *    authors: "Last, F., Last, F., Last, F.",
 *    venue: "Full Conference / Journal Name",
 *    year: "2026",
 *    link: "https://doi.org/10.1145/xxxxx",          // optional
 *    award: "Best Paper",                             // optional
 *    rank: "CORE rank A*",                            // optional
 *  },
 * ───────────────────────────────────────────────
 */

export const publications: Publication[] = [
  {
    title: "Towards Designing Echolocation Interfaces for Inclusive Virtual Gaming Environments",
    authors: "Javed, M., Ranabhat, R., Rana, T., Sheikh, R., Minhajuddin, M., Nam, S.",
    venue: "Demo at the Graphics Interface Conference (GI 2026)",
    year: "2026",
    link: "https://conferences.graphicsinterface.org/2026/posters-and-demonstrations/#demos",
    rank: "CORE RANK B",    
  },
  // {
  //   title: "LOCOMO MR: Mixed Reality Agent with Carbon Metrics for Sustainable AI Use",
  //   authors: "Nam, S., Varghese, J., Jung, H., Uhm, S.",
  //   venue: "International Conference on Human-Computer Interaction. Cham: Springer Nature Switzerland.",
  //   year: "2026",
  //   rank: "Google Scholar Metrics h5-index 45 (acceptance rate ~30%)",
  // },
  {
    title: "Dreaming with MAKOTO: Co-Designing an Older Adult Voice Assistant Intervention for Implicit Ageism",
    authors: "Seaborn, K., Watanabe, M., Fabre, É., Riesch, P., Nam, S., Mandai, Y., Kojima, M.",
    venue: "Participatory Design Conference",
    year: "2026",
    link: "https://dl.acm.org/doi/abs/10.1145/3796624.3796648",
    rank: "CORE RANK B",
  },
  {
    title: "Eye Gaze Behaviour and Comprehension of Colour Commentary and Gameplay Captions of Live Fast-Paced Sports for Deaf and Hard of Hearing Television Viewers",
    authors: "Nam, S., Kumarasamy, T., Karam, M., Whitfield, M., Hibbard, E., Leung, J., Fels, D.",
    venue: "ACM Transactions on Accessible Computing",
    year: "2026",
    link: "https://dl.acm.org/doi/10.1145/3806043",
    rank: "Premier journal in accessible computing",
  },
  {
    title: "Disclosure Matters: How Self-Disclosure Statements in Song Signing Videos Shape d/Deaf Audiences Acceptance of Culturally Sensitive Content",
    authors: "Yoo, S., Nam, S., Chignell, M., Truong, K.",
    venue: "ACM CHI Conference on Human Factors in Computing Systems",
    year: "2026",
    link: "https://dl.acm.org/doi/10.1145/3772318.3790521",
    rank: "CORE RANK A*",
  },
  {
    title: "TwinHaus: Digital Twin Design Tool for Sustainable Building Construction",
    authors: "Nam, S., Varghese, J., Goel, A., Jung, H.",
    venue: "IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)",
    year: "2026",
    link: "https://ieeexplore.ieee.org/document/11489900/",
    rank: "CORE RANK A*",
  },
  {
    title: "LOCOMO-Play: Gamification of Sustainable Artificial Intelligence Use in Augmented Reality",
    authors: "Nam, S., Jung, H., Moon, Y., Uhm, S.",
    venue: "IEEE Conference on Virtual Reality and 3D User Interfaces Abstracts and Workshops (VRW)",
    year: "2026",
    link: "https://ieeexplore.ieee.org/document/11489879",
    rank: "CORE RANK A*",
  },
  {
    title: "Project LOCOMO: Lower Consumption, More Optimization",
    authors: "Nam, S., Jung, H., Moon, Y., Lee, C., Uhm, S.",
    venue: "OzCHI 2025: Generative Intelligences, Planetary Futures. 37th Australian Conference on Human-Computer Interaction (HCI). Sydney, Australia",
    year: "2025",
    link: "https://www.ozchi.org/2025/accepted-papers.php#demos",
    rank: "ERA rank B",
  },
  {
    title: "Project LOCOMO AR: Augmented Reality with Carbon Metrics for Sustainable AI Use",
    authors: "Nam, S., Jung, H., Moon, Y., Lee, C., Uhm, S.",
    venue: "IEEE International Symposium on Mixed and Augmented Reality Adjunct (ISMAR-Adjunct). IEEE",
    year: "2025",
    link: "https://doi.ieeecomputersociety.org/10.1109/ISMAR-Adjunct68609.2025.00263",
    rank: "CORE rank A*",
  },
  {
    title: "Towards Designing User Interfaces for Optimized Human AI Communication and Supervisory Control in Software Engineering",
    authors: "Nam, S., Chan, C.",
    venue: "32nd IEEE/ACIS International Summer Virtual Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing. IEEE",
    year: "2025",
    link: "https://ieeexplore.ieee.org/document/11252932",
    rank: "CORE rank C",
  },
]
