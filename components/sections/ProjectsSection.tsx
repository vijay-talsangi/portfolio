import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { defineQuery } from "next-sanity";

const PROJECTS_QUERY =
  defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  techStack,
  liveUrl,
  githubUrl,
  featured,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground">Some of my best work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.slug?.current}
              className="group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              {project.coverImage && (
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={urlFor(project.coverImage)
                      .width(600)
                      .height(400)
                      .url()}
                    alt={project.title || "Project image"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {project.category && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {project.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title || "Untitled Project"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, idx) =>
                      tech.name ? (
                        <span
                          key={`${project.slug?.current}-tech-${idx}`}
                          className="text-xs px-2 py-1 rounded-md bg-muted"
                        >
                          {tech.name}
                        </span>
                      ) : null
                    )}
                    {project.technologies.length > 4 && (
                      <span className="text-xs px-2 py-1 rounded-md bg-muted">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border hover:bg-accent transition-colors text-sm"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
