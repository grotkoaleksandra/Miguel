"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HorizontalScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const updateScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = sectionHeight - viewportHeight;

      if (rect.top <= 0 && rect.bottom >= viewportHeight) {
        const progress = Math.abs(rect.top) / scrollableDistance;
        const trackWidth = track.scrollWidth - window.innerWidth;
        track.style.transform = `translateX(${-progress * trackWidth}px)`;
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div ref={trackRef} className="flex gap-8 pl-10 md:pl-20" style={{ willChange: "transform" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
