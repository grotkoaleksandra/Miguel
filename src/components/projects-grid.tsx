"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=700&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=700&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=700&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=700&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=700&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=700&fit=crop",
};

/**
 * Asymmetric staggered project grid on black bg.
 * Grid positions alternate: full-width, left/right split, wide left, wide right.
 */

// Grid column assignments matching Stink Studios asymmetric layout
const gridPositions = [
  "col-span-12",                          // 1: full width
  "col-span-12 md:col-span-5",            // 2: left narrow
  "col-span-12 md:col-span-7",            // 3: right wide
  "col-span-12 md:col-span-9",            // 4: wide left
  "col-span-12 md:col-span-7",            // 5: medium left
  "col-span-12 md:col-span-5 md:col-start-8", // 6: right narrow
];

export function ProjectsGrid({ dict }: { dict: Dictionary }) {
  const projects = dict.home.projects.list;

  return (
    <section className="bg-black text-white" style={{ paddingTop: 180, paddingBottom: 120 }}>
      <div className="mx-auto px-5 md:px-5">
        {/* Project grid */}
        <div className="grid grid-cols-12 gap-x-5 gap-y-16">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              gridClass={gridPositions[i] || "col-span-12 md:col-span-6"}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="divider mt-16 mb-5" />

        {/* All projects link */}
        <div className="flex justify-end">
          <span
            className="type-text text-white opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            {dict.home.projects.viewAll} →
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  gridClass,
}: {
  project: { title: string; category: string; description: string; image: string; status: string };
  index: number;
  gridClass: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${gridClass} group cursor-pointer`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#111]" style={{ paddingTop: "56.25%" }}>
        <img
          src={projectImages[project.title] || project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h3 className="type-subtitle text-white mt-5 group-hover:underline group-hover:underline-offset-[0.08em] group-hover:decoration-1">
        {project.title}
      </h3>

      {/* Subtitle */}
      <p className="type-text text-white mt-[0.2em]" style={{ fontWeight: 300 }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-x-5 mt-5">
        <span className="type-caption text-white link-underline" style={{ textDecorationColor: "rgba(255,255,255,0.5)" }}>
          {project.category}
        </span>
        <span className="type-caption text-white/40">
          {project.status}
        </span>
      </div>
    </div>
  );
}
