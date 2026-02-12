import { Users } from "lucide-react"

const members = [
  {
    name: "Dr. Amara Osei",
    role: "Lab Director",
    focus: "Inclusive Interaction Design, Participatory Methods",
    initials: "AO",
  },
  {
    name: "Dr. Jun Tanaka",
    role: "Co-Director",
    focus: "Social Computing, CSCW",
    initials: "JT",
  },
  {
    name: "Priya Sharma",
    role: "Postdoctoral Researcher",
    focus: "Accessible AI, Voice Interfaces",
    initials: "PS",
  },
  {
    name: "Leo Gutierrez",
    role: "PhD Candidate",
    focus: "Mixed Reality, Embodied Interaction",
    initials: "LG",
  },
  {
    name: "Fatima Al-Rashid",
    role: "PhD Candidate",
    focus: "Algorithmic Fairness, Civic Tech",
    initials: "FA",
  },
  {
    name: "Sam Okonkwo",
    role: "Research Assistant",
    focus: "Tangible Interfaces, Education",
    initials: "SO",
  },
]

export function Team() {
  return (
    <section id="team" className="px-6 py-24 lg:px-12">
      <div className="mb-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          People
        </p>
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Our Team
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="group relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {member.initials}
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">{member.name}</h3>
              <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-primary">
                {member.role}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {member.focus}
            </p>
          </div>
        ))}
      </div>

      {/* Join CTA */}
      <div className="mt-16 flex items-center gap-6 rounded-lg border border-dashed border-primary/40 bg-slide-blue-light p-8">
        <Users className="hidden h-8 w-8 shrink-0 text-primary sm:block" />
        <div>
          <h3 className="text-lg font-bold text-foreground">Join SLIDE Studio</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {"We're always looking for curious, compassionate researchers. If you're interested in HCI, inclusive design, or social computing, reach out."}
          </p>
        </div>
      </div>
    </section>
  )
}
