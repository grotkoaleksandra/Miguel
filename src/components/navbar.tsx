"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/types";
import { type Locale, INTRANET_LOCALES } from "@/i18n/config";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";

export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();

  const intranetLang = INTRANET_LOCALES.includes(lang) ? lang : "en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (pathname.includes("/intranet")) return null;

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.work },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#f7f7f5]/90 backdrop-blur-md" : ""
        }`}
      >
        <div className="mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="text-[#111] text-[15px] font-semibold tracking-[0.02em] relative z-[60]"
          >
            Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#111]/60 text-[13px] tracking-[0.02em] hover:text-[#111] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menu trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#111] text-[13px] tracking-[0.08em] uppercase relative z-[60] md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-[#f7f7f5] flex flex-col justify-center px-10 md:hidden">
          <div className="space-y-2">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-[#111] text-5xl font-semibold tracking-[-0.02em] py-2 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-16 space-y-4">
            <a
              href="mailto:hello@syrenacreative.com"
              className="block text-[#111]/40 text-sm"
            >
              hello@syrenacreative.com
            </a>
            <span className="block text-[#111]/30 text-sm">Warsaw, Poland</span>
            {!loading && user && (
              <Link
                href={`/${intranetLang}/intranet`}
                onClick={() => setMenuOpen(false)}
                className="block text-[#111]/20 text-xs tracking-[0.2em] uppercase mt-8"
              >
                {dict.nav.intranet}
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
