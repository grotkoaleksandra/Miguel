"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/i18n/types";
import { type Locale, INTRANET_LOCALES } from "@/i18n/config";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect, useRef } from "react";

/**
 * Fixed header — hides on scroll down, reveals on scroll up.
 * Logo left (bold uppercase), nav links right with underline.
 * Full-screen overlay menu on mobile.
 */
export function Navbar({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [hasBg, setHasBg] = useState(false);
  const lastScroll = useRef(0);
  const { user, loading } = useAuth();

  const intranetLang = INTRANET_LOCALES.includes(lang) ? lang : "en";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < 80 || y < lastScroll.current);
      setHasBg(y > 80);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.2s linear, opacity 0.4s linear",
        }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "#000",
            opacity: hasBg ? 1 : 0,
            transition: "opacity 0.4s linear",
          }}
        />

        <div className="relative mx-auto px-5 md:px-5 flex items-center justify-between" style={{ paddingTop: 20, paddingBottom: 0 }}>
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="type-subtitle uppercase text-white leading-[0.9] relative z-[60]"
          >
            Syrena<br className="hidden md:block" /> Creative
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="type-text link-underline text-white opacity-100 hover:opacity-40 transition-opacity duration-200"
                style={{ fontSize: 23, textDecorationColor: "rgba(255,255,255,0.5)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white relative z-[60]"
            style={{ fontWeight: 300, fontSize: 23, letterSpacing: "-0.04em" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Divider line */}
        <div className="mx-5 mt-5 divider" />
      </header>

      {/* Full-screen mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-black flex flex-col justify-end p-5 pb-16 md:hidden">
          <div className="space-y-1 mb-16">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-white link-underline"
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontWeight: 400,
                  fontSize: 60,
                  lineHeight: "1em",
                  letterSpacing: "-0.05em",
                  textDecorationColor: "rgba(255,255,255,0.5)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            <a href="mailto:hello@syrenacreative.com" className="block type-caption text-white/50">
              hello@syrenacreative.com
            </a>
            <span className="block type-caption text-white/50">Warsaw, Poland</span>
            {!loading && user && (
              <Link
                href={`/${intranetLang}/intranet`}
                onClick={() => setMenuOpen(false)}
                className="block type-caption text-white/30 mt-6"
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
