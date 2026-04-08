"use client";

import { useEffect, useRef } from "react";

/**
 * Full interactive water surface — light cream palette.
 * Mouse creates ripples, scroll creates directional waves.
 */
export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIM_SCALE = 0.25;
    let w = 0, h = 0, sw = 0, sh = 0;
    let buf1: Float32Array;
    let buf2: Float32Array;
    let rafId = 0;

    const DAMPING = 0.985;
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000 };
    let lastScroll = 0;
    let scrollVel = 0;
    let scrollAccum = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      sw = Math.round(w * SIM_SCALE);
      sh = Math.round(h * SIM_SCALE);
      canvas.width = sw;
      canvas.height = sh;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      buf1 = new Float32Array(sw * sh);
      buf2 = new Float32Array(sw * sh);
    };
    resize();
    window.addEventListener("resize", resize);

    const drop = (cx: number, cy: number, radius: number, strength: number) => {
      const rx = Math.round(cx * SIM_SCALE);
      const ry = Math.round(cy * SIM_SCALE);
      const r = Math.round(radius * SIM_SCALE);
      for (let oy = -r; oy <= r; oy++) {
        for (let ox = -r; ox <= r; ox++) {
          const bx = rx + ox;
          const by = ry + oy;
          if (bx >= 0 && bx < sw && by >= 0 && by < sh) {
            const d = Math.sqrt(ox * ox + oy * oy);
            if (d <= r) {
              buf1[by * sw + bx] += strength * 0.5 * (1 + Math.cos(Math.PI * d / r));
            }
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1) {
        drop(e.clientX, e.clientY, 15 + Math.min(speed * 0.5, 25), Math.min(speed * 1.5, 200));
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onClick = (e: MouseEvent) => drop(e.clientX, e.clientY, 60, 500);
    window.addEventListener("click", onClick);

    const onScroll = () => {
      const s = window.scrollY;
      scrollVel = s - lastScroll;
      lastScroll = s;
      if (Math.abs(scrollVel) > 1) scrollAccum += Math.abs(scrollVel);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let ambientTimer = 0;

    // Light cream/warm water palette
    const BASE_R = 240, BASE_G = 235, BASE_B = 228;   // warm cream base
    const DEEP_R = 225, DEEP_G = 218, DEEP_B = 208;   // shadow (slightly darker warm)
    const HIGH_R = 252, HIGH_G = 250, HIGH_B = 247;   // highlight (near white)

    const animate = () => {
      // Propagate
      for (let y = 1; y < sh - 1; y++) {
        for (let x = 1; x < sw - 1; x++) {
          const i = y * sw + x;
          buf2[i] = (buf1[i - 1] + buf1[i + 1] + buf1[i - sw] + buf1[i + sw]) * 0.5 - buf2[i];
          buf2[i] *= DAMPING;
        }
      }

      // Scroll waves
      if (scrollAccum > 3) {
        const str = Math.min(scrollAccum * 2.5, 180);
        const down = scrollVel > 0;
        for (let n = 0; n < 4 + Math.floor(Math.random() * 5); n++) {
          const bias = Math.random() * Math.random();
          drop(Math.random() * w, down ? bias * h * 0.4 : h - bias * h * 0.4, 20 + Math.random() * 30, str * (0.5 + Math.random() * 0.5));
        }
        scrollAccum = 0;
      }

      // Ambient
      ambientTimer++;
      if (ambientTimer >= 80) {
        ambientTimer = 0;
        drop(Math.random() * w, Math.random() * h, 20 + Math.random() * 20, 30 + Math.random() * 50);
      }

      // Render
      const img = ctx.createImageData(sw, sh);
      const data = img.data;

      for (let y = 1; y < sh - 1; y++) {
        for (let x = 1; x < sw - 1; x++) {
          const i = y * sw + x;
          const dx = buf2[i + 1] - buf2[i - 1];
          const dy = buf2[i + sw] - buf2[i - sw];
          const light = Math.max(-1, Math.min(1, (dx * -0.7 + dy * -0.7) * 0.004));

          let r: number, g: number, b: number;
          if (light > 0) {
            r = BASE_R + (HIGH_R - BASE_R) * light;
            g = BASE_G + (HIGH_G - BASE_G) * light;
            b = BASE_B + (HIGH_B - BASE_B) * light;
          } else {
            const s = -light;
            r = BASE_R + (DEEP_R - BASE_R) * s;
            g = BASE_G + (DEEP_G - BASE_G) * s;
            b = BASE_B + (DEEP_B - BASE_B) * s;
          }

          // Caustic shimmer — warm tint on light theme
          const h2 = Math.abs(buf2[i]);
          if (h2 > 20) {
            const c = Math.min((h2 - 20) * 0.008, 0.4);
            r += (255 - r) * c;
            g += (248 - g) * c;
            b += (240 - b) * c;
          }

          const pi = i * 4;
          data[pi] = r;
          data[pi + 1] = g;
          data[pi + 2] = b;
          data[pi + 3] = 255;
        }
      }

      // Edges
      for (let x = 0; x < sw; x++) {
        const t = x * 4, bt = ((sh - 1) * sw + x) * 4;
        data[t] = BASE_R; data[t+1] = BASE_G; data[t+2] = BASE_B; data[t+3] = 255;
        data[bt] = BASE_R; data[bt+1] = BASE_G; data[bt+2] = BASE_B; data[bt+3] = 255;
      }
      for (let y = 0; y < sh; y++) {
        const l = y * sw * 4, ri = (y * sw + sw - 1) * 4;
        data[l] = BASE_R; data[l+1] = BASE_G; data[l+2] = BASE_B; data[l+3] = 255;
        data[ri] = BASE_R; data[ri+1] = BASE_G; data[ri+2] = BASE_B; data[ri+3] = 255;
      }

      ctx.putImageData(img, 0, 0);
      const tmp = buf1; buf1 = buf2; buf2 = tmp;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ imageRendering: "auto" }}
    />
  );
}
