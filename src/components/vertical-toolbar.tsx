"use client";

import { useExperience } from "@/contexts/experience-context";

const sections = [
  { id: "work" as const, label: "Work" },
  { id: "services" as const, label: "Services" },
  { id: "about" as const, label: "About" },
  { id: "contact" as const, label: "Contact" },
];

export function VerticalToolbar() {
  const { entered, activeSection, setActiveSection } = useExperience();

  if (!entered) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 z-[60] w-16 md:w-20 flex flex-col items-center justify-center gap-8">
      {sections.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className="group relative flex flex-col items-center gap-2 cursor-pointer"
            data-cursor-hover
          >
            {/* Dot indicator */}
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                isActive ? "bg-white scale-100" : "bg-white/20 scale-75 group-hover:bg-white/50 group-hover:scale-100"
              }`}
            />
            {/* Label */}
            <span
              className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                isActive ? "text-white/80" : "text-white/20 group-hover:text-white/50"
              }`}
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
