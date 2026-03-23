"use client";

import { useRef, useState } from "react";

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
}

export function ProjectCard({
  project,
  index,
  variant = "default",
}: {
  project: Project;
  index: number;
  variant?: "default" | "featured";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const colors = [
    "from-red-500/20 to-orange-500/10",
    "from-blue-500/20 to-purple-500/10",
    "from-emerald-500/20 to-teal-500/10",
    "from-amber-500/20 to-yellow-500/10",
    "from-pink-500/20 to-rose-500/10",
    "from-indigo-500/20 to-violet-500/10",
  ];

  const isFeatured = variant === "featured";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer ${isFeatured ? "col-span-full" : ""}`}
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden bg-neutral-950 ${
          isFeatured ? "aspect-[21/9]" : "aspect-[4/3]"
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} transition-all duration-700 group-hover:scale-110`}
        />

        {/* Floating number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[15vw] md:text-[8vw] font-bold text-white/[0.04] group-hover:text-white/[0.08] transition-all duration-700 group-hover:scale-110">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Hover overlay with project name */}
        <div className="absolute inset-0 flex items-end p-6 md:p-8 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white text-lg md:text-xl font-medium">
            View project →
          </span>
        </div>

        {/* Status */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <span
            className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm ${
              project.status === "In Progress"
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/70"
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-medium group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted mt-1.5 max-w-md">
            {project.description}
          </p>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted whitespace-nowrap mt-2 border border-border rounded-full px-3 py-1">
          {project.category}
        </span>
      </div>
    </div>
  );
}
