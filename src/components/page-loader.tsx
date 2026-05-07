"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const TARGET_LINE1 = "SYRENA";
const TARGET_LINE2 = "CREATIVE";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+÷×≈∆∑∏Ω§†‡¶©®™";

/**
 * Full-screen loader — random symbols scramble rapidly, then resolve
 * letter-by-letter into "SYRENA CREATIVE". Once resolved, fades out.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<"scramble" | "exiting" | "gone">("scramble");
  const [line1, setLine1] = useState(() => randomString(TARGET_LINE1.length));
  const [line2, setLine2] = useState(() => randomString(TARGET_LINE2.length));
  const resolved1 = useRef(0);
  const resolved2 = useRef(0);
  const rafRef = useRef(0);
  const startTime = useRef(0);

  const animate = useCallback(() => {
    const now = Date.now();
    const elapsed = now - startTime.current;

    // Phase timing: 0-600ms pure scramble, 600-1800ms resolve letters one by one
    const SCRAMBLE_DURATION = 600;
    const RESOLVE_DURATION = 1200;
    const totalChars = TARGET_LINE1.length + TARGET_LINE2.length;

    if (elapsed < SCRAMBLE_DURATION) {
      // Pure random scramble
      setLine1(randomString(TARGET_LINE1.length));
      setLine2(randomString(TARGET_LINE2.length));
    } else if (elapsed < SCRAMBLE_DURATION + RESOLVE_DURATION) {
      // Resolve characters one by one
      const resolveProgress = (elapsed - SCRAMBLE_DURATION) / RESOLVE_DURATION;
      const charsToResolve = Math.floor(resolveProgress * totalChars);

      // Resolve line 1 first, then line 2
      const r1 = Math.min(charsToResolve, TARGET_LINE1.length);
      const r2 = Math.max(0, charsToResolve - TARGET_LINE1.length);
      resolved1.current = r1;
      resolved2.current = r2;

      setLine1(
        TARGET_LINE1.slice(0, r1) + randomString(TARGET_LINE1.length - r1)
      );
      setLine2(
        TARGET_LINE2.slice(0, r2) + randomString(TARGET_LINE2.length - r2)
      );
    } else {
      // Fully resolved
      setLine1(TARGET_LINE1);
      setLine2(TARGET_LINE2);
      // Start exit
      setTimeout(() => setPhase("exiting"), 400);
      setTimeout(() => setPhase("gone"), 1000);
      return; // Stop animation loop
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    startTime.current = Date.now();
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center overflow-hidden"
      style={{
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "exiting" ? "none" : "auto",
        cursor: "progress",
      }}
    >
      <div
        className="w-full px-3 md:px-4 text-white font-bold uppercase select-none leading-[0.82] tracking-[-0.05em]"
        style={{
          fontSize: "clamp(80px, 18vw, 350px)",
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        <div>{line1}</div>
        <div>{line2}</div>
      </div>
    </div>
  );
}

function randomString(len: number): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return s;
}
