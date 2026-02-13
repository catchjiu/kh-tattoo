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

export async function createArtist(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string || slugify(name);
  const bio = (formData.get("bio") as string) || null;
  const specialty = (formData.get("specialty") as string) || null;
  const ig_handle = (formData.get("ig_handle") as string) || null;
  const avatar_url = (formData.get("avatar_url") as string) || null;
  const display_order = parseInt((formData.get("display_order") as string) || "0", 10);
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase.from("artists").insert({
    name,
    slug: slug || slugify(name),
    bio,
    specialty,
    ig_handle: ig_handle?.replace(/^@/, "") || null,
    avatar_url,
    display_order,
    is_active,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/artists");
  revalidatePath("/artists");
  revalidatePath("/");
  return { success: true };
}

export async function updateArtist(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const bio = (formData.get("bio") as string) || null;
  const specialty = (formData.get("specialty") as string) || null;
  const ig_handle = (formData.get("ig_handle") as string) || null;
  const avatar_url = (formData.get("avatar_url") as string) || null;
  const display_order = parseInt((formData.get("display_order") as string) || "0", 10);
  const is_active = formData.get("is_active") === "on";

  const { error } = await supabase
    .from("artists")
    .update({
      name,
      slug,
      bio,
      specialty,
      ig_handle: ig_handle?.replace(/^@/, "") || null,
      avatar_url,
      display_order,
      is_active,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/artists");
  revalidatePath("/artists");
  revalidatePath("/");
  return { success: true };
}

export async function deleteArtist(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("artists").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/artists");
  revalidatePath("/artists");
  revalidatePath("/");
  return { success: true };
}
