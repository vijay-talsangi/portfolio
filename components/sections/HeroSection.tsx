import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { defineQuery } from "next-sanity";
import { ProfileImage } from "./ProfileImage";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);

export async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {profile.firstName}{" "}
              <span className="text-primary">{profile.lastName}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
              {profile.headline}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {profile.shortBio}
            </p>

            {profile.socialLinks && (
              <div className="flex flex-wrap gap-4 pt-4">
                {profile.socialLinks.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {profile.socialLinks.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {profile.socialLinks.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {profile.socialLinks.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    Website
                  </a>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
              {profile.email && (
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{profile.email}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.availability && (
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>{profile.availability}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image */}
          {profile.profileImage && (
            <ProfileImage
              imageUrl={urlFor(profile.profileImage)
                .width(600)
                .height(600)
                .url()}
              firstName={profile.firstName || ""}
              lastName={profile.lastName || ""}
            />
          )}
        </div>
      </div>
    </section>
  );
}
