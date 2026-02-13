import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogPostList } from "./BlogPostList";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="font-serif text-2xl font-medium text-[var(--foreground)] sm:text-3xl">
        Blog
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        Manage studio news and aftercare tips. Markdown supported.
      </p>
      <div className="mt-8">
        <BlogPostList posts={posts ?? []} />
      </div>
    </div>
  );
}
