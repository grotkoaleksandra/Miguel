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
      <div className="mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="text-white text-lg tracking-tight font-medium"
        >
          Syrena Creative<span className="align-super text-[10px] ml-0.5">®</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white text-sm tracking-wide link-hover"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}/contact`}
            className="text-white text-sm tracking-wide border border-white/40 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-all duration-300"
          >
            {dict.nav.letsTalk}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-40 flex flex-col justify-center items-center gap-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-3xl font-light tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${lang}/contact`}
            onClick={() => setMenuOpen(false)}
            className="text-white text-3xl font-light tracking-wide"
          >
            {dict.nav.contact}
          </Link>
          {!loading && user && (
            <Link
              href={`/${intranetLang}/intranet`}
              onClick={() => setMenuOpen(false)}
              className="text-white/50 text-sm mt-8"
            >
              {dict.nav.intranet}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
