import { AchievementsSection } from "@/sections/achievements-section";
import { AboutSection }        from "@/sections/about-section";
import { CinematicIntro }      from "@/components/cinematic-intro";
import { CinematicSection }    from "@/components/cinematic-section";
import { ContactSection }      from "@/sections/contact-section";
import { EducationSection }    from "@/sections/education-section";
import { ExperienceSection }   from "@/sections/experience-section";
import { FooterSection }       from "@/sections/footer-section";
import { HeroSection }         from "@/sections/hero-section";
import { ProjectsSection }     from "@/sections/projects-section";
import { SiteNavbar }          from "@/components/site-navbar";
import { SkillsSection }       from "@/sections/skills-section";
import { WhatIBuildSection }   from "@/sections/what-i-build-section";

export default function Home() {
  return (
    <CinematicIntro>
      <SiteNavbar />

      <main className="relative z-10 min-h-screen">
        {/*
         * Hero has its OWN scroll-to-scale via useScroll inside
         * the component — wrapping it in CinematicSection would
         * double-transform it, so we leave it bare.
         */}
        <HeroSection />

        {/* Every subsequent section gets the cinematic depth treatment */}
        <CinematicSection>
          <AboutSection />
        </CinematicSection>

        <CinematicSection>
          <WhatIBuildSection />
        </CinematicSection>

        <CinematicSection>
          <ExperienceSection />
        </CinematicSection>

        <CinematicSection>
          <ProjectsSection />
        </CinematicSection>

        <CinematicSection>
          <SkillsSection />
        </CinematicSection>

        <CinematicSection>
          <AchievementsSection />
        </CinematicSection>

        <CinematicSection>
          <EducationSection />
        </CinematicSection>

        <CinematicSection>
          <ContactSection />
        </CinematicSection>
      </main>

      <div className="relative z-10">
        <FooterSection />
      </div>
    </CinematicIntro>
  );
}
