"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createArtUpload(formData: FormData) {
  const supabase = await createClient();
  const artist_id = (formData.get("artist_id") as string) || null;
  const title = (formData.get("title") as string) || null;
  const description = (formData.get("description") as string) || null;
  const image_url = formData.get("image_url") as string;
  const tagsStr = (formData.get("tags") as string) || "";
  const tags = tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const display_order = parseInt((formData.get("display_order") as string) || "0", 10);
  const is_featured = formData.get("is_featured") === "on";

  const { error } = await supabase.from("art_uploads").insert({
    artist_id: artist_id || null,
    title,
    description,
    image_url,
    tags,
    display_order,
    is_featured,
  });

  if (error) return { error: error.message };
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function updateArtUpload(id: string, formData: FormData) {
  const supabase = await createClient();
  const artist_id = (formData.get("artist_id") as string) || null;
  const title = (formData.get("title") as string) || null;
  const description = (formData.get("description") as string) || null;
  const image_url = formData.get("image_url") as string;
  const tagsStr = (formData.get("tags") as string) || "";
  const tags = tagsStr
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const display_order = parseInt((formData.get("display_order") as string) || "0", 10);
  const is_featured = formData.get("is_featured") === "on";

  const { error } = await supabase
    .from("art_uploads")
    .update({
      artist_id: artist_id || null,
      title,
      description,
      image_url,
      tags,
      display_order,
      is_featured,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}

export async function deleteArtUpload(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("art_uploads").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { success: true };
}
