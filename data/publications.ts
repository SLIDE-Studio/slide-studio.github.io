export type Publication = {
  /** Paper title (wrap in escaped quotes if needed) */
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
}

/**
 * ───────────────────────────────────────────────
 *  SLIDE Publications
 * ───────────────────────────────────────────────
 *  To add a new publication, copy the template
 *  below and fill in the fields:
 *
 *  {
 *    title: "Your Paper Title",
 *    authors: "Last, F., Last, F., Last, F.",
 *    venue: "ACM CHI Conference on Human Factors in Computing Systems",
 *    year: "2026",
 *    link: "https://doi.org/10.1145/xxxxx",  // optional
 *    award: "Best Paper",                     // optional
 *  },
 * ───────────────────────────────────────────────
 */

export const publications: Publication[] = [
  {
    title:
      '"Nothing About Us Without Us": Co-Designing Voice Assistants with Deaf and Hard-of-Hearing Users',
    authors: "Osei, A., Sharma, P., Tanaka, J.",
    venue: "ACM CHI Conference on Human Factors in Computing Systems",
    year: "2026",
  },
  {
    title:
      "Feeling Present: How Embodied Avatars Mediate Social Connection in Collaborative Mixed Reality",
    authors: "Gutierrez, L., Tanaka, J., Osei, A.",
    venue:
      "ACM CSCW Conference on Computer-Supported Cooperative Work",
    year: "2025",
  },
  {
    title:
      "Community-Driven Algorithm Auditing: A Participatory Framework for Equitable AI",
    authors: "Al-Rashid, F., Osei, A.",
    venue:
      "ACM FAccT Conference on Fairness, Accountability, and Transparency",
    year: "2025",
  },
  {
    title:
      "Touch to Learn: Multi-Sensory Toolkits for Neurodiverse Learners in STEM Education",
    authors: "Okonkwo, S., Sharma, P., Osei, A.",
    venue: "ACM IDC Conference on Interaction Design and Children",
    year: "2025",
  },
  {
    title:
      "Aging With Agency: Privacy-Preserving Care Networks for Older Adults Living Independently",
    authors: "Tanaka, J., Gutierrez, L.",
    venue: "ACM Conference on Designing Interactive Systems (DIS)",
    year: "2024",
  },
]
