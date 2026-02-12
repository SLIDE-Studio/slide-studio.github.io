export type Project = {
  /** Display number, e.g. "01" */
  id: string
  /** Project title */
  title: string
  /** Research area / theme */
  category: string
  /** Year started or published */
  year: string
  /** 1-2 sentence summary */
  description: string
  /** Short keywords for tag pills */
  tags: string[]
  /** Optional external link (paper, demo, repo) */
  link?: string
}

/**
 * ───────────────────────────────────────────────
 *  SLIDE Research Projects
 * ───────────────────────────────────────────────
 *  To add a new project, copy the template below
 *  and fill in the fields:
 *
 *  {
 *    id: "06",
 *    title: "Your Project Title",
 *    category: "Research Area",
 *    year: "2026",
 *    description: "A short description of the project.",
 *    tags: ["Tag1", "Tag2", "Tag3"],
 *    link: "https://example.com",  // optional
 *  },
 * ───────────────────────────────────────────────
 */

export const projects: Project[] = [
  {
    id: "01",
    title: "Accessible Voice Interfaces",
    category: "Inclusive Design",
    year: "2026",
    description:
      "Co-designing voice-based interaction systems with d/Deaf and hard-of-hearing communities to bridge conversational AI accessibility gaps.",
    tags: ["Accessibility", "Voice UI", "Participatory Design"],
  },
  {
    id: "02",
    title: "Social Presence in Mixed Reality",
    category: "Social Computing",
    year: "2025",
    description:
      "Investigating how embodied avatars and spatial cues shape feelings of social connection in collaborative mixed-reality environments.",
    tags: ["XR", "CSCW", "Embodiment"],
  },
  {
    id: "03",
    title: "Equitable Algorithm Auditing",
    category: "Fairness & Ethics",
    year: "2025",
    description:
      "Building community-driven tools that enable non-experts to audit algorithmic decision-making systems for bias and equity.",
    tags: ["AI Ethics", "Civic Tech", "Transparency"],
  },
  {
    id: "04",
    title: "Tangible Learning for Neurodiverse Youth",
    category: "Interaction Design",
    year: "2025",
    description:
      "Designing physical-digital toolkits that support diverse learning styles through tactile, multi-sensory interaction paradigms.",
    tags: ["Education", "Neurodiversity", "Tangible UI"],
  },
  {
    id: "05",
    title: "Care Networks & Aging in Place",
    category: "Health & Wellbeing",
    year: "2024",
    description:
      "Exploring how connected technologies can strengthen informal care networks while respecting autonomy and privacy for older adults.",
    tags: ["Aging", "IoT", "Privacy"],
  },
]
