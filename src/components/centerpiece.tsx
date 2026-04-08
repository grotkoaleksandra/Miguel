"use client";

import { useExperience } from "@/contexts/experience-context";

/**
 * CSS 3D wireframe torus (donut) that rotates with the mouse.
 * Built from circular ring slices arranged around a central axis.
 */
export function Centerpiece() {
  const { entered, mouse } = useExperience();

  if (!entered) return null;

  const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
  const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
  const rotY = ((mouse.x / vw) - 0.5) * 40;
  const rotX = ((mouse.y / vh) - 0.5) * -40;

  const R = 120; // major radius (center of hole to center of tube)
  const r = 50;  // minor radius (tube thickness)
  const slices = 24; // number of rings around the donut

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
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX - 20}deg) rotateY(${rotY}deg)`,
            transition: "transform 0.15s ease-out",
            animation: "torusDrift 30s linear infinite",
          }}
        >
          {/* Longitudinal rings — slices through the donut */}
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
                  border: "1px solid rgba(255,255,255,0.07)",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateX(${R}px)`,
                }}
              />
            );
          })}

          {/* Latitudinal rings — circles going around the tube */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i;
            // Each lat ring is a circle of radius R, offset by r in the tube direction
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
                  border: "1px solid rgba(255,255,255,0.05)",
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
              border: "1px solid rgba(255,255,255,0.12)",
              transform: "rotateX(90deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
