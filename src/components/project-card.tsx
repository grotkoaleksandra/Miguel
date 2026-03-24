"use client";

import { useRef, useState } from "react";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
}

// Curated Unsplash images that represent each project type
const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=800&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=800&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=800&fit=crop",
};

export function ProjectCard({
  project,
  index,
  variant = "default",
}: {
  project: Project;
  index: number;
  variant?: "default" | "featured" | "horizontal";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const imageUrl = projectImages[project.title] || `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop`;

  const isHorizontal = variant === "horizontal";
  const isFeatured = variant === "featured";

  if (isHorizontal) {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="flex-shrink-0 w-[70vw] md:w-[45vw] group cursor-pointer"
        data-cursor-hover
      >
        <div
          className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5] rounded-sm"
          style={{
            transform: `perspective(1200px) rotateX(${-mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <img
            src={imageUrl}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

          {/* Number watermark */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <span className="text-white/30 text-sm font-mono tracking-wider">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Status */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <span
              className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md ${
                project.status === "In Progress"
                  ? "bg-white/20 text-white"
                  : "bg-white/10 text-white/60"
              }`}
            >
              {project.status}
            </span>
          </div>

          {/* Bottom info on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <span className="text-white/60 text-xs tracking-[0.15em] uppercase">{project.category}</span>
            <p className="text-white/80 text-sm mt-2 max-w-sm leading-relaxed">{project.description}</p>
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-lg mt-1">
            →
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={`group cursor-pointer ${isFeatured ? "col-span-full" : ""}`}
      data-cursor-hover
    >
      <div
        className={`relative overflow-hidden rounded-sm ${
          isFeatured ? "aspect-[21/9]" : "aspect-[4/3]"
        }`}
        style={{
          transform: `perspective(1200px) rotateX(${-mousePos.y * 0.2}deg) rotateY(${mousePos.x * 0.2}deg)`,
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src={imageUrl}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

        {/* Number watermark */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <span className="text-white/30 text-sm font-mono tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-6 md:p-8 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div>
            <span className="text-white/60 text-xs tracking-[0.15em] uppercase">{project.category}</span>
            <p className="text-white/80 text-sm mt-2 max-w-md leading-relaxed">{project.description}</p>
          </div>
        </div>

        {/* Status */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <span
            className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur-md ${
              project.status === "In Progress"
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/60"
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <span className="text-[10px] tracking-[0.15em] uppercase text-muted whitespace-nowrap mt-2 border border-border rounded-full px-3 py-1">
          {project.category}
        </span>
      </div>
    </div>
  );
}
