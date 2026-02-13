"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const cover_image_url = (formData.get("cover_image_url") as string) || null;
  const category = (formData.get("category") as string) || null;
  const is_published = formData.get("is_published") === "on";

  const { error } = await supabase.from("blog_posts").insert({
    title,
    slug: slug || slugify(title),
    excerpt,
    content,
    cover_image_url,
    category,
    is_published,
    published_at: is_published ? new Date().toISOString() : null,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const cover_image_url = (formData.get("cover_image_url") as string) || null;
  const category = (formData.get("category") as string) || null;
  const is_published = formData.get("is_published") === "on";

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("published_at")
    .eq("id", id)
    .single();

  const published_at = is_published
    ? existing?.published_at || new Date().toISOString()
    : null;

  const { error } = await supabase
    .from("blog_posts")
    .update({
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      category,
      is_published,
      published_at,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
