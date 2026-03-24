"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) {
      setHidden(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseEnterInteractive = () => setHovering(true);
    const onMouseLeaveInteractive = () => setHovering(false);
    const onMouseLeaveWindow = () => setHidden(true);
    const onMouseEnterWindow = () => setHidden(false);

    // Smooth follower animation
    let raf: number;
    const animateFollower = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.08;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.08;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animateFollower);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    // Track interactive elements
    const interactiveSelectors = "a, button, [data-cursor-hover], input, textarea";
    const addListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    raf = requestAnimationFrame(animateFollower);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-out ${
            hovering ? "w-4 h-4 opacity-50" : "w-2 h-2 opacity-100"
          }`}
        />
      </div>
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-all duration-500 ease-out ${
            hovering
              ? "w-16 h-16 opacity-100 scale-100"
              : "w-10 h-10 opacity-40 scale-100"
          }`}
        />
      </div>
    </>
  );
}
