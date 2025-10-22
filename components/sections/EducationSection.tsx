import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { IconExternalLink } from "@tabler/icons-react";

const EDUCATION_QUERY =
  defineQuery(`*[_type == "education"] | order(endDate desc, startDate desc){
  institution,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  current,
  gpa,
  description,
  achievements,
  logo,
  website,
  order
}`);

export async function EducationSection() {
  const { data: education } = await sanityFetch({ query: EDUCATION_QUERY });

  if (!education || education.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <p className="text-xl text-muted-foreground">
            My academic background
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu) => (
            <div
              key={`${edu.institution}-${edu.degree}-${edu.startDate}`}
              className="relative pl-8 pb-8 border-l-2 border-muted last:border-l-0"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

              <div className="@container/card bg-card border rounded-lg p-4 @md/card:p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col @md/card:flex-row @md/card:items-start gap-4 mb-4">
                  {edu.logo && (
                    <div className="relative w-12 h-12 @md/card:w-16 @md/card:h-16 rounded-lg overflow-hidden border shrink-0">
                      <Image
                        src={urlFor(edu.logo).width(64).height(64).url()}
                        alt={`${edu.institution} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl @md/card:text-2xl font-semibold line-clamp-2">
                      {edu.degree}
                    </h3>
                    {edu.fieldOfStudy && (
                      <p className="text-base @md/card:text-lg text-muted-foreground mt-1 truncate">
                        {edu.fieldOfStudy}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <p className="text-base @md/card:text-lg text-primary font-medium truncate">
                        {edu.institution}
                      </p>
                      {edu.gpa && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs @md/card:text-sm text-muted-foreground">
                            GPA: {edu.gpa}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs @md/card:text-sm text-muted-foreground">
                      <span>
                        {edu.startDate && formatDate(edu.startDate)} -{" "}
                        {edu.current
                          ? "Present"
                          : edu.endDate
                          ? formatDate(edu.endDate)
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {edu.description && (
                  <div className="text-muted-foreground mb-4 text-sm @md/card:text-base">
                    <p>{edu.description}</p>
                  </div>
                )}

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm @md/card:text-base">
                      Achievements & Honors:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs @md/card:text-sm">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={`${edu.institution}-achievement-${idx}`}>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.website && (
                  <Link
                    href={edu.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs @md/card:text-sm text-primary hover:underline mt-2"
                  >
                    Visit Institution Website
                    <IconExternalLink className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
