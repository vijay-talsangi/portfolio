import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { defineQuery } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { IconCheck } from "@tabler/icons-react";

const SERVICES_QUERY =
  defineQuery(`*[_type == "service"] | order(order asc, _createdAt desc){
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  features,
  technologies[]->{name, category},
  deliverables,
  pricing,
  timeline,
  featured,
  order
}`);

export async function ServicesSection() {
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY });

  if (!services || services.length === 0) {
    return null;
  }

  const formatPrice = (pricing: {
    startingPrice?: number;
    priceType?: string;
    description?: string;
  }) => {
    if (!pricing) return null;

    const { startingPrice, priceType, description } = pricing;

    const priceTypeLabels: Record<string, string> = {
      hourly: "/hour",
      project: "/project",
      monthly: "/month",
      custom: "",
    };

    if (priceType === "custom") {
      return <span className="text-primary font-semibold">Custom Quote</span>;
    }

    return (
      <div>
        {startingPrice && (
          <span className="text-2xl font-bold text-primary">
            ${startingPrice.toLocaleString()}
            {priceType && priceTypeLabels[priceType]}
          </span>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    );
  };

  // Separate featured and regular services
  const featured = services.filter((s) => s.featured);
  const regular = services.filter((s) => !s.featured);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
          <p className="text-xl text-muted-foreground">What I can do for you</p>
        </div>

        {/* Featured Services */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              Featured Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((service) => (
                <div
                  key={service.slug?.current || service.title}
                  className="bg-card border-2 border-primary/20 rounded-lg p-8 hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  {service.icon && (
                    <div className="relative w-16 h-16 mb-6">
                      <Image
                        src={urlFor(service.icon).width(64).height(64).url()}
                        alt={service.title || "Service"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>

                  {service.shortDescription && (
                    <p className="text-muted-foreground mb-4 text-lg">
                      {service.shortDescription}
                    </p>
                  )}

                  {service.fullDescription && (
                    <div className="prose prose-sm dark:prose-invert mb-6">
                      <PortableText value={service.fullDescription} />
                    </div>
                  )}

                  {service.features && service.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={`${service.title}-feature-${idx}`}
                            className="flex items-start gap-2"
                          >
                            <IconCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t">
                    {service.pricing && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Pricing
                        </p>
                        {formatPrice(service.pricing)}
                      </div>
                    )}
                    {service.timeline && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Timeline
                        </p>
                        <p className="font-semibold">{service.timeline}</p>
                      </div>
                    )}
                  </div>

                  {service.technologies && service.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) =>
                        tech.name ? (
                          <span
                            key={`${service.title}-tech-${idx}`}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {tech.name}
                          </span>
                        ) : null
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Services */}
        {regular.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="text-2xl font-bold mb-6">All Services</h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((service) => (
                <div
                  key={service.slug?.current || service.title}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all hover:scale-105 flex flex-col"
                >
                  {service.icon && (
                    <div className="relative w-12 h-12 mb-4">
                      <Image
                        src={urlFor(service.icon).width(48).height(48).url()}
                        alt={service.title || "Service"}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>

                  {service.shortDescription && (
                    <p className="text-muted-foreground mb-4 text-sm flex-1">
                      {service.shortDescription}
                    </p>
                  )}

                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={`${service.title}-feature-${idx}`}
                          className="flex items-start gap-2 text-sm"
                        >
                          <IconCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-4 border-t space-y-2">
                    {service.pricing && (
                      <div className="text-sm">
                        {formatPrice(service.pricing)}
                      </div>
                    )}
                    {service.timeline && (
                      <p className="text-sm text-muted-foreground">
                        ⏱️ {service.timeline}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
