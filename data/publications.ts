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
    tag: "[C13]",
    title: "Project LOCOMO: Lower Consumption, More Optimization",
    authors: "Nam, S., Jung, H., Moon, Y., Lee, C., Uhm, S.",
    venue: "OzCHI 2025: Generative Intelligences, Planetary Futures. 37th Australian Conference on Human-Computer Interaction (HCI). Sydney, Australia",
    year: "2025",
    rank: "ERA rank B",
  },
  {
    tag: "[C12]",
    title: "Project LOCOMO AR: Augmented Reality with Carbon Metrics for Sustainable AI Use",
    authors: "Nam, S., Jung, H., Moon, Y., Lee, C., Uhm, S.",
    venue: "IEEE International Symposium on Mixed and Augmented Reality Adjunct (ISMAR-Adjunct). IEEE",
    year: "2025",
    rank: "CORE rank A*",
  },
  {
    tag: "[C11]",
    title: "Towards Designing User Interfaces for Optimized Human AI Communication and Supervisory Control in Software Engineering",
    authors: "Nam, S., Chan, C.",
    venue: "32nd IEEE/ACIS International Summer Virtual Conference on Software Engineering, Artificial Intelligence, Networking and Parallel/Distributed Computing. IEEE",
    year: "2025",
    rank: "CORE rank C",
  },
]
