import { createClient } from "@/lib/supabase/server";

function getArtistName(item: { artists?: unknown }): string {
  const a = item.artists;
  if (!a) return "—";
  if (Array.isArray(a)) return (a[0] as { name?: string })?.name ?? "—";
  return (a as { name?: string })?.name ?? "—";
}

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
        Browse our portfolio of tattoo artistry.
      </p>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {(artworks ?? []).length === 0 ? (
          <p className="col-span-full text-center text-[var(--muted)]">
            No artwork yet. Check back soon.
          </p>
        ) : (
          artworks?.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title || "Artwork"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="font-medium">{item.title || "Untitled"}</div>
                <div className="text-sm text-[var(--muted)]">
                  {getArtistName(item)}
                </div>
                {item.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-xs text-[var(--accent-gold)]">
                    {item.tags.map((tag: string) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
