"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

/**
 * Full-viewport hero with giant edge-to-edge wordmark filling the screen,
 * then serif title + tags in a second block below.
 */
export function HeroSection({ dict }: { dict: Dictionary }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync with loader: scramble(600) + resolve(1200) + hold(400) + fade(600) ≈ 2800ms
    const t = setTimeout(() => setRevealed(true), 2600);
    return () => clearTimeout(t);
  }, []);

  const fullText = `${dict.home.hero.line1} ${dict.home.hero.line2} ${dict.home.hero.line3}`;
  const words = fullText.split(" ");

  const tags = ["Websites", "Apps", "Branding"];

  return (
    <>
      {/* ---- Screen 1: Giant wordmark filling viewport ---- */}
      <section
        ref={ref}
        className="relative bg-black flex items-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          className="w-full px-3 md:px-4 text-white font-bold uppercase select-none leading-[0.82] tracking-[-0.05em]"
          style={{
            fontSize: "clamp(80px, 18vw, 350px)",
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease 200ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
          }}
        >
          Syrena<br />Creative
        </div>
      </section>

      {/* ---- Screen 2: Serif title + tags ---- */}
      <section className="bg-black" style={{ paddingTop: 120, paddingBottom: 120 }}>
        <div className="px-5">
          <h1
            className="type-title-serif text-white"
            style={{ maxWidth: "70%", textWrap: "balance" }}
          >
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <span
                  className="inline-block"
                  style={{
                    transform: revealed ? "translateY(0)" : "translateY(100%)",
                    opacity: revealed ? 1 : 0,
                    transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${800 + i * 60}ms, opacity 0.4s ease ${800 + i * 60}ms`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="flex flex-wrap gap-x-4 gap-y-2 mt-5"
            style={{
              opacity: revealed ? 1 : 0,
              transition: "opacity 0.6s ease 1.8s",
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
        </div>
      </section>
    </>
  );
}
