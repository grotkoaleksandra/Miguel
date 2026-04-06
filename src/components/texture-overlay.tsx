"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Small offscreen tile for noise — regenerated every frame
    const TILE = 128;
    const tileCanvas = document.createElement("canvas");
    tileCanvas.width = TILE;
    tileCanvas.height = TILE;
    const tileCtx = tileCanvas.getContext("2d")!;
    const tileData = tileCtx.createImageData(TILE, TILE);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
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

      const strength = Math.min(dist / 6, 1);
      if (dist > 2) {
        trailRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          strength,
        });
        if (trailRef.current.length > 120) {
          trailRef.current.splice(0, 20);
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const maxTrailAge = 90;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // 1. Regenerate noise tile every frame — animated grain
      const d = tileData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random();
        if (v < 0.5) {
          d[i] = 0;
          d[i + 1] = 0;
          d[i + 2] = 0;
          d[i + 3] = (Math.random() * 28 + 4) | 0;
        } else {
          d[i] = 255;
          d[i + 1] = 255;
          d[i + 2] = 255;
          d[i + 3] = (Math.random() * 16 + 2) | 0;
        }
      }
      tileCtx.putImageData(tileData, 0, 0);

      // Tile the noise across the full canvas
      const pat = ctx.createPattern(tileCanvas, "repeat");
      if (pat) {
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Cursor spotlight
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      if (mx > -500 && my > -500) {
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

      // 3. Trail — warm fading glow
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
    />
  );
}
