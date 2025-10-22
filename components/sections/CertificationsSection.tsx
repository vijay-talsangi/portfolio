import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { IconExternalLink } from "@tabler/icons-react";

const CERTIFICATIONS_QUERY =
  defineQuery(`*[_type == "certification"] | order(issueDate desc){
  name,
  issuer,
  issueDate,
  expiryDate,
  credentialId,
  credentialUrl,
  logo,
  description,
  skills[]->{name, category},
  order
}`);

export async function CertificationsSection() {
  const { data: certifications } = await sanityFetch({
    query: CERTIFICATIONS_QUERY,
  });

  if (!certifications || certifications.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const isExpired = (expiryDate: string | null | undefined) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications
          </h2>
          <p className="text-xl text-muted-foreground">
            Professional credentials and certifications
          </p>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={`${cert.issuer}-${cert.name}-${cert.issueDate}`}
                className="@container/card bg-card border rounded-lg p-4 @md/card:p-6 hover:shadow-lg transition-all hover:scale-105 flex flex-col"
              >
                {cert.logo && (
                  <div className="relative w-full h-24 @md/card:h-32 mb-4 flex items-center justify-center">
                    <div className="relative w-20 h-20 @md/card:w-24 @md/card:h-24">
                      <Image
                        src={urlFor(cert.logo).width(96).height(96).url()}
                        alt={`${cert.name} badge`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-lg @md/card:text-xl font-semibold mb-2 line-clamp-2">
                    {cert.name}
                  </h3>
                  <p className="text-primary font-medium mb-3 text-sm @md/card:text-base truncate">
                    {cert.issuer}
                  </p>

                  {cert.description && (
                    <p className="text-xs @md/card:text-sm text-muted-foreground mb-4 line-clamp-3">
                      {cert.description}
                    </p>
                  )}

                  <div className="space-y-2 text-xs @md/card:text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Issued:</span>
                      {cert.issueDate && formatDate(cert.issueDate)}
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Expires:</span>
                        <span
                          className={
                            isExpired(cert.expiryDate)
                              ? "text-destructive"
                              : "text-muted-foreground"
                          }
                        >
                          {formatDate(cert.expiryDate)}
                          {isExpired(cert.expiryDate) && " (Expired)"}
                        </span>
                      </div>
                    )}
                    {cert.credentialId && (
                      <div className="flex items-start gap-2">
                        <span className="font-medium whitespace-nowrap">
                          Credential ID:
                        </span>
                        <span className="break-all text-xs">
                          {cert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 @md/card:gap-2 mt-4">
                      {cert.skills.map((skill, idx) => {
                        const skillData =
                          skill && typeof skill === "object" && "name" in skill
                            ? skill
                            : null;
                        return skillData?.name ? (
                          <span
                            key={`${cert.name}-skill-${idx}`}
                            className="px-2 py-0.5 @md/card:py-1 text-xs rounded-full bg-primary/10 text-primary"
                          >
                            {skillData.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                {cert.credentialUrl && (
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs @md/card:text-sm text-primary hover:underline mt-4 pt-4 border-t"
                  >
                    Verify Credential
                    <IconExternalLink className="w-3.5 h-3.5 @md/card:w-4 @md/card:h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
