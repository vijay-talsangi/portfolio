import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  CertificationsSection,
  AchievementsSection,
  ServicesSection,
  TestimonialsSection,
  BlogSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
