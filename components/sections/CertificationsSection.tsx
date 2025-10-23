import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { CometCard } from "@/components/ui/comet-card";

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
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <CometCard
                key={`${cert.issuer}-${cert.name}-${cert.issueDate}`}
                rotateDepth={10}
                translateDepth={12}
                className="w-full max-w-md mx-auto"
              >
                <div
                  className="@container/card bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-700/50 rounded-[16px] p-6 flex flex-col min-h-[400px] saturate-75 backdrop-blur-sm"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {cert.logo && (
                    <div className="relative w-full h-32 mb-6 flex items-center justify-center shrink-0">
                      <div className="relative w-24 h-24">
                        <Image
                          src={urlFor(cert.logo).width(96).height(96).url()}
                          alt={`${cert.name} badge`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-white">
                      {cert.name}
                    </h3>
                    <p className="text-zinc-300 font-medium mb-4 text-base">
                      {cert.issuer}
                    </p>

                    {cert.description && (
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                        {cert.description}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-zinc-400 mb-4">
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
                                ? "text-destructive font-medium"
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
                            ID:
                          </span>
                          <span className="break-all text-xs font-mono">
                            {cert.credentialId}
                          </span>
                        </div>
                      )}
                    </div>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {cert.skills.slice(0, 4).map((skill, idx) => {
                          const skillData =
                            skill &&
                            typeof skill === "object" &&
                            "name" in skill
                              ? skill
                              : null;
                          return skillData?.name ? (
                            <span
                              key={`${cert.name}-skill-${idx}`}
                              className="px-2.5 py-1 text-xs rounded-full bg-zinc-700/50 text-zinc-200 font-medium border border-zinc-600/30"
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
                      className="inline-flex items-center justify-center gap-2 text-sm text-zinc-200 hover:text-white transition-colors mt-4 pt-4 border-t border-zinc-700/50 shrink-0 font-medium"
                    >
                      Verify Credential
                      <IconExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </CometCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
