import { SkillsChart } from "./SkillsChart";

export async function SkillsSection() {
  const skills = [
    {
      name: "JavaScript",
      category: "programming-languages",
      proficiency: "Advanced",
      percentage: 80,
      yearsOfExperience: 5,
      color: "yellow",
    },
    {
      name: "TypeScript",
      category: "programming-languages",
      proficiency: "Advanced",
      percentage: 75,
      yearsOfExperience: 4,
      color: "blue",
    },
    {
      name: "C++",
      category: "programming-languages",
      proficiency: "Intermediate",
      percentage: 75,
      yearsOfExperience: 3,
      color: "purple",
    },
    {
      name: "Java",
      category: "programming-languages",
      proficiency: "Advanced",
      percentage: 80,
      yearsOfExperience: 4,
      color: "red",
    },
    {
      name: "Python",
      category: "programming-languages",
      proficiency: "Intermediate",
      percentage: 50,
      yearsOfExperience: 5,
      color: "green",
    },

    // Operating systems
    {
      name: "Linux",
      category: "operating-systems",
      proficiency: "Advanced",
      percentage: 90,
      yearsOfExperience: 6,
      color: "teal",
    },
    {
      name: "Windows",
      category: "operating-systems",
      proficiency: "Advanced",
      percentage: 85,
      yearsOfExperience: 8,
      color: "blue",
    },
    {
      name: "macOS",
      category: "operating-systems",
      proficiency: "Intermediate",
      percentage: 50,
      yearsOfExperience: 5,
      color: "orange",
    },

    // Tech stacks
    {
      name: "Next.js",
      category: "tech-stack",
      proficiency: "Advanced",
      percentage: 80,
      yearsOfExperience: 4,
      color: "indigo",
    },
    {
      name: "MERN",
      category: "tech-stack",
      proficiency: "Advanced",
      percentage: 75,
      yearsOfExperience: 5,
      color: "green",
    },
    {
      name: "React Native (Expo)",
      category: "tech-stack",
      proficiency: "Intermediate",
      percentage: 65,
      yearsOfExperience: 3,
      color: "fuchsia",
    },
    {
      name: "EJS",
      category: "tech-stack",
      proficiency: "Advanced",
      percentage: 85,
      yearsOfExperience: 3,
      color: "yellow",
    },
    {
      name: "Flask",
      category: "tech-stack",
      proficiency: "Advanced",
      percentage: 35,
      yearsOfExperience: 3,
      color: "blue",
    },

    // Other
    {
      name: "AWS",
      category: "other",
      proficiency: "Advanced",
      percentage: 75,
      yearsOfExperience: 4,
      color: "orange",
    },
    {
      name: "Vercel",
      category: "other",
      proficiency: "Intermediate",
      percentage: 80,
      yearsOfExperience: 3,
      color: "violet",
    },
    {
      name: "GCP",
      category: "other",
      proficiency: "Advanced",
      percentage: 75,
      yearsOfExperience: 2,
      color: "green",
    },
    {
      name: "Docker",
      category: "other",
      proficiency: "Advanced",
      percentage: 70,
      yearsOfExperience: 5,
      color: "blue",
    },
    {
      name: "Kubernetes",
      category: "other",
      proficiency: "Intermediate",
      percentage: 60,
      yearsOfExperience: 3,
      color: "red",
    },
    {
      name: "n8n",
      category: "other",
      proficiency: "Intermediate",
      percentage: 70,
      yearsOfExperience: 2,
      color: "pink",
    },
    {
      name: "MCP",
      category: "other",
      proficiency: "Familiar",
      percentage: 60,
      yearsOfExperience: 1,
      color: "lime",
    },
    {
      name: "Blockchain",
      category: "other",
      proficiency: "Familiar",
      percentage: 55,
      yearsOfExperience: 2,
      color: "cyan",
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
