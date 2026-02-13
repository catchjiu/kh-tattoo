"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Parallax / high-res background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1568515041317-4c1a7c936ee0?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 via-[#121212]/80 to-[#121212]" />
      </div>

      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 font-serif text-sm uppercase tracking-[0.3em] text-[var(--accent-gold)]"
        >
          Kaohsiung&apos;s Finest
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-medium leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Art on
          <br />
          <span className="text-[var(--accent-gold)]">Skin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-8 max-w-xl text-base text-[var(--muted)] sm:text-lg"
        >
          Where tradition meets contemporary design. Premium tattoo artistry by
          master artists in the heart of Kaohsiung.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-sm border border-[var(--accent-gold)] bg-[var(--accent-gold-muted)] px-8 py-4 font-medium text-[var(--accent-gold)] transition-all hover:bg-[var(--accent-gold)] hover:text-[#121212]"
          >
            Book a Session
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded-sm border border-[var(--border)] px-8 py-4 font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
          >
            View Gallery
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown
            className="h-8 w-8 animate-bounce text-[var(--muted)]"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>
    </section>
  );
}
