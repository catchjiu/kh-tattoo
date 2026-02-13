import { createClient } from "@/lib/supabase/server";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: artworks } = await supabase
    .from("art_uploads")
    .select("id, title, image_url, tags, artists(name)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-serif text-4xl font-medium">Gallery</h1>
      <p className="mt-4 text-[var(--muted)]">
        Browse our portfolio of tattoo artistry. Hover or tap to reveal color.
      </p>

      <GalleryGrid artworks={artworks ?? []} />
    </div>
  );
}
