"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

type Project = Dictionary["home"]["projects"]["list"][number];

// Pexels stock — verified hotlink-friendly URLs (HD 1080p variants).
// Filenames mirror predictable scheme — drop in real hero assets later (e.g. /Miguel/videos/syrena-chocolate-hero.mp4).
const projectMedia: Record<string, { video: string; poster: string }> = {
  "Syrena Travel": {
    video: "https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/1409899/free-video-1409899.jpg?w=1600",
  },
  "Syrena Chocolate": {
    video: "https://videos.pexels.com/video-files/2324293/2324293-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/2324293/free-video-2324293.jpg?w=1600",
  },
  "TL App": {
    video: "/Miguel/tl-app.mp4",
    poster: "/Miguel/tl-app.jpg",
  },
  "Seven Questions Warsaw": {
    video: "https://videos.pexels.com/video-files/854100/854100-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/854100/free-video-854100.jpg?w=1600",
  },
  "Monster Man": {
    video: "https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_25fps.mp4",
    poster: "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?w=1600",
  },
  "Thumbs Up": {
    video: "https://videos.pexels.com/video-files/2519660/2519660-hd_1920_1080_24fps.mp4",
    poster: "https://images.pexels.com/videos/2519660/free-video-2519660.jpg?w=1600",
  },
};

// Editorial spread: image + caption per row, alternating sides.
// Uniform 16:10 aspect for cinematic-still feel; caption sits in the remaining ~3 cols.
const SPREAD_ASPECT = 62.5;

export function ProjectsGrid({ dict, viewAllHref }: { dict: Dictionary; viewAllHref?: string }) {
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

        <div className="flex flex-col" style={{ rowGap: 140 }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              ref={(el) => { triggerRefs.current[i] = el; }}
              project={p}
              index={i}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>

        <div className="divider mt-32 mb-5" />

        {viewAllHref && (
          <div className="flex justify-end">
            <Link
              href={viewAllHref}
              className="type-text text-white opacity-40 hover:opacity-100 transition-opacity duration-200"
            >
              {dict.home.projects.viewAll} →
            </Link>
          </div>
        )}
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
  onOpen: () => void;
};

const ProjectCard = ({ ref, project, index, onOpen }: ProjectCardProps & { ref?: (el: HTMLDivElement | null) => void }) => {
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
  const isEven = index % 2 === 1; // 0-indexed: 2nd, 4th, 6th projects flip sides

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
      className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      onKeyDown={handleKey}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: "opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="grid grid-cols-12 gap-x-5 items-end">
        {/* Image side */}
        <div className={`col-span-12 md:col-span-8 ${isEven ? "md:col-start-5 md:order-2" : "md:col-start-1 md:order-1"}`}>
          <div
            className="relative overflow-hidden bg-[#0a0a0a]"
            style={{ paddingTop: `${SPREAD_ASPECT}%` }}
          >
            <img
              src={media?.poster || project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              style={{ opacity: hovered ? 0 : 1 }}
              loading="lazy"
            />
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
            <div
              className="absolute bottom-5 right-5 flex items-center gap-2 type-caption text-white/80 transition-opacity duration-300"
              style={{ opacity: hovered ? 0 : 0.7 }}
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-white/80" />
              <span>Hover to play</span>
            </div>
          </div>
        </div>

        {/* Caption side — magazine-style metadata block */}
        <div className={`col-span-12 md:col-span-3 mt-6 md:mt-0 ${isEven ? "md:col-start-1 md:order-1 md:pr-4" : "md:col-start-10 md:order-2 md:pl-4"}`}>
          <span className="type-caption text-white/40 block">
            {String(index + 1).padStart(2, "0")} / 06
          </span>
          <h3
            className="text-white mt-3"
            style={{
              fontFamily: '"Times New Roman", serif',
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 2.6vw, 38px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              {project.title}
            </span>
          </h3>
          <p
            className="type-text text-white/70 mt-4"
            style={{ fontWeight: 300, fontSize: "15px", lineHeight: 1.5 }}
          >
            {project.description}
          </p>
          <div className="divider mt-8 mb-3" style={{ background: "rgba(255,255,255,0.18)" }} />
          <div className="flex items-baseline justify-between gap-3">
            <span
              className="type-caption text-white"
              style={{ textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.4)", textUnderlineOffset: "0.2em" }}
            >
              {project.category}
            </span>
            <span className="type-caption text-white/40">{project.status}</span>
          </div>
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
