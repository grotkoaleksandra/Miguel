"use client";

import { useEffect, useState } from "react";
import { useExperience } from "@/contexts/experience-context";

export function IntroGate() {
  const { entered, enter } = useExperience();
  const [phase, setPhase] = useState<"loading" | "ready" | "exiting" | "gone">("loading");

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (entered && phase !== "gone") {
      setPhase("exiting");
      const t = setTimeout(() => setPhase("gone"), 1200);
      return () => clearTimeout(t);
    }
  }, [entered, phase]);

  if (phase === "gone") return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-[#060a10] flex items-center justify-center cursor-pointer"
      onClick={() => phase === "ready" && enter()}
      style={{
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
        pointerEvents: phase === "exiting" ? "none" : "auto",
      }}
    >
      <div className="text-center">
        <div
          className={`transition-all duration-700 ${
            phase === "loading" ? "opacity-100" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="text-white/50 text-[10px] tracking-[0.4em] uppercase mb-8">Est. 2025</div>
          <div className="text-white text-2xl md:text-3xl tracking-[0.08em] font-light">
            Syrena Creative
          </div>
          <div className="mt-10 w-32 h-[1px] bg-white/10 mx-auto overflow-hidden">
            <div className="h-full bg-white/60 animate-loading-bar" />
          </div>
        </div>

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            phase === "ready" ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center">
            <div className="text-white text-2xl md:text-3xl tracking-[0.08em] font-light mb-12">
              Syrena Creative
            </div>
            <div className="group inline-flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/40 group-hover:scale-110 transition-all duration-700">
                <svg className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase group-hover:text-white/50 transition-colors duration-500">
                Enter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
