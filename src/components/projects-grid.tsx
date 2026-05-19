"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";

type Project = Dictionary["home"]["projects"]["list"][number];

// Pexels stock — verified hotlink-friendly URLs (HD 1080p variants).
// Filenames mirror predictable scheme — drop in real hero assets later (e.g. /Miguel/videos/syrena-chocolate-hero.mp4).
const projectMedia: Record<string, { video: string; poster: string }> = {
  "Syrena Travel": {
    video: "https://videos.pexels.com/video-files/853874/853874-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/853874/free-video-853874.jpg?w=1600",
  },
  "Syrena Chocolate": {
    video: "https://videos.pexels.com/video-files/3209211/3209211-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/3209211/free-video-3209211.jpg?w=1600",
  },
  "Max Kennedy": {
    video: "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/3129957/free-video-3129957.jpg?w=1600",
  },
  "Seven Questions Warsaw": {
    video: "https://videos.pexels.com/video-files/1739010/1739010-hd_1920_1080_30fps.mp4",
    poster: "https://images.pexels.com/videos/1739010/free-video-1739010.jpg?w=1600",
  },
  "Monster Man": {
    video: "https://videos.pexels.com/video-files/856967/856967-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/856967/free-video-856967.jpg?w=1600",
  },
  "Thumbs Up": {
    video: "https://videos.pexels.com/video-files/855414/855414-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/855414/free-video-855414.jpg?w=1600",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleClose = useCallback(() => {
    const i = openIndex;
    setOpenIndex(null);
    // Return focus to the card that opened the modal.
    if (i !== null) {
      requestAnimationFrame(() => {
        triggerRefs.current[i]?.focus();
      });
    }
  }, [openIndex]);

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
              ref={(el) => { triggerRefs.current[i] = el; }}
              project={p}
              index={i}
              layout={layouts[i % layouts.length]}
              onOpen={() => setOpenIndex(i)}
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

      {openIndex !== null && (
        <ProjectModal
          project={projects[openIndex]}
          index={openIndex}
          onClose={handleClose}
        />
      )}
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  layout: { col: string; aspect: number };
  onOpen: () => void;
};

const ProjectCard = ({ ref, project, index, layout, onOpen }: ProjectCardProps & { ref?: (el: HTMLDivElement | null) => void }) => {
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

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  const media = projectMedia[project.title];
  const stagger = (index % 2) * 100;

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        if (ref) ref(el);
      }}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`Open project details: ${project.title}`}
      className={`col-span-12 ${layout.col} group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      onKeyDown={handleKey}
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
};

function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project;
  index: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = `project-modal-title-${index}`;
  const media = projectMedia[project.title];

  // Lock body scroll while open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  // Esc to close + focus trap.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Initial focus on close button.
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  const paragraphs = project.modalBody.split("\n\n");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch md:items-center md:justify-center bg-black/85 backdrop-blur-sm"
      style={{ animation: "fadeIn 200ms ease-out forwards" }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full md:h-auto md:max-h-[88vh] md:max-w-[920px] md:w-[92vw] bg-black text-white overflow-y-auto md:border md:border-white/10"
        style={{ animation: "fadeUp 320ms cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </button>

        {/* Media */}
        <div className="relative w-full bg-[#0a0a0a]" style={{ paddingTop: "56.25%" }}>
          {media && (
            <video
              src={media.video}
              poster={media.poster}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Body */}
        <div className="px-6 md:px-12 py-10 md:py-14">
          <div className="grid grid-cols-12 gap-x-5">
            <div className="col-span-12 md:col-span-1">
              <span className="type-caption text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="col-span-12 md:col-span-11">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-8">
                <h2 id={titleId} className="type-subtitle text-white">
                  {project.title}
                </h2>
                <span
                  className="type-caption text-white link-underline"
                  style={{ textDecorationColor: "rgba(255,255,255,0.5)" }}
                >
                  {project.category}
                </span>
                <span className="type-caption text-white/40">
                  {project.status}
                </span>
              </div>

              <div className="space-y-5 max-w-[640px]">
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="type-text text-white/85"
                    style={{ fontWeight: 300, lineHeight: 1.55 }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {project.contribution && (
                <>
                  <div className="divider mt-12 mb-5" />
                  <p className="type-caption text-white/55">
                    <span className="text-white/80">Vixen contribution — </span>
                    {project.contribution}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
