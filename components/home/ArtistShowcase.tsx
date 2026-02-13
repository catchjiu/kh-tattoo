"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80";

type Artist = {
  id: string;
  name: string;
  specialty: string | null;
  avatar_url: string | null;
  slug: string;
};

type Props = {
  artists: Artist[];
};

export function ArtistShowcase({ artists }: Props) {
  const displayArtists = artists.length > 0
    ? artists
    : [
        { id: "1", name: "Artist One", specialty: "Traditional & Fine-line", avatar_url: PLACEHOLDER_IMAGE, slug: "artist-one" },
        { id: "2", name: "Artist Two", specialty: "Realism & Blackwork", avatar_url: PLACEHOLDER_IMAGE, slug: "artist-two" },
        { id: "3", name: "Artist Three", specialty: "Japanese & Neo-traditional", avatar_url: PLACEHOLDER_IMAGE, slug: "artist-three" },
      ];

  return (
    <section className="border-t border-[var(--border)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-2 font-serif text-sm uppercase tracking-[0.3em] text-[var(--accent-gold)]">
            Our Artists
          </p>
          <h2 className="font-serif text-4xl font-medium sm:text-5xl">
            Meet the Masters
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            Each artist brings a unique vision and decades of experience to every
            piece.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayArtists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <Link href={`/artists/${artist.slug}`} className="block">
                <div className="relative overflow-hidden rounded-sm bg-[var(--card)] transition-colors group-hover:bg-[var(--card-hover)]">
                  <div className="aspect-[3/4] overflow-hidden">
                    {artist.avatar_url ? (
                      <img
                        src={artist.avatar_url}
                        alt={artist.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={PLACEHOLDER_IMAGE}
                        alt={artist.name}
                        width={400}
                        height={533}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-xl font-medium text-[var(--foreground)]">
                      {artist.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--accent-gold)]">
                      {artist.specialty || "Tattoo Artist"}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors group-hover:text-[var(--accent-gold)]">
                      View Portfolio
                      <ArrowRight size={16} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 border-b border-[var(--accent-gold)] pb-1 font-medium text-[var(--accent-gold)] transition-colors hover:text-[var(--foreground)]"
          >
            View All Artists
            <ArrowRight size={18} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
