import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { defineQuery } from "next-sanity";

const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`);

export async function TestimonialsSection() {
  const { data: testimonials } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            What people say about working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={`${testimonial.name}-${
                testimonial.company || testimonial.position
              }`}
              className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={`${testimonial.name}-star-${i}`}
                      className={
                        testimonial.rating && i < testimonial.rating
                          ? "text-yellow-500"
                          : "text-muted"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Testimonial Text */}
              <blockquote className="text-muted-foreground italic mb-6 flex-1">
                "{testimonial.testimonial}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={urlFor(testimonial.avatar)
                        .width(48)
                        .height(48)
                        .url()}
                      alt={testimonial.name || "Testimonial"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}
                  </p>
                  {testimonial.company && (
                    <p className="text-sm text-primary">
                      {testimonial.company}
                    </p>
                  )}
                </div>

                {testimonial.linkedinUrl && (
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Visit ${testimonial.name}'s LinkedIn profile`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>LinkedIn</title>
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
