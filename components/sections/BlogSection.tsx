import Image from "next/image";
import Link from "next/link";

export async function BlogSection() {
  const posts = [
    {
      title: "Understanding React Hooks",
      slug: "understanding-react-hooks",
      excerpt: "A deep dive into React Hooks and how to use them effectively.",
      category: "React",
      tags: ["React", "Hooks", "JavaScript"],
      publishedAt: "2022-01-01",
      readTime: 5,
      featuredImage:
        "https://unsplash.com/photos/a-black-background-with-a-rainbow-in-the-middle-logNx9b2oEQ",
    },
  ];

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

  type ImageBuilder = {
    width: (n: number) => ImageBuilder;
    height: (n: number) => ImageBuilder;
    url: () => string;
  };

  function urlFor(featuredImage: string): ImageBuilder {
    const src = featuredImage || "";
    const params: { w?: number; h?: number } = {};

    const builder: ImageBuilder = {
      width(w: number) {
        params.w = w;
        return builder;
      },
      height(h: number) {
        params.h = h;
        return builder;
      },
      url() {
        // If it's a full URL, use the URL API to append query params
        try {
          const u = new URL(src);
          if (params.w) u.searchParams.set("w", String(params.w));
          if (params.h) u.searchParams.set("h", String(params.h));
          return u.toString();
        } catch {
          // Not an absolute URL — treat as a path and append query params manually
          const [base, existingQuery] = src.split("?");
          const sp = new URLSearchParams(existingQuery || "");
          if (params.w) sp.set("w", String(params.w));
          if (params.h) sp.set("h", String(params.h));
          const q = sp.toString();
          return q ? `${base}?${q}` : base;
        }
      },
    };

    return builder;
  }

  return (
    <section id="blog" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights
          </p>
        </div>

        <div className="@container">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="@container/card group bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
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
                <div className="p-4 @md/card:p-6 space-y-3 @md/card:space-y-4">
                  <div className="flex flex-col @xs/card:flex-row @xs/card:items-center gap-2 text-xs @md/card:text-sm text-muted-foreground">
                    {post.category && (
                      <span className="px-2 py-0.5 @md/card:py-1 rounded-full bg-primary/10 text-primary text-xs w-fit">
                        {post.category}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      {post.publishedAt && (
                        <span className="truncate">
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.readTime && (
                        <>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg @md/card:text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-xs @md/card:text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 @md/card:gap-2">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={`${post.slug}-${tag}`}
                          className="text-xs px-2 py-0.5 @md/card:py-1 rounded-md bg-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary hover:underline text-xs @md/card:text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
