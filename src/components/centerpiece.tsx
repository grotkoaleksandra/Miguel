"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/contexts/experience-context";

/**
 * CSS 3D wireframe torus that smoothly turns toward the mouse.
 * Uses rAF for buttery interpolation — no CSS animation override.
 */
export function Centerpiece() {
  const { entered, mouse } = useExperience();
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRot = useRef({ x: -20, y: 0 });
  const baseAngle = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!entered) return;
    const el = containerRef.current;
    if (!el) return;

    const animate = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Mouse-driven target: ±60° range so the turn is obvious
      const targetY = ((mouse.x / vw) - 0.5) * 120;
      const targetX = ((mouse.y / vh) - 0.5) * -60;

      // Slow base drift (0.15°/frame ≈ full rotation in ~40s)
      baseAngle.current += 0.15;

      // Smooth interpolation toward target
      currentRot.current.x += (targetX - 20 - currentRot.current.x) * 0.06;
      currentRot.current.y += (targetY + baseAngle.current - currentRot.current.y) * 0.06;

      el.style.transform = `rotateX(${currentRot.current.x}deg) rotateY(${currentRot.current.y}deg)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [entered, mouse]);

  if (!entered) return null;

  const R = 120;
  const r = 50;
  const slices = 24;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div
        style={{
          width: (R + r) * 2,
          height: (R + r) * 2,
          perspective: "1400px",
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: "rotateX(-20deg) rotateY(0deg)",
          }}
        >
          {/* Longitudinal rings */}
          {Array.from({ length: slices }).map((_, i) => {
            const angle = (360 / slices) * i;
            return (
              <div
                key={`lon-${i}`}
                className="absolute"
                style={{
                  width: r * 2,
                  height: r * 2,
                  top: "50%",
                  left: "50%",
                  marginTop: -r,
                  marginLeft: -r,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.12)",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateX(${R}px)`,
                }}
              />
            );
          })}

          {/* Latitudinal rings */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i;
            const offsetY = Math.sin((angle * Math.PI) / 180) * r;
            const ringR = R + Math.cos((angle * Math.PI) / 180) * r;
            return (
              <div
                key={`lat-${i}`}
                className="absolute"
                style={{
                  width: ringR * 2,
                  height: ringR * 2,
                  top: "50%",
                  left: "50%",
                  marginTop: -ringR,
                  marginLeft: -ringR,
                  borderRadius: "50%",
                  border: "1px solid rgba(0,0,0,0.08)",
                  transform: `rotateX(90deg) translateZ(${offsetY}px)`,
                }}
              />
            );
          })}

          {/* Accent highlight ring */}
          <div
            className="absolute"
            style={{
              width: R * 2,
              height: R * 2,
              top: "50%",
              left: "50%",
              marginTop: -R,
              marginLeft: -R,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.18)",
              transform: "rotateX(90deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
