"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&h=900&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&h=900&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&h=900&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1600&h=900&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=900&fit=crop",
};

// Cinematic rhythm: each project in its own row with intentional offset.
// Wide → narrow-right → wide-left → narrow-right → wide-centered → narrow-left.
const layouts = [
  { col: "md:col-start-1 md:col-span-10", aspect: 56 },         // wide hero
  { col: "md:col-start-7 md:col-span-6",  aspect: 75 },         // narrow tall right
  { col: "md:col-start-2 md:col-span-7",  aspect: 60 },         // wide-ish left
  { col: "md:col-start-8 md:col-span-5",  aspect: 75 },         // narrow tall right
  { col: "md:col-start-3 md:col-span-8",  aspect: 56 },         // centered wide
  { col: "md:col-start-1 md:col-span-6",  aspect: 70 },         // narrow left
];

export function ProjectsGrid({ dict }: { dict: Dictionary }) {
  const projects = dict.home.projects.list;

  return (
    <section className="bg-black text-white" style={{ paddingTop: 180, paddingBottom: 120 }}>
      <div className="mx-auto px-5 md:px-5">
        <div className="grid grid-cols-12 gap-x-5" style={{ rowGap: 180 }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              layout={layouts[i % layouts.length]}
            />
          ))}
        </div>

        <div className="divider mt-32 mb-5" />

        <div className="flex justify-end">
          <span className="type-text text-white opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
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
  layout,
}: {
  project: { title: string; category: string; description: string; image: string; status: string };
  index: number;
  layout: { col: string; aspect: number };
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);

  // Reveal once when entering viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll-linked parallax — image drifts vertically as the card moves through viewport
  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const card = cardRef.current;
      const img = imgRef.current;
      if (!card || !img) return;

      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: -1 when below viewport, 0 when centered, 1 when above
      const progress = ((rect.top + rect.height / 2) - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      const translateY = clamped * -40; // ±40px parallax range
      img.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.15)`;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const stagger = (index % 3) * 100; // small stagger so adjacent reveals don't sync

  return (
    <div
      ref={cardRef}
      className={`col-span-12 ${layout.col} group cursor-pointer`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 1s ease ${stagger}ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}ms`,
      }}
    >
      <div
        className="relative overflow-hidden bg-[#0a0a0a]"
        style={{ paddingTop: `${layout.aspect}%` }}
      >
        <img
          ref={imgRef}
          src={projectImages[project.title] || project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: "translate3d(0,0,0) scale(1.15)" }}
          loading="lazy"
        />
        {/* Subtle vignette on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-700" />
      </div>

      <div className="mt-5 flex flex-col">
        <h3 className="type-subtitle text-white">
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            {project.title}
          </span>
        </h3>
        <p className="type-text text-white/80 mt-[0.2em]" style={{ fontWeight: 300 }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-5 mt-5">
          <span className="type-caption text-white link-underline" style={{ textDecorationColor: "rgba(255,255,255,0.5)" }}>
            {project.category}
          </span>
          <span className="type-caption text-white/40">
            {project.status}
          </span>
        </div>
      </div>
    </div>
  );
}
