"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

/**
 * Full-viewport hero — black bg, large serif title with word-by-word reveal.
 * Category tags below in monospace. Matches Stink Studios layout.
 */
export function HeroSection({ dict }: { dict: Dictionary }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay reveal to sync with loader exit
    const t = setTimeout(() => setRevealed(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const fullText = `${dict.home.hero.line1} ${dict.home.hero.line2} ${dict.home.hero.line3}`;
  const words = fullText.split(" ");

  const tags = ["Websites", "Apps", "Branding"];

  return (
    <section
      ref={ref}
      className="relative bg-black"
      style={{ minHeight: "100vh", paddingTop: 120 }}
    >
      <div className="mx-auto px-5 md:px-5" style={{ maxWidth: "100%" }}>
        {/* Giant wordmark */}
        <div
          className="text-white font-bold uppercase leading-[0.85] tracking-[-0.04em] select-none"
          style={{
            fontSize: "clamp(60px, 14vw, 260px)",
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 100ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 100ms",
          }}
        >
          Syrena<br />Creative
        </div>

        {/* Title */}
        <h1
          className="type-title-serif text-white"
          style={{
            marginTop: 120,
            maxWidth: "75%",
            textWrap: "balance",
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden mr-[0.25em]"
            >
              <span
                className="inline-block"
                style={{
                  transform: revealed ? "translateY(0)" : "translateY(100%)",
                  opacity: revealed ? 1 : 0,
                  transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 60}ms, opacity 0.4s ease ${200 + i * 60}ms`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-x-4 gap-y-2 mt-5"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s ease 1.2s",
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="type-caption text-white link-underline"
              style={{ textDecorationColor: "rgba(255,255,255,0.5)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom spacer */}
        <div style={{ height: 120 }} />
      </div>
    </section>
  );
}
