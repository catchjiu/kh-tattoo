import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function BlogContent({ content }: { content: string }) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content);
  const html = isHtml
    ? content
    : content
        .replace(/\n/g, "<br />")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/^### (.*$)/gm, "<h3 class='font-serif text-xl font-medium mt-6 mb-2'>$1</h3>")
        .replace(/^## (.*$)/gm, "<h2 class='font-serif text-2xl font-medium mt-8 mb-2'>$1</h2>")
        .replace(/^# (.*$)/gm, "<h1 class='font-serif text-3xl font-medium mt-8 mb-2'>$1</h1>");
  return (
    <div
      className="prose prose-invert mt-8 max-w-none [&_img]:rounded [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:max-w-2xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .single();

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent-gold)]"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Back to Blog
      </Link>

      <article>
        {post.category && (
          <span className="text-sm uppercase tracking-wider text-[var(--accent-gold)]">
            {post.category}
          </span>
        )}
        <h1 className="mt-2 font-serif text-4xl font-medium">{post.title}</h1>
        {post.published_at && (
          <time
            dateTime={post.published_at}
            className="mt-2 block text-[var(--muted)]"
          >
            {new Date(post.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}

        {post.cover_image_url && (
          <div className="mt-8 overflow-hidden rounded-sm">
            <img
              src={post.cover_image_url}
              alt=""
              className="w-full object-cover"
            />
          </div>
        )}

        <BlogContent content={post.content} />
      </article>
    </div>
  );
}
