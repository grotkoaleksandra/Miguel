"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/types";
import { type Locale, INTRANET_LOCALES } from "@/i18n/config";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const intranetLang = INTRANET_LOCALES.includes(lang) ? lang : "en";

  if (pathname.includes("/intranet")) {
    return null;
  }

  const links = [
    { href: `/${lang}`, label: dict.nav.work },
    { href: `/${lang}/about`, label: dict.nav.about },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="text-white text-[14px] tracking-[0.04em]"
        >
          Syrena<span className="hidden md:inline"> Creative</span><span className="align-super text-[8px] ml-0.5">®</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-[12px] tracking-[0.08em] uppercase link-hover opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}/contact`}
            className="text-white text-[12px] tracking-[0.08em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300 ml-4"
          >
            {dict.nav.letsTalk}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-[12px] tracking-[0.15em] uppercase"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#030303] z-40 flex flex-col justify-end p-10 pb-16">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-7 right-6 text-white/50 text-[12px] tracking-[0.15em] uppercase"
            aria-label="Close menu"
          >
            Close
          </button>
          <div className="space-y-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white font-display text-5xl font-normal tracking-[-0.02em]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMenuOpen(false)}
              className="block text-white font-display text-5xl font-normal tracking-[-0.02em]"
            >
              {dict.nav.contact}
            </Link>
          </div>
          {!loading && user && (
            <Link
              href={`/${intranetLang}/intranet`}
              onClick={() => setMenuOpen(false)}
              className="text-white/20 text-[11px] tracking-[0.2em] uppercase mt-16"
            >
              {dict.nav.intranet}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
