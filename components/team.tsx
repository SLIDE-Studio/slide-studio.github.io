"use client"
import { Users, GraduationCap, Linkedin, ExternalLink } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  focus: string
  initials: string
  image?: string
  linkedin?: string
  memo?: string
}

interface Alumnus {
  name: string
  role: string
  now: string
  initials: string
  image?: string
  linkedin?: string
  memo?: string
}

/**
 * To add a profile image for a member or alumnus:
 * 1. Place the image in public/images/team/ (e.g. somang-nam.jpg)
 * 2. Add the image field to the entry: image: "/images/team/somang-nam.jpg"
 *
 * To add a LinkedIn link:
 *   linkedin: "https://linkedin.com/in/username"
 *
 * To add a short memo (shown on card back):
 *   memo: "Interested in XR accessibility and tangible interfaces."
 */
const members: TeamMember[] = [
  {
    name: "Dr. Somang Nam",
    role: "Assistant Professor in Computer Science",
    focus: "Creative Director",
    initials: "SN",
    image: "/images/team/sn1.jpg",
    linkedin: "https://www.linkedin.com/in/somang/"
  },
  {
    name: "Muhammad Minhajuddin",
    role: "Undergraduate",
    focus: "Computer Science",
    initials: "MM",
    image: "/images/team/mm.jpeg",
    linkedin: "https://www.linkedin.com/in/muhammad-minhajuddin76/"
  },
  {
    name: "Harris Adedeji",
    role: "Undergraduate",
    focus: "Computer Science",
    initials: "HA",
    image: "/images/team/ha.jpeg",
    linkedin: "https://www.linkedin.com/in/harris-adedeji-7270a3204/"
  },
    {
    name: "Tarang Rana",
    role: "Undergraduate",
    focus: "Computer Science",
    initials: "TR",
    image: "/images/team/tr.jpeg",
    linkedin: "https://www.linkedin.com/in/rana-tarang/"
  },  {
    name: "Rachit Ranabhat",
    role: "Undergraduate",
    focus: "Computer Science",
    initials: "RR",
    image: "/images/team/rr.jpg",
    linkedin: "https://www.linkedin.com/in/rachit2002/"
  },
  {
    name: "Joel Varghese",
    role: "Master of Computer Science",
    // now: "",
    initials: "JV",
    image: "/images/team/jv.jpeg",
    linkedin: "https://www.linkedin.com/in/joel662/",
    memo: "Research Affiliate. Graduated in Spring, 2026"
  },
]

const alumni: Alumnus[] = [
  {
    name: "Presley Kinley",
    role: "Undergraduate",
    now: "",
    initials: "PK",
    linkedin: "https://www.linkedin.com/in/presley-k-303088266/"
  },
  {
    name: "Hritika Sharma",
    role: "Undergraduate",
    now: "",
    initials: "HS",
    linkedin: "https://www.linkedin.com/in/hritikasharma2002/",
    memo: "hrsharma@algomau.ca"
  },
  {
    name: "Aanya Goel",
    role: "Undergraduate",
    now: "BMO",
    initials: "AG",
    linkedin: "https://www.linkedin.com/in/aanyagoel/"
  },
]

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group [perspective:800px]" style={{ minHeight: 240 }}>
      <div className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 flex flex-col gap-4 rounded-md border border-border bg-card p-6 shadow-sm transition-shadow duration-300 group-hover:shadow-md [backface-visibility:hidden]">
          {member.image ? (
            <img
              src={member.image}
              alt={`Portrait of ${member.name}`}
              className="h-16 w-16 rounded-full border-2 border-muted object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {member.initials}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold tracking-tight">{member.name}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-primary">
              {member.role}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {member.focus}
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-md border border-border bg-card p-6 text-left shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <h3 className="text-base font-bold text-foreground">{member.name}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {member.role}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {member.memo || member.focus}
            </p>
          </div>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-primary transition-colors duration-150 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn Profile
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function AlumnusCard({ alum }: { alum: Alumnus }) {
  return (
    <div className="group [perspective:800px]" style={{ minHeight: 100 }}>
      <div className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 flex items-center gap-4 rounded-md border border-border bg-card/80 p-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md [backface-visibility:hidden]">
          {alum.image ? (
            <img
              src={alum.image}
              alt={`Portrait of ${alum.name}`}
              className="h-10 w-10 shrink-0 rounded-full border border-muted object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
              {alum.initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-snug">{alum.name}</p>
            <p className="truncate font-mono text-[10px] uppercase tracking-wider text-primary/80">{alum.role}</p>
            {alum.now && <p className="truncate text-xs text-muted-foreground">{alum.now}</p>}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-md border border-border bg-card p-4 text-left shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm font-bold text-foreground">{alum.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {alum.memo || (alum.now ? `Now at ${alum.now}` : alum.role)}
          </p>
          {alum.linkedin && (
            <a
              href={alum.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] text-primary transition-colors duration-150 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="h-3 w-3" />
              LinkedIn
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Team() {
  return (
    <section id="team" className="py-24">
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
          <MemberCard key={member.name} member={member} />
        ))}
      </div>

      {/* Alumni */}
      <div className="mt-20 mb-16">
        <div className="mb-10 flex items-center gap-3">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight">Alumni</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {alumni.map((alum) => (
            <AlumnusCard key={alum.name} alum={alum} />
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="mt-16 flex items-start gap-6 rounded-md border border-primary/20 bg-muted/50 p-6 sm:items-center sm:p-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Join SLIDE Studio</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {"We're always looking for curious, compassionate researchers. If you're interested in HCI, inclusive design, or social computing, reach out."}
          </p>
        </div>
      </div>
    </section>
  )
}
