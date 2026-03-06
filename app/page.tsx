import { createClient } from "@/lib/supabase/server";
import { ComingSoon } from "@/components/home/ComingSoon";

export default async function HomePage() {
  const supabase = await createClient();

  const [artistsRes, galleryRes] = await Promise.all([
    supabase
      .from("artists")
      .select("id, name, specialty, avatar_url, slug")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
    supabase
      .from("art_uploads")
      .select("image_url")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(12),
  ]);

  const artists = artistsRes.data ?? [];
  const imageUrls = (galleryRes.data ?? []).map((r) => r.image_url);

  return <ComingSoon artists={artists} imageUrls={imageUrls} />;
}
