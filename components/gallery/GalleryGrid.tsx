"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
  const [lightboxItem, setLightboxItem] = useState<Artwork | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artworks.length === 0 ? (
          <p className="col-span-full text-center text-[var(--muted)]">
            No artwork yet. Check back soon.
          </p>
        ) : (
          artworks.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--card)]"
            >
              <button
                type="button"
                onClick={() => setLightboxItem(item)}
                className="relative block w-full cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title || "Artwork"}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
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
          ))
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="View artwork"
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex cursor-default items-center justify-center bg-black/90 p-4"
        >
          <div
            className="relative max-h-full max-w-4xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxItem.image_url}
              alt={lightboxItem.title || "Artwork"}
              className="max-h-[90vh] w-auto rounded-sm object-contain"
            />
            <div className="mt-4 text-center text-[var(--foreground)]">
              <div className="font-medium">{lightboxItem.title || "Untitled"}</div>
              {showArtistName && (
                <div className="text-sm text-[var(--muted)]">
                  {getArtistName(lightboxItem)}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLightboxItem(null)}
            className="absolute right-4 top-4 rounded-full p-2 text-[var(--muted)] hover:bg-white/10 hover:text-[var(--foreground)]"
            aria-label="Close"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  );
}
