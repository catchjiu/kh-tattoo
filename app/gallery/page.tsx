import { createClient } from "@/lib/supabase/server";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { Section } from "@/components/ui";

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: artworks } = await supabase
    .from("art_uploads")
    .select("id, title, image_url, tags, artists(name)")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-6">
      <Section size="narrow">
        <GalleryHeader />
      </Section>

      <GalleryGrid artworks={artworks ?? []} />
    </div>
  );
}
