"use client";

import type { Dictionary } from "@/i18n/types";

export function HeroSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20 bg-[#0a0a0a]">
      <div className="max-w-[1400px] w-full mx-auto">
        <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
          <span className="block animate-fade-up" style={{ animationDelay: "200ms" }}>
            {dict.home.hero.line1}
          </span>
          <span className="block animate-fade-up" style={{ animationDelay: "350ms" }}>
            {dict.home.hero.line2}
          </span>
          <span className="block animate-fade-up" style={{ animationDelay: "500ms" }}>
            {dict.home.hero.line3}
          </span>
        </h1>
        <p className="mt-8 text-white/40 text-[15px] md:text-[17px] max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "700ms" }}>
          {dict.metadata.description}
        </p>
      </div>
    </section>
  );
}
