"use client";

import { useExperience } from "@/contexts/experience-context";

/**
 * CSS 3D octahedron that rotates with the mouse.
 * 8 triangular faces using clip-path, translucent with subtle borders.
 */
export function Centerpiece() {
  const { entered, mouse } = useExperience();

  // Map mouse to rotation (-15 to 15 degrees)
  const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
  const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
  const rotY = ((mouse.x / vw) - 0.5) * 30;
  const rotX = ((mouse.y / vh) - 0.5) * -30;

  if (!entered) return null;

  const size = 140; // half-size of the octahedron
  const faces = [
    // Top 4 faces
    { vertices: "50% 0%, 100% 50%, 50% 50%", rx: -35, ry: 45, tz: 0 },
    { vertices: "50% 0%, 50% 50%, 0% 50%", rx: -35, ry: -45, tz: 0 },
    { vertices: "50% 0%, 0% 50%, 50% 50%", rx: -35, ry: -135, tz: 0 },
    { vertices: "50% 0%, 50% 50%, 100% 50%", rx: -35, ry: 135, tz: 0 },
    // Bottom 4 faces
    { vertices: "50% 100%, 100% 50%, 50% 50%", rx: 35, ry: 45, tz: 0 },
    { vertices: "50% 100%, 50% 50%, 0% 50%", rx: 35, ry: -45, tz: 0 },
    { vertices: "50% 100%, 0% 50%, 50% 50%", rx: 35, ry: -135, tz: 0 },
    { vertices: "50% 100%, 50% 50%, 100% 50%", rx: 35, ry: 135, tz: 0 },
  ];

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <div
        className="relative"
        style={{
          width: size * 2,
          height: size * 2,
          perspective: "1200px",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: "transform 0.1s ease-out",
            animation: "slowSpin 40s linear infinite",
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                clipPath: `polygon(${face.vertices})`,
                transform: `rotateX(${face.rx}deg) rotateY(${face.ry}deg) translateZ(${size * 0.7}px)`,
                background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))`,
                border: "1px solid rgba(255,255,255,0.06)",
                backfaceVisibility: "hidden",
              }}
            />
          ))}

          {/* Wireframe edges for more definition */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <div
              key={`edge-${deg}`}
              className="absolute top-1/2 left-1/2 w-[1px] origin-bottom"
              style={{
                height: size,
                background: "rgba(255,255,255,0.04)",
                transform: `translate(-50%, -100%) rotateY(${deg}deg) rotateX(-55deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
