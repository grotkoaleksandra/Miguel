"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen loading overlay with logo reveal, matching Stink Studios loader.
 * Fades out after content is ready.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "gone">("loading");

  useEffect(() => {
    // Show loader briefly, then exit
    const t1 = setTimeout(() => setPhase("exiting"), 1200);
    const t2 = setTimeout(() => setPhase("gone"), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      style={{
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: phase === "exiting" ? "none" : "auto",
        cursor: "progress",
      }}
    >
      {/* Logo wordmark */}
      <div
        className="text-center"
        style={{
          opacity: phase === "loading" ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          className="text-white font-bold tracking-[-0.03em] uppercase leading-[0.9]"
          style={{ fontSize: "clamp(24px, 4vw, 48px)", fontFamily: "'Helvetica Neue', Helvetica, sans-serif" }}
        >
          Syrena
          <br />
          Creative
        </div>
      </div>
    </div>
  );
}
