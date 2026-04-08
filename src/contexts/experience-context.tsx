"use client";

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react";

type Section = "work" | "services" | "about" | "contact" | null;

interface ExperienceCtx {
  entered: boolean;
  enter: () => void;
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  mouse: { x: number; y: number };
}

const Ctx = createContext<ExperienceCtx>({
  entered: false,
  enter: () => {},
  activeSection: null,
  setActiveSection: () => {},
  mouse: { x: 0, y: 0 },
});

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const toggle = (s: Section) => {
    setActiveSection((prev) => (prev === s ? null : s));
  };

  return (
    <Ctx.Provider value={{ entered, enter: () => setEntered(true), activeSection, setActiveSection: toggle, mouse }}>
      {children}
    </Ctx.Provider>
  );
}

export const useExperience = () => useContext(Ctx);
