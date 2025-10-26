import { SkillsChart } from "./SkillsChart";

export async function SkillsSection() {
  const skills = [
    {
      name: "JavaScript",
      category: "programming-languages",
      proficiency: "Advanced",
      percentage: 90,
      yearsOfExperience: 5,
      color: "var(--color-yellow)",
    },
    {
      name: "TypeScript",
      category: "programming-languages",
      proficiency: "Advanced",
      percentage: 85,
      yearsOfExperience: 4,
      color: "var(--color-blue)",
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical proficiencies and tools I
            work with daily
          </p>
        </div>

        <SkillsChart skills={skills} />
      </div>
    </section>
  );
}
