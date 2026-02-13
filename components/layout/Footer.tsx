"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const footerLinks = [
  { href: "/artists", label: "Artists" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Book a Session" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-[var(--border)] bg-[#0d0d0d]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-medium tracking-wide text-[var(--foreground)]"
            >
              Tattoo Kaohsiung
            </Link>
            <p className="mt-4 max-w-xs text-sm text-[var(--muted)]">
              Premium tattoo artistry in Kaohsiung. Where tradition meets contemporary design.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-serif text-sm font-medium uppercase tracking-widest text-[var(--accent-gold)]">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent-gold)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-serif text-sm font-medium uppercase tracking-widest text-[var(--accent-gold)]">
              Connect
            </h4>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent-gold)]"
            >
              <Instagram size={18} strokeWidth={1.5} />
              @tattookaohsiung
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-center text-xs text-[var(--muted-foreground)]">
          © {new Date().getFullYear()} Tattoo Kaohsiung. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}
