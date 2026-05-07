"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=800&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=800&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=800&fit=crop",
};

/**
 * Editorial index list — each project is a row of text. Hovering reveals
 * a floating image preview that tracks the cursor.
 */
export function ProjectsGrid({ dict }: { dict: Dictionary }) {
  const projects = dict.home.projects.list;
  const [hovered, setHovered] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
      style={{ paddingTop: 180, paddingBottom: 180 }}
    >
      <div className="px-5 md:px-10">
        {/* Section label */}
        <div className="grid grid-cols-12 gap-x-5 mb-16">
          <div className="col-span-12 md:col-span-3">
            <span className="type-caption text-white/50">Selected Work — {String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Project list */}
        <ul className="border-t border-white/15">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.title}
              project={p}
              index={i}
              isHovered={hovered === p.title}
              onHover={(h) => setHovered(h ? p.title : null)}
            />
          ))}
        </ul>
      </div>

      {/* Floating hover preview — follows cursor */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
        style={{
          transform: `translate3d(${cursor.x + (sectionRef.current?.getBoundingClientRect().left ?? 0)}px, ${cursor.y + (sectionRef.current?.getBoundingClientRect().top ?? 0)}px, 0) translate(-50%, -50%)`,
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {projects.map((p) => (
          <img
            key={p.title}
            src={projectImages[p.title] || p.image}
            alt=""
            aria-hidden
            className="absolute top-0 left-0 object-cover"
            style={{
              width: 420,
              height: 280,
              transform: "translate(-50%, -50%)",
              opacity: hovered === p.title ? 1 : 0,
              transition: "opacity 0.5s ease",
              willChange: "opacity",
            }}
          />
        ))}
      </div>

      {/* All projects link */}
      <div className="px-5 md:px-10 mt-16">
        <div className="flex justify-end">
          <span className="type-text text-white opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
            {dict.home.projects.viewAll} →
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isHovered,
  onHover,
}: {
  project: { title: string; category: string; description: string; image: string; status: string };
  index: number;
  isHovered: boolean;
  onHover: (h: boolean) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className="border-b border-white/15 group cursor-pointer"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${index * 80}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms`,
      }}
    >
      <div className="grid grid-cols-12 gap-x-5 items-baseline py-8 md:py-10">
        {/* Index number */}
        <div className="col-span-2 md:col-span-1">
          <span className="type-caption text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-10 md:col-span-6">
          <h3
            className="font-medium uppercase tracking-[-0.02em] leading-[0.9] transition-colors duration-500"
            style={{
              fontSize: "clamp(28px, 5vw, 64px)",
              fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
              color: isHovered ? "#ffffff" : "rgba(255,255,255,0.6)",
            }}
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
              {project.title}
            </span>
          </h3>
        </div>

        {/* Category */}
        <div className="hidden md:block md:col-span-3">
          <span className="type-caption text-white/50">{project.category}</span>
        </div>

        {/* Status / arrow */}
        <div className="hidden md:flex md:col-span-2 items-baseline justify-end gap-3">
          <span className="type-caption text-white/30">{project.status}</span>
          <span
            className="text-white/40 transition-all duration-500 group-hover:text-white group-hover:translate-x-1"
            style={{ fontSize: "18px" }}
          >
            →
          </span>
        </div>
      </div>
    </li>
  );
}
