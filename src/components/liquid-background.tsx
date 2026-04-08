"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  strength: number;
}

/**
 * Video background + canvas overlay for interactive water ripple effect.
 * Video plays normally (no CORS issues). Canvas overlay draws ripple
 * rings + caustic light effects on mouse movement, blended over the video.
 */
export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef(0);
  const lastDropRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const addRipple = (x: number, y: number, strength: number, maxAge = 90) => {
      ripplesRef.current.push({ x, y, age: 0, maxAge, strength });
      if (ripplesRef.current.length > 60) ripplesRef.current.splice(0, 10);
    };

    const onMouseMove = (e: MouseEvent) => {
      const prev = mouseRef.current;
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Drop ripples as you move — throttle to every ~40ms
      const now = performance.now();
      if (dist > 4 && now - lastDropRef.current > 40) {
        lastDropRef.current = now;
        addRipple(e.clientX, e.clientY, Math.min(dist / 10, 1));
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY, 1.5, 120);
    };
    window.addEventListener("click", onClick);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const ripples = ripplesRef.current;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age++;
        if (r.age > r.maxAge) {
          ripples.splice(i, 1);
          continue;
        }

        const life = r.age / r.maxAge;
        const fadeIn = Math.min(r.age / 8, 1);
        const fadeOut = 1 - life;
        const opacity = fadeIn * fadeOut * r.strength;

        // Expanding ring
        const radius = life * 250 * r.strength;
        const ringWidth = 2 + (1 - life) * 6;

        // Outer ring — light refraction
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
        ctx.lineWidth = ringWidth;
        ctx.stroke();

        // Inner shadow ring
        if (radius > ringWidth * 2) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius - ringWidth * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.12})`;
          ctx.lineWidth = ringWidth * 0.6;
          ctx.stroke();
        }

        // Center glow (bright caustic spot)
        if (life < 0.3) {
          const glowOpacity = (1 - life / 0.3) * r.strength * 0.4;
          const g = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 60);
          g.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity})`);
          g.addColorStop(0.5, `rgba(200, 220, 255, ${glowOpacity * 0.3})`);
          g.addColorStop(1, "rgba(200, 220, 255, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(r.x, r.y, 60, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Cursor glow — always visible
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > -500) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        g.addColorStop(0, "rgba(255, 255, 255, 0.15)");
        g.addColorStop(0.3, "rgba(220, 235, 255, 0.06)");
        g.addColorStop(1, "rgba(200, 220, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Video background — plays normally, no canvas pixel reading */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
      {/* Lighten the video */}
      <div className="absolute inset-0 bg-white/40" />
      {/* Ripple overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-none"
      />
    </div>
  );
}
