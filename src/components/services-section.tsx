"use client";

import type { Dictionary } from "@/i18n/types";

/**
 * Services displayed like a news/press feed — dividers, monospace dates, serif titles.
 */
export function ServicesSection({ dict }: { dict: Dictionary }) {
  const services = dict.home.services.list;

  return (
    <section className="bg-black text-white" style={{ paddingTop: 20, paddingBottom: 60 }}>
      <div className="mx-auto px-5">
        {/* Top divider */}
        <div className="divider" />

        {services.map((s, i) => (
          <div key={s.title}>
            <div
              className="grid grid-cols-12 gap-x-5 group cursor-default"
              style={{ paddingTop: 30, paddingBottom: 30 }}
            >
              {/* Number / label (left) */}
              <div className="col-span-12 md:col-span-3">
                <span className="type-caption text-white/50">
                  {String(i + 1).padStart(2, "0")} — Service
                </span>
              </div>

              {/* Title (right) */}
              <div className="col-span-12 md:col-span-9 mt-2 md:mt-0">
                <h3
                  className="text-white group-hover:underline group-hover:underline-offset-[0.08em] group-hover:decoration-1"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(23px, 3.5vw, 52px)",
                    lineHeight: "1.15em",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.title}
                </h3>
                <p className="type-caption text-white/40 mt-5">{s.description}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="divider" />
          </div>
        ))}
      </div>
    </section>
  );
}
