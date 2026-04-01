"use client";

import { useEffect, useRef, useState } from "react";

export function VideoHero({
  line1,
  line2,
  line3,
}: {
  line1: string;
  line2: string;
  line3: string;
}) {
  const [phase, setPhase] = useState<"preloader" | "reveal" | "done">("preloader");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 2000);
    const t2 = setTimeout(() => setPhase("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const videoSrc = "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4";

  return (
    <>
      {/* ═══ PRELOADER ═══ */}
      <div
        className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase !== "preloader" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className={`text-center transition-all duration-700 ${
          phase !== "preloader" ? "scale-[0.9] opacity-0" : "scale-100 opacity-100"
        }`}>
          <div className="text-white text-2xl md:text-3xl font-light tracking-[0.05em]">
            Syrena Creative<span className="align-super text-[9px] ml-0.5">®</span>
          </div>
          <div className="mt-8 w-40 h-px bg-white/[0.06] mx-auto overflow-hidden">
            <div className="h-full bg-accent animate-loading-bar" />
          </div>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out ${
              phase === "done" ? "scale-100" : "scale-110"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Film grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-10 pt-20">
          <div className="max-w-[90vw] mx-auto">
            <h1 className="text-white leading-[0.92] tracking-[-0.04em]">
              {[line1, line2, line3].map((line, i) => (
                <span
                  key={i}
                  className={`block text-[12vw] md:text-[8.5vw] font-semibold transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === 2 ? "italic text-accent" : ""
                  } ${
                    phase === "done"
                      ? "opacity-100 translate-y-0 blur-0"
                      : "opacity-0 translate-y-24 blur-[2px]"
                  }`}
                  style={{ transitionDelay: phase === "done" ? `${i * 150}ms` : "0ms" }}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Location tag */}
            <div
              className={`mt-16 flex items-center gap-4 transition-all duration-[1s] ease-out ${
                phase === "done" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: phase === "done" ? "600ms" : "0ms" }}
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/50 text-xs tracking-[0.2em] uppercase">
                Creative Studio — Warsaw, Poland
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-all duration-700 ${
            phase === "done" ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: phase === "done" ? "1000ms" : "0ms" }}
        >
          <div className="w-px h-20 bg-white/20 animate-pulse-line" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}
