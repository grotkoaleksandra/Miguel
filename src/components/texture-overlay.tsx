"use client";

import { useEffect, useRef, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
  strength: number;
}

export function TextureOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pre-render a static noise texture to an offscreen canvas
  const buildNoiseCanvas = useCallback((w: number, h: number) => {
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext("2d")!;
    const imageData = ctx.createImageData(w, h);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      // Dark speckles on light bg
      const dark = Math.random() < 0.5;
      if (dark) {
        d[i] = 0;
        d[i + 1] = 0;
        d[i + 2] = 0;
        d[i + 3] = Math.random() * 30 + 5; // 5-35 alpha — visible dark specks
      } else {
        d[i] = 255;
        d[i + 1] = 255;
        d[i + 2] = 255;
        d[i + 3] = Math.random() * 18 + 2; // lighter white specks
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return offscreen;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = 1; // keep at 1x for noise — higher DPR wastes perf
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      // Rebuild noise texture at new size
      noiseCanvasRef.current = buildNoiseCanvas(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const prev = mouseRef.current;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add trail point — scale strength by speed
      const strength = Math.min(dist / 6, 1);
      if (dist > 2) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          strength,
        });
        // Cap trail length for perf
        if (trailRef.current.length > 120) {
          trailRef.current.splice(0, 20);
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const maxTrailAge = 90;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 1. Draw static noise texture
      if (noiseCanvasRef.current) {
        ctx.drawImage(noiseCanvasRef.current, 0, 0);
      }

      // 2. Cursor spotlight — a bright warm area around cursor
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx > -500 && my > -500) {
        // Bright warm spotlight around cursor
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 260);
        g.addColorStop(0, "rgba(255, 255, 255, 0.35)");
        g.addColorStop(0.2, "rgba(255, 250, 240, 0.20)");
        g.addColorStop(0.5, "rgba(255, 245, 230, 0.08)");
        g.addColorStop(1, "rgba(255, 245, 230, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Trail — bright warm fading glow spots
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;

        if (p.age > maxTrailAge) {
          trail.splice(i, 1);
          continue;
        }

        const life = 1 - p.age / maxTrailAge;
        const easedLife = life * life;
        const alpha = easedLife * 0.28 * p.strength;
        const radius = 100 + (1 - life) * 80;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        g.addColorStop(0.4, `rgba(255, 248, 230, ${alpha * 0.5})`);
        g.addColorStop(1, "rgba(255, 245, 220, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [buildNoiseCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
    />
  );
}
