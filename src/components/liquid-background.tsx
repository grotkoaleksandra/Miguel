"use client";

import { useEffect, useRef } from "react";

/**
 * Full interactive water surface simulation.
 * No video — pure canvas with 2-buffer wave propagation.
 * Mouse creates ripples, scroll creates waves, ambient drops keep it alive.
 */
export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simulation at lower res for performance
    const SIM_SCALE = 0.25;
    let w = 0;
    let h = 0;
    let sw = 0;
    let sh = 0;
    let buf1: Float32Array;
    let buf2: Float32Array;
    let rafId = 0;

    const DAMPING = 0.985;
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000 };
    let lastScroll = 0;
    let scrollVel = 0;

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

    // Drop a disturbance into the height field
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
              // Cosine falloff for smooth ripple
              const falloff = 0.5 * (1 + Math.cos(Math.PI * d / r));
              buf1[by * sw + bx] += strength * falloff;
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
        // Continuous ripples along the path
        const strength = Math.min(speed * 1.5, 200);
        const radius = 15 + Math.min(speed * 0.5, 25);
        drop(e.clientX, e.clientY, radius, strength);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onClick = (e: MouseEvent) => {
      drop(e.clientX, e.clientY, 60, 500);
    };
    window.addEventListener("click", onClick);

    // Push a horizontal wave front into the buffer along one edge
    const pushWaveFront = (strength: number, fromTop: boolean) => {
      const edgeY = fromTop ? 1 : sh - 2;
      const str = Math.min(strength, 250);
      for (let x = 0; x < sw; x++) {
        // Slight randomness so it doesn't look perfectly uniform
        const noise = 0.7 + Math.random() * 0.6;
        buf1[edgeY * sw + x] += str * noise;
      }
    };

    const onScroll = () => {
      const currentScroll = window.scrollY;
      scrollVel = currentScroll - lastScroll;
      lastScroll = currentScroll;

      const absVel = Math.abs(scrollVel);
      if (absVel > 2) {
        const strength = Math.min(absVel * 4, 250);
        // Scrolling down = wave enters from top, scrolling up = from bottom
        pushWaveFront(strength, scrollVel > 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Ambient drops — keep the surface alive
    let ambientTimer = 0;
    const ambientInterval = 80; // every ~80 frames

    // Water color palette
    const BASE_R = 180, BASE_G = 210, BASE_B = 230;    // light blue-gray
    const DEEP_R = 120, DEEP_G = 160, DEEP_B = 195;    // deeper blue
    const HIGHLIGHT_R = 245, HIGHLIGHT_G = 250, HIGHLIGHT_B = 255; // white highlight

    const animate = () => {
      // Propagate wave equation
      for (let y = 1; y < sh - 1; y++) {
        for (let x = 1; x < sw - 1; x++) {
          const i = y * sw + x;
          buf2[i] = (
            buf1[i - 1] +
            buf1[i + 1] +
            buf1[i - sw] +
            buf1[i + sw]
          ) * 0.5 - buf2[i];
          buf2[i] *= DAMPING;
        }
      }

      // Ambient drops
      ambientTimer++;
      if (ambientTimer >= ambientInterval) {
        ambientTimer = 0;
        drop(
          Math.random() * w,
          Math.random() * h,
          20 + Math.random() * 20,
          30 + Math.random() * 50,
        );
      }

      // Render — compute normals from height field and shade
      const img = ctx.createImageData(sw, sh);
      const data = img.data;

      for (let y = 1; y < sh - 1; y++) {
        for (let x = 1; x < sw - 1; x++) {
          const i = y * sw + x;

          // Surface normal from height gradient
          const dx = buf2[i + 1] - buf2[i - 1];
          const dy = buf2[i + sw] - buf2[i - sw];

          // Light direction (top-left)
          const light = (dx * -0.7 + dy * -0.7) * 0.004;
          const clamped = Math.max(-1, Math.min(1, light));

          // Blend between deep color, base color, and highlight
          let r: number, g: number, b: number;
          if (clamped > 0) {
            // Highlight (light hitting surface)
            r = BASE_R + (HIGHLIGHT_R - BASE_R) * clamped;
            g = BASE_G + (HIGHLIGHT_G - BASE_G) * clamped;
            b = BASE_B + (HIGHLIGHT_B - BASE_B) * clamped;
          } else {
            // Shadow (troughs)
            const s = -clamped;
            r = BASE_R + (DEEP_R - BASE_R) * s;
            g = BASE_G + (DEEP_G - BASE_G) * s;
            b = BASE_B + (DEEP_B - BASE_B) * s;
          }

          // Add caustic sparkle near strong ripples
          const height = Math.abs(buf2[i]);
          if (height > 20) {
            const caustic = Math.min((height - 20) * 0.01, 0.5);
            r = r + (255 - r) * caustic;
            g = g + (255 - g) * caustic;
            b = b + (255 - b) * caustic;
          }

          const pi = i * 4;
          data[pi] = r;
          data[pi + 1] = g;
          data[pi + 2] = b;
          data[pi + 3] = 255;
        }
      }

      // Fill edges
      for (let x = 0; x < sw; x++) {
        const topI = x * 4;
        const botI = ((sh - 1) * sw + x) * 4;
        data[topI] = BASE_R; data[topI + 1] = BASE_G; data[topI + 2] = BASE_B; data[topI + 3] = 255;
        data[botI] = BASE_R; data[botI + 1] = BASE_G; data[botI + 2] = BASE_B; data[botI + 3] = 255;
      }
      for (let y = 0; y < sh; y++) {
        const leftI = (y * sw) * 4;
        const rightI = (y * sw + sw - 1) * 4;
        data[leftI] = BASE_R; data[leftI + 1] = BASE_G; data[leftI + 2] = BASE_B; data[leftI + 3] = 255;
        data[rightI] = BASE_R; data[rightI + 1] = BASE_G; data[rightI + 2] = BASE_B; data[rightI + 3] = 255;
      }

      ctx.putImageData(img, 0, 0);

      // Swap buffers
      const tmp = buf1;
      buf1 = buf2;
      buf2 = tmp;

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
