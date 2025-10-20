import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";

const BLOG_QUERY =
  defineQuery(`*[_type == "blog"] | order(publishedAt desc)[0...3]{
  title,
  slug,
  excerpt,
  category,
  tags,
  publishedAt,
  readTime,
  featuredImage
}`);

export async function BlogSection() {
  const { data: posts } = await sanityFetch({
    query: BLOG_QUERY,
  });

  if (!posts || posts.length === 0) {
    return null;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug?.current}
              className="group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {post.featuredImage && (
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={urlFor(post.featuredImage)
                      .width(600)
                      .height(400)
                      .url()}
                    alt={post.title || "Blog post"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {post.category && (
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                      {post.category}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span>{formatDate(post.publishedAt)}</span>
                  )}
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={`${post.slug?.current}-${tag}`}
                        className="text-xs px-2 py-1 rounded-md bg-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/blog/${post.slug?.current}`}
                  className="inline-flex items-center text-primary hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-lg border hover:bg-accent transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
