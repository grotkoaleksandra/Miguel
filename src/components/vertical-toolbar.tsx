"use client";

import { useExperience } from "@/contexts/experience-context";

const menuItems = [
  { id: "work" as const, label: "Work", x: -280, y: -160, align: "right" as const },
  { id: "services" as const, label: "Services", x: 240, y: -120, align: "left" as const },
  { id: "about" as const, label: "About", x: -220, y: 150, align: "right" as const },
  { id: "contact" as const, label: "Contact", x: 260, y: 130, align: "left" as const },
];

export function VerticalToolbar() {
  const { entered, activeSection, setActiveSection } = useExperience();

  if (!entered) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
      {menuItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className="absolute pointer-events-auto group cursor-pointer flex items-center gap-3"
            style={{
              transform: `translate(${item.x}px, ${item.y}px)`,
            }}
            data-cursor-hover
          >
            {item.align === "right" ? (
              <>
                <span
                  className={`text-[11px] tracking-[0.2em] uppercase transition-all duration-700 ${
                    isActive
                      ? "text-[#1a1a1a]/90"
                      : "text-[#1a1a1a]/30 group-hover:text-[#1a1a1a]/60 group-hover:tracking-[0.3em]"
                  }`}
                >
                  {item.label}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className={`block h-[1px] transition-all duration-700 ${
                      isActive ? "w-8 bg-[#1a1a1a]/40" : "w-4 bg-[#1a1a1a]/10 group-hover:w-8 group-hover:bg-[#1a1a1a]/30"
                    }`}
                  />
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      isActive ? "bg-[#1a1a1a] scale-100" : "bg-[#1a1a1a]/20 scale-75 group-hover:bg-[#1a1a1a]/60 group-hover:scale-100"
                    }`}
                  />
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      isActive ? "bg-[#1a1a1a] scale-100" : "bg-[#1a1a1a]/20 scale-75 group-hover:bg-[#1a1a1a]/60 group-hover:scale-100"
                    }`}
                  />
                  <span
                    className={`block h-[1px] transition-all duration-700 ${
                      isActive ? "w-8 bg-[#1a1a1a]/40" : "w-4 bg-[#1a1a1a]/10 group-hover:w-8 group-hover:bg-[#1a1a1a]/30"
                    }`}
                  />
                </span>
                <span
                  className={`text-[11px] tracking-[0.2em] uppercase transition-all duration-700 ${
                    isActive
                      ? "text-[#1a1a1a]/90"
                      : "text-[#1a1a1a]/30 group-hover:text-[#1a1a1a]/60 group-hover:tracking-[0.3em]"
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
