"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { HeroSlider } from "./HeroSlider";

const CYAN = "#00e5ff";

type Props = {
  /** Gallery image URLs for hero background carousel */
  imageUrls?: string[];
};

export function HeroSection({ imageUrls = [] }: Props) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Background carousel with fetched gallery images */}
      <HeroSlider imageUrls={imageUrls} intervalMs={5000} />

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-bold leading-[1.15] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Tattoo{" "}
          <span style={{ color: CYAN }}>Kaohsiung</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-base text-foreground-muted sm:text-lg md:text-xl"
        >
          Precision realism meets contemporary ink. Where every detail matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm border-2 px-8 py-4 font-semibold tracking-wide transition-colors"
            style={{
              borderColor: CYAN,
              backgroundColor: CYAN,
              color: "#0a0a0a",
            }}
          >
            BOOK A SESSION
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-sm border border-white/40 px-8 py-4 font-semibold tracking-wide text-white/90 backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/5 hover:text-white"
          >
            VIEW GALLERY
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown
            className="h-8 w-8 animate-bounce text-white/60"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
    </section>
  );
}
