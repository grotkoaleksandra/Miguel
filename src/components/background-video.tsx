"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export function BackgroundVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [hidden, setHidden] = useState(false);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = wrapRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / (vh * 0.8), 1);
      el.style.opacity = `${1 - progress}`;
      // Fully hide once scrolled past hero
      setHidden(progress >= 1);
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
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ willChange: "opacity", display: hidden ? "none" : "block" }}
    >
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
