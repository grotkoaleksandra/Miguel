"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1600);
    const t2 = setTimeout(() => setPhase("done"), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const showText = phase === "reveal" || phase === "done";

  return (
    <>
      {/* ═══ PRELOADER ═══ */}
      <div
        className="fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center pointer-events-none"
        style={{
          opacity: phase === "preloader" ? 1 : 0,
          transition: "opacity 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className={`text-center transition-all duration-500 ${
          phase !== "preloader" ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}>
          <div className="text-white/60 text-[11px] tracking-[0.35em] uppercase mb-8">
            Est. 2025
          </div>
          <div className="text-white text-2xl md:text-3xl tracking-[0.08em] font-light">
            Syrena Creative
          </div>
          <div className="mt-12 w-32 h-[1px] bg-white/10 mx-auto overflow-hidden">
            <div className="h-full bg-white/60 animate-loading-bar" />
          </div>
        </div>
      </div>

      {/* ═══ HERO CONTENT — transparent, sits over the layout background video ═══ */}
      <section className="relative z-[1] min-h-screen flex flex-col justify-between">
        {/* Main heading */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 pt-20">
          <div className="w-full max-w-[1800px] mx-auto">
            <h1 className="leading-[0.88] tracking-[-0.04em]">
              {[line1, line2, line3].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    className={`block text-[13vw] md:text-[9vw] text-white transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === 2
                        ? "font-display italic text-white/80"
                        : "font-light"
                    } ${
                      showText ? "translate-y-0" : "translate-y-[110%]"
                    }`}
                    style={{ transitionDelay: showText ? `${i * 120}ms` : "0ms" }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-6 md:px-12 lg:px-20 pb-8 md:pb-12">
          <div className="max-w-[1800px] mx-auto">
            <div
              className={`flex items-end justify-between border-t border-white/[0.1] pt-6 transition-all duration-[0.8s] ease-out ${
                phase === "done" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: phase === "done" ? "400ms" : "0ms" }}
            >
              <div className="flex items-center gap-6">
                <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
                  Creative Studio
                </span>
                <span className="text-white/20 text-[11px]">—</span>
                <span className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
                  Warsaw, Poland
                </span>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-[1px] h-8 bg-white/15" />
                <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase">
                  Scroll
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
