import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

const PLACEHOLDER = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

export default async function ArtistsPage() {
  const supabase = await createClient();
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-serif text-4xl font-medium">Our Artists</h1>
      <p className="mt-4 text-[var(--muted)]">
        Meet the master artists behind Tattoo Kaohsiung.
      </p>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {(artists ?? []).length === 0 ? (
          <p className="col-span-full text-center text-[var(--muted)]">
            No artists yet. Check back soon.
          </p>
        ) : (
          artists?.map((artist) => (
            <div
              key={artist.id}
              className="group block overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--accent-gold)]"
            >
              <Link href={`/artists/${artist.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  {artist.avatar_url ? (
                    <img
                      src={artist.avatar_url}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={PLACEHOLDER}
                      alt={artist.name}
                      width={400}
                      height={533}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                </div>
                <div className="relative p-6">
                  <h2 className="font-serif text-xl font-medium">{artist.name}</h2>
                  <p className="mt-1 text-sm text-[var(--accent-gold)]">
                    {artist.specialty || "Tattoo Artist"}
                  </p>
                </div>
              </Link>
              {artist.ig_handle && (
                <div className="px-6 pb-6">
                  <a
                    href={`https://instagram.com/${artist.ig_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--muted)] hover:text-[var(--accent-gold)]"
                  >
                    @{artist.ig_handle}
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
