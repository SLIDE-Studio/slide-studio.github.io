"use client"

import { Linkedin } from "lucide-react"

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
  },
  {
    name: "Rachit Ranabhat",
    role: "Undergraduate",
    focus: "Computer Science",
    initials: "RR",
    image: "/images/team/rr.jpg",
    linkedin: "https://www.linkedin.com/in/rachit2002/"
  },
  {
    name: "Alessandra Pinto",
    role: "Undergraduate",
    focus: "Psychology",
    initials: "AP",
    image: "/images/team/ap.jpg",
    linkedin: "https://www.linkedin.com/in/alessandra-pinto-52a366353/"
  },
  {
    name: "Joel Varghese",
    role: "Master of Computer Science",
    focus: "Research Affiliate",
    initials: "JV",
    image: "/images/team/jv.jpeg",
    linkedin: "https://www.linkedin.com/in/joel662/",
    memo: "Graduated Spring 2026"
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

export function TeamGrid() {
  return (
    <section id="team" className="py-16">
      <h2 className="mb-12 text-xs uppercase tracking-wide text-muted-foreground">
        Team
      </h2>

      {/* Members Grid - uniform card layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex flex-col"
          >
            {/* Circular image */}
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-secondary shrink-0">
              {member.image ? (
                <img
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground/30">
                    {member.initials}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between mt-2">
              <div>
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-xs font-bold uppercase leading-tight tracking-wide">
                    {member.name}
                  </h3>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-foreground"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-snug">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {member.focus}
                </p>
              </div>
              {member.memo && (
                <p className="mt-2 text-xs italic text-muted-foreground/60">
                  {member.memo}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Alumni */}
      <div className="mt-20">
        <h3 className="mb-8 text-xs uppercase tracking-wide text-muted-foreground">
          Alumni
        </h3>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {alumni.map((alum) => (
            <div key={alum.name} className="flex items-center gap-3">
              {alum.image ? (
                <img
                  src={alum.image}
                  alt={`Portrait of ${alum.name}`}
                  className="h-10 w-10 shrink-0 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-secondary text-xs font-bold text-muted-foreground">
                  {alum.initials}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{alum.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {alum.now ? `Now at ${alum.now}` : alum.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
