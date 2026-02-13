import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default async function ArtistGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!artist) notFound();

  const { data: artworks } = await supabase
    .from("art_uploads")
    .select("id, title, image_url, tags")
    .eq("artist_id", artist.id)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <Link
        href="/artists"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent-gold)]"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Back to Artists
      </Link>

      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-12">
        {artist.avatar_url && (
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-sm">
            <img
              src={artist.avatar_url}
              alt={artist.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div>
          <h1 className="font-serif text-4xl font-medium">{artist.name}</h1>
          {artist.specialty && (
            <p className="mt-2 text-[var(--accent-gold)]">{artist.specialty}</p>
          )}
          {artist.ig_handle && (
            <a
              href={`https://instagram.com/${artist.ig_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-[var(--muted)] hover:text-[var(--accent-gold)]"
            >
              @{artist.ig_handle}
            </a>
          )}
        </div>
      </div>

      <h2 className="font-serif text-2xl font-medium text-[var(--foreground)]">
        Portfolio
      </h2>
      <p className="mt-2 text-[var(--muted)]">
        {artworks?.length ?? 0} piece{(artworks?.length ?? 0) !== 1 ? "s" : ""} in this collection. Hover or tap to reveal color.
      </p>

      <GalleryGrid artworks={artworks ?? []} showArtistName={false} />
    </div>
  );
}
