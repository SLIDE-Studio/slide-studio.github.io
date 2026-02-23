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
  /** Optional image path (.jpg, .gif) in public/images/projects/ */
  image?: string
  /** Optional YouTube embed URL, e.g. "https://www.youtube.com/embed/VIDEO_ID" */
  video?: string
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
 *    link: "https://example.com",              // optional
 *    image: "/images/projects/my-project.jpg", // optional
 *  },
 * ───────────────────────────────────────────────
 */

export const projects: Project[] = [
  {
    id: "01",
    title: "Virtual Conversational Companion for People Living with Dementia in AR",
    category: "Health & Wellbeing",
    year: "2026",
    description:
      "Designing an augmented reality conversational companion that supports meaningful social interaction for people living with dementia, exploring empathetic dialogue, memory-aware prompts, and caregiver integration.",
    tags: ["Augmented Reality", "Dementia Care", "Conversational AI", "Inclusive Design"],
    // link: "https://example.com",              // optional
    // image: "/images/projects/my-project.jpg", // optional
 
  },
  {
    id: "02",
    title: "Digital Twin Platform for Sustainable Architecture",
    category: "Sustainable Design",
    year: "2026",
    description:
      "Designing a digital twin platform that enables architects and urban planners to simulate, visualize, and optimize building sustainability through real-time environmental data and interactive 3D models.",
    tags: ["Digital Twin", "Sustainability", "Architecture", "Data Visualization"],
    // link: "https://example.com",              // optional
    // image: "/images/projects/my-project.jpg", // optional
  },
  {
    id: "03",
    title: "Sustainable AI Interface for Extended Reality",
    category: "Sustainable HCI",
    year: "2025",
    description:
      "Investigating how AI-driven interfaces in extended reality environments can be designed to minimize energy consumption and computational overhead while maintaining rich, accessible user experiences.",
    tags: ["XR", "Sustainable AI", "Green HCI", "Interaction Design"],
    // link: "https://example.com",              // optional
    // image: "/images/twinhaus1.png", // optional
  },
  {
    id: "04",
    title: "Accessible Text Display in Extended Reality",
    category: "Accessibility",
    year: "2025",
    description:
      "Designing and evaluating text rendering techniques in extended reality that improve readability and comprehension for users with low vision, dyslexia, and other reading-related needs.",
    tags: ["XR", "Accessibility", "Typography", "Low Vision"],
    // link: "https://example.com",              // optional
    // image: "/images/projects/my-project.jpg", // optional
  },
  {
    id: "05",
    title: "Tangible Interfaces for Accessible Interaction",
    category: "Accessibility",
    year: "2025",
    description:
      "Exploring how physical, graspable interfaces can make digital systems more accessible, designing tangible interaction paradigms that support users with diverse motor, cognitive, and sensory abilities.",
    tags: ["Tangible UI", "Accessibility", "Inclusive Design", "Physical Computing"],
    // link: "https://example.com",              // optional
    // image: "/images/tangiblekey3.png", // optional
  },
]
