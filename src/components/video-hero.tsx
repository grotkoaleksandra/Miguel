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
  const [loaded, setLoaded] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Preloader sequence: show logo → fade out → reveal hero
    const preloaderTimer = setTimeout(() => setPreloaderDone(true), 1800);
    const contentTimer = setTimeout(() => setLoaded(true), 2200);
    return () => {
      clearTimeout(preloaderTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  // Stock showreel-style videos (free, no attribution required)
  // Swap these with your own showreel when ready
  const videos = [
    "https://cdn.pixabay.com/video/2024/08/01/224067_large.mp4",  // creative design work
    "https://cdn.pixabay.com/video/2023/10/09/184539_large.mp4",  // abstract digital
    "https://cdn.pixabay.com/video/2020/07/30/45684-445829912_large.mp4", // creative workspace
  ];

  const videoSrc = videos[0]; // Use first video, or randomize: videos[Math.floor(Math.random() * videos.length)]

  return (
    <>
      {/* ═══ PRELOADER ═══ */}
      <div
        className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-all duration-700 ${
          preloaderDone ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className={`text-center transition-all duration-700 ${
          preloaderDone ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}>
          <div className="text-white text-3xl md:text-4xl font-medium tracking-tight">
            Syrena Creative<span className="align-super text-[10px] ml-0.5">®</span>
          </div>
          {/* Loading bar */}
          <div className="mt-6 w-48 h-px bg-white/10 mx-auto overflow-hidden">
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
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Dark overlay so text is readable */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Subtle gradient at bottom for scroll transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-10 pt-20">
          <div className="max-w-[90vw] mx-auto">
            <h1 className="text-white leading-[0.9] tracking-tighter">
              <span
                className={`block text-[13vw] md:text-[9vw] font-semibold transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
              >
                {line1}
              </span>
              <span
                className={`block text-[13vw] md:text-[9vw] font-semibold transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {line2}
              </span>
              <span
                className={`block text-[13vw] md:text-[9vw] font-semibold italic transition-all duration-1000 ease-out ${
                  loaded ? "opacity-100 translate-y-0 text-accent" : "opacity-0 translate-y-16"
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
              <span className="text-white/60 text-sm tracking-widest uppercase">
                Creative Studio — Warsaw, Poland
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="w-px h-16 bg-white/30 animate-pulse-line" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            Scroll
          </span>
        </div>
      </section>
    </>
  );
}
