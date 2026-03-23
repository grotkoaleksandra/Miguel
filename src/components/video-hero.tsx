"use client";

import { useEffect, useState } from "react";

export function VideoHero({
  line1,
  line2,
  line3,
}: {
  line1: string;
  line2: string;
  line3: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background simulating video */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-purple-900/30 animate-gradient-shift" />
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/20 via-transparent to-accent/20 animate-gradient-shift-reverse" />
        </div>
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-10 pt-20">
        <div className="max-w-[90vw] mx-auto">
          <h1 className="text-white leading-[0.9] tracking-tighter">
            <span
              className={`block text-[12vw] md:text-[9vw] font-medium transition-all duration-1000 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              {line1}
            </span>
            <span
              className={`block text-[12vw] md:text-[9vw] font-medium transition-all duration-1000 ease-out delay-200 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {line2}
            </span>
            <span
              className={`block text-[12vw] md:text-[9vw] font-medium text-accent transition-all duration-1000 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {line3}
            </span>
          </h1>

          {/* Location tag */}
          <div
            className={`mt-12 flex items-center gap-3 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/50 text-sm tracking-widest uppercase">
              Warsaw, Poland
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1200ms" }}
      >
        <div className="w-px h-16 bg-white/20 animate-pulse-line" />
      </div>
    </section>
  );
}
