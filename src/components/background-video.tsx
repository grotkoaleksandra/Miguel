"use client";

import { useEffect, useRef, useCallback } from "react";

export function BackgroundVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = wrapRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Fade out between 0.5vh and 1vh of scroll
      const opacity = Math.max(0, 1 - (scrollY - vh * 0.3) / (vh * 0.5));
      el.style.opacity = `${opacity}`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-0 overflow-hidden" style={{ willChange: "opacity" }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/1918465/1918465-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
