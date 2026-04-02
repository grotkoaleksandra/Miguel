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
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef<Point[]>([]);
  const rafRef = useRef<number>(0);
  const noiseDataRef = useRef<ImageData | null>(null);

  const generateNoise = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 18; // base grain opacity
    }
    return imageData;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Size canvas to window
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // cap for perf
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      // Regenerate noise at new size
      noiseDataRef.current = generateNoise(ctx, canvas.width, canvas.height);
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

      // Add trail points — more points when moving fast
      const strength = Math.min(dist / 8, 1);
      if (dist > 3) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          strength,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const maxTrailAge = 80; // frames before trail point dies

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw base noise texture
      if (noiseDataRef.current) {
        ctx.putImageData(noiseDataRef.current, 0, 0);
      }

      // Draw glow at cursor position
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.07)");
        gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.03)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(mx - 180, my - 180, 360, 360);
      }

      // Draw trail points with fading glow
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;

        if (p.age > maxTrailAge) {
          trail.splice(i, 1);
          continue;
        }

        const life = 1 - p.age / maxTrailAge;
        const alpha = life * life * 0.05 * p.strength;
        const radius = 120 + (1 - life) * 40;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        g.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [generateNoise]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9989] pointer-events-none"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}
