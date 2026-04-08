"use client";

import type { Dictionary } from "@/i18n/types";

const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&h=600&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=1200&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&h=600&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&h=1200&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&h=600&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&h=600&fit=crop",
};

// Alternate between landscape and portrait for visual rhythm
const aspectMap: Record<number, string> = {
  0: "aspect-[16/10]",
  1: "aspect-[3/4]",
  2: "aspect-[3/4]",
  3: "aspect-[16/10]",
  4: "aspect-[16/10]",
  5: "aspect-[3/4]",
};

export function ProjectsGrid({ dict }: { dict: Dictionary }) {
  const projects = dict.home.projects.list;

  return (
    <section className="px-6 md:px-12 lg:px-20 pb-24 md:pb-40">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between mb-12 md:mb-16">
          <h2 className="text-[#111]/30 text-[11px] tracking-[0.15em] uppercase">
            {dict.home.projects.title}
          </h2>
          <span className="text-[#111]/20 text-[12px]">{projects.length} projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-20">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`group cursor-pointer ${i % 2 === 1 ? "md:mt-24" : ""}`}
              data-cursor-hover
            >
              <div className={`relative overflow-hidden ${aspectMap[i] || "aspect-[16/10]"} bg-[#eeeee9]`}>
                <img
                  src={projectImages[p.title] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=600&fit=crop"}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[#111] text-[17px] font-medium mb-1">{p.title}</h3>
                  <span className="text-[#111]/30 text-[12px] tracking-[0.08em] uppercase">{p.category}</span>
                </div>
                <span className="text-[#111]/10 text-[13px] tracking-[0.08em] uppercase mt-1">
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
