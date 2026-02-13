"use client";

import { useState } from "react";

function getArtistName(item: { artists?: unknown }): string {
  const a = item.artists;
  if (!a) return "—";
  if (Array.isArray(a)) return (a[0] as { name?: string })?.name ?? "—";
  return (a as { name?: string })?.name ?? "—";
}

type Artwork = {
  id: string;
  title: string | null;
  image_url: string;
  tags: string[] | null;
  artists?: { name: string } | { name: string }[] | null;
};

type Props = {
  artworks: Artwork[];
  showArtistName?: boolean;
};

export function GalleryGrid({ artworks, showArtistName = true }: Props) {
  const [coloredId, setColoredId] = useState<string | null>(null);

  return (
    <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {artworks.length === 0 ? (
        <p className="col-span-full text-center text-[var(--muted)]">
          No artwork yet. Check back soon.
        </p>
      ) : (
        artworks.map((item) => {
          const isColored = coloredId === item.id;
          return (
            <div
              key={item.id}
              className="group overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--card)]"
            >
              <button
                type="button"
                onClick={() => setColoredId(isColored ? null : item.id)}
                className="relative block w-full cursor-pointer"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title || "Artwork"}
                    className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      isColored ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                    }`}
                  />
                </div>
              </button>
              <div className="p-4">
                <div className="font-medium">{item.title || "Untitled"}</div>
                {showArtistName && (
                  <div className="text-sm text-[var(--muted)]">
                    {getArtistName(item)}
                  </div>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1 text-xs text-[var(--accent-gold)]">
                    {item.tags.map((tag: string) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
