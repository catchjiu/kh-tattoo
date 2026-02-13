import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, category, cover_image_url, published_at")
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl font-medium">Blog</h1>
      <p className="mt-4 text-[var(--muted)]">
        Studio news and aftercare tips.
      </p>

      <div className="mt-16 space-y-8">
        {(posts ?? []).length === 0 ? (
          <p className="text-center text-[var(--muted)]">
            No posts yet. Check back soon.
          </p>
        ) : (
          posts?.map((post) => (
            <article
              key={post.id}
              className="border-b border-[var(--border)] pb-8 last:border-0"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.cover_image_url && (
                  <div className="aspect-[3/2] overflow-hidden rounded-sm">
                    <img
                      src={post.cover_image_url}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                {post.category && (
                  <span className="mt-4 block text-xs uppercase tracking-wider text-[var(--accent-gold)]">
                    {post.category}
                  </span>
                )}
                <h2 className="mt-2 font-serif text-3xl font-medium group-hover:text-[var(--accent-gold)] sm:text-4xl">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-sm text-[var(--muted)] line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-3 inline-block text-sm font-medium text-[var(--accent-gold)] group-hover:underline">
                  Read more →
                </span>
                {post.published_at && (
                  <time
                    dateTime={post.published_at}
                    className="mt-2 block text-xs text-[var(--muted-foreground)]"
                  >
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
