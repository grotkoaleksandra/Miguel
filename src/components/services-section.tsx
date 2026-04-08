"use client";

import type { Dictionary } from "@/i18n/types";

export function ServicesSection({ dict }: { dict: Dictionary }) {
  const services = dict.home.services.list;

  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left column */}
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-4">
              {dict.home.services.title}
            </h2>
            <p className="text-white/35 text-[14px] leading-relaxed max-w-sm">
              From the thinking to the making, we handle everything in-house.
            </p>
          </div>

          {/* Right column — service list */}
          <div>
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group border-b border-white/[0.08] py-6 md:py-8 flex items-start justify-between gap-8 cursor-default"
              >
                <div className="flex items-start gap-5">
                  <span className="text-white/15 text-[12px] font-mono mt-1 w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-white text-[17px] md:text-[19px] font-medium group-hover:translate-x-1 transition-transform duration-500">
                      {s.title}
                    </h3>
                    <p className="text-white/30 text-[13px] mt-1 max-w-md">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
