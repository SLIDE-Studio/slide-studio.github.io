import { SidebarInfo } from "@/components/sidebar-info"
import { ProjectGrid } from "@/components/project-grid"
import { TeamGrid } from "@/components/team-grid"
import { WorksList } from "@/components/works-list"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarInfo />
      
      {/* Main Content Area - offset for sidebar on desktop */}
      <main className="px-5 pt-20 pb-16 lg:ml-[260px] lg:pt-8 xl:ml-[300px]">
        <div className="max-w-5xl">
          <ProjectGrid />
          <TeamGrid />
          <WorksList />
          <ContactSection />
          
          {/* Footer */}
          <footer className="mt-16 border-t border-border py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs uppercase tracking-wide">SLIDE Studio</p>
              <p className="text-xs text-muted-foreground">
                SociaL Interaction DEsign Research Studio
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
