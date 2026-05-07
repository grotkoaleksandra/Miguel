"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

// Pexels stock — verified hotlink-friendly URLs (HD 1080p variants).
const projectMedia: Record<string, { video: string; poster: string }> = {
  "Syrena Travel": {
    video: "https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/853874/free-video-853874.jpg?w=1600",
  },
  "Max Kennedy": {
    video: "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/3129957/free-video-3129957.jpg?w=1600",
  },
  "Yoga Studio": {
    video: "https://videos.pexels.com/video-files/856967/856967-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/856967/free-video-856967.jpg?w=1600",
  },
  "Massage Therapist": {
    video: "https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/3209211/free-video-3209211.jpg?w=1600",
  },
  "Art Marketplace": {
    video: "https://videos.pexels.com/video-files/855414/855414-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/855414/free-video-855414.jpg?w=1600",
  },
  "Cultural Magazine": {
    video: "https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_30fps.mp4",
    poster: "https://images.pexels.com/videos/1739010/free-video-1739010.jpg?w=1600",
  },
};

// One project per row with intentional offset.
const layouts = [
  { col: "md:col-start-1 md:col-span-9",  aspect: 56 },
  { col: "md:col-start-7 md:col-span-6",  aspect: 75 },
  { col: "md:col-start-2 md:col-span-7",  aspect: 60 },
  { col: "md:col-start-8 md:col-span-5",  aspect: 75 },
  { col: "md:col-start-3 md:col-span-8",  aspect: 56 },
  { col: "md:col-start-1 md:col-span-6",  aspect: 70 },
];

export function ProjectsGrid({ dict }: { dict: Dictionary }) {
  const projects = dict.home.projects.list;

  return (
    <section className="bg-black text-white" style={{ paddingTop: 180, paddingBottom: 180 }}>
      <div className="px-5 md:px-10">
        {/* Section label */}
        <div className="grid grid-cols-12 gap-x-5 mb-20">
          <div className="col-span-12 md:col-span-3">
            <span className="type-caption text-white/50">
              Selected Work — {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-5" style={{ rowGap: 200 }}>
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    v.preload = "auto";
    const playPromise = v.play();
    if (playPromise) playPromise.catch(() => {});
  };

  const handleLeave = () => {
    setHovered(false);
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  const media = projectMedia[project.title];
  const stagger = (index % 2) * 100;

  return (
    <div
      ref={cardRef}
      className={`col-span-12 ${layout.col} group cursor-pointer`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
        {/* Poster image (always visible) */}
        <img
          src={media?.poster || project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hovered ? 0 : 1 }}
          loading="lazy"
        />

        {/* Video (plays on hover) */}
        <video
          ref={videoRef}
          src={media?.video}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Play indicator */}
        <div
          className="absolute bottom-5 right-5 flex items-center gap-2 type-caption text-white/80 transition-opacity duration-300"
          style={{ opacity: hovered ? 0 : 0.7 }}
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-white/80" />
          <span>Hover to play</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-12 gap-x-5">
        <div className="col-span-12 md:col-span-1">
          <span className="type-caption text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="col-span-12 md:col-span-7">
          <h3 className="type-subtitle text-white">
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              {project.title}
            </span>
          </h3>
          <p className="type-text text-white/70 mt-1" style={{ fontWeight: 300 }}>
            {project.description}
          </p>
        </div>
        <div className="col-span-6 md:col-span-2 mt-3 md:mt-0">
          <span className="type-caption text-white link-underline" style={{ textDecorationColor: "rgba(255,255,255,0.5)" }}>
            {project.category}
          </span>
        </div>
        <div className="col-span-6 md:col-span-2 mt-3 md:mt-0 md:text-right">
          <span className="type-caption text-white/40">{project.status}</span>
        </div>
      </div>
    </div>
  );
}
