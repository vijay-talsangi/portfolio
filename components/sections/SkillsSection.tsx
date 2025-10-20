import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const SKILLS_QUERY =
  defineQuery(`*[_type == "skill"] | order(category asc, order asc){
  name,
  category,
  proficiency,
  percentage,
  yearsOfExperience,
  color
}`);

export async function SkillsSection() {
  const { data: skills } = await sanityFetch({ query: SKILLS_QUERY });

  if (!skills || skills.length === 0) {
    return null;
  }

  // Group skills by category dynamically
  const groupedSkills = new Map<string, typeof skills>();

  for (const skill of skills) {
    const category = skill.category || "other";
    const existing = groupedSkills.get(category) || [];
    groupedSkills.set(category, [...existing, skill]);
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground">
            Technologies and tools I work with
          </p>
        </div>

        <div className="space-y-12">
          {Array.from(groupedSkills.entries()).map(
            ([category, categorySkills]) => {
              if (!categorySkills || categorySkills.length === 0) return null;

              // Format category for display
              const displayLabel = category
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return (
                <div key={category} className="space-y-6">
                  <h3 className="text-2xl font-semibold">{displayLabel}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name || `skill-${category}`}
                        className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg">
                            {skill.name}
                          </h4>
                          {skill.yearsOfExperience && (
                            <span className="text-sm text-muted-foreground">
                              {skill.yearsOfExperience}y
                            </span>
                          )}
                        </div>

                        {skill.percentage && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {skill.proficiency}
                              </span>
                              <span>{skill.percentage}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{
                                  width: `${skill.percentage}%`,
                                  backgroundColor: skill.color || undefined,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
