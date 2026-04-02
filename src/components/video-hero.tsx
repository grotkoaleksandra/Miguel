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
    const t1 = setTimeout(() => setPhase("reveal"), 2200);
    const t2 = setTimeout(() => setPhase("done"), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const videoSrc = "https://videos.pexels.com/video-files/3051492/3051492-hd_1920_1080_25fps.mp4";

  return (
    <>
      {/* ═══ PRELOADER ═══ */}
      <div
        className={`fixed inset-0 z-[100] bg-[#e8e8e8] flex items-center justify-center transition-all duration-[1s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          phase !== "preloader" ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className={`text-center transition-all duration-[800ms] ${
          phase !== "preloader" ? "scale-[0.95] opacity-0" : "scale-100 opacity-100"
        }`}>
          <div className="font-display text-foreground text-3xl md:text-4xl tracking-[0.02em] font-normal">
            Syrena Creative<span className="align-super text-[10px] ml-1">®</span>
          </div>
          <div className="mt-10 w-48 h-[1px] bg-foreground/[0.08] mx-auto overflow-hidden">
            <div className="h-full bg-foreground/40 animate-loading-bar" />
          </div>
          <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-muted/60">
            Loading
          </div>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-end overflow-hidden pb-16 md:pb-20">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === "done" ? "scale-100" : "scale-[1.05]"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-10">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-white leading-[0.92] tracking-[-0.03em]">
              {[line1, line2, line3].map((line, i) => (
                <span
                  key={i}
                  className={`block transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === 2 ? "font-display italic text-white/90" : "font-semibold"
                  } ${
                    i === 0 ? "text-[11vw] md:text-[7.5vw]" : ""
                  } ${
                    i === 1 ? "text-[11vw] md:text-[7.5vw]" : ""
                  } ${
                    i === 2 ? "text-[11vw] md:text-[7.5vw]" : ""
                  } ${
                    phase === "done"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-16"
                  }`}
                  style={{ transitionDelay: phase === "done" ? `${200 + i * 120}ms` : "0ms" }}
                >
                  {line}
                </span>
              ))}
            </h1>

            {/* Bottom bar */}
            <div
              className={`mt-16 flex items-center justify-between transition-all duration-[1s] ease-out ${
                phase === "done" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: phase === "done" ? "800ms" : "0ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="text-white/40 text-[11px] tracking-[0.25em] uppercase">
                  Creative Studio — Warsaw, Poland
                </span>
              </div>
              <span className="hidden md:block text-white/30 text-[11px] tracking-[0.25em] uppercase">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
