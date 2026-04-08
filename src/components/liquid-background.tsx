"use client";

import { useEffect, useRef } from "react";

/**
 * Renders video to canvas with real water ripple distortion on mouse move.
 * Uses classic 2-buffer wave propagation + pixel displacement.
 * Runs at half resolution for performance.
 */
export function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Render at half res for perf, CSS scales it up
    const SCALE = 0.5;
    let w = 0;
    let h = 0;
    let cw = 0;
    let ch = 0;
    let buf1: Float32Array;
    let buf2: Float32Array;
    let rafId = 0;
    const DAMPING = 0.96;

    const mouse = { x: -1000, y: -1000 };
    const trail: { x: number; y: number; age: number; str: number }[] = [];

    // Offscreen canvas for reading clean video frame
    const offCanvas = document.createElement("canvas");
    const offCtx = offCanvas.getContext("2d", { willReadFrequently: true })!;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cw = Math.round(w * SCALE);
      ch = Math.round(h * SCALE);
      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      offCanvas.width = cw;
      offCanvas.height = ch;
      buf1 = new Float32Array(cw * ch);
      buf2 = new Float32Array(cw * ch);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const px = mouse.x;
      const py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        trail.push({ x: e.clientX, y: e.clientY, age: 0, str: Math.min(dist / 5, 1) });
        if (trail.length > 80) trail.splice(0, 10);
      }

      // Drop ripple into buffer (in canvas coords)
      const rx = Math.round(e.clientX * SCALE);
      const ry = Math.round(e.clientY * SCALE);
      const radius = 6;
      const strength = Math.min(dist * 2, 512);
      for (let oy = -radius; oy <= radius; oy++) {
        for (let ox = -radius; ox <= radius; ox++) {
          const bx = rx + ox;
          const by = ry + oy;
          if (bx >= 0 && bx < cw && by >= 0 && by < ch) {
            const d = Math.sqrt(ox * ox + oy * oy);
            if (d <= radius) {
              buf1[by * cw + bx] += strength * (1 - d / radius);
            }
          }
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const onClick = (e: MouseEvent) => {
      // Big splash on click
      const rx = Math.round(e.clientX * SCALE);
      const ry = Math.round(e.clientY * SCALE);
      const radius = 14;
      for (let oy = -radius; oy <= radius; oy++) {
        for (let ox = -radius; ox <= radius; ox++) {
          const bx = rx + ox;
          const by = ry + oy;
          if (bx >= 0 && bx < cw && by >= 0 && by < ch) {
            const d = Math.sqrt(ox * ox + oy * oy);
            if (d <= radius) {
              buf1[by * cw + bx] += 800 * (1 - d / radius);
            }
          }
        }
      }
    };
    window.addEventListener("click", onClick);

    const animate = () => {
      if (video.readyState < 2) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      // Draw video to offscreen at half res
      offCtx.drawImage(video, 0, 0, cw, ch);
      // Light tint
      offCtx.fillStyle = "rgba(232, 232, 232, 0.3)";
      offCtx.fillRect(0, 0, cw, ch);

      const srcData = offCtx.getImageData(0, 0, cw, ch);
      const src = srcData.data;

      // Propagate ripples
      for (let y = 1; y < ch - 1; y++) {
        for (let x = 1; x < cw - 1; x++) {
          const i = y * cw + x;
          buf2[i] = (
            buf1[(y - 1) * cw + x] +
            buf1[(y + 1) * cw + x] +
            buf1[y * cw + (x - 1)] +
            buf1[y * cw + (x + 1)]
          ) / 2 - buf2[i];
          buf2[i] *= DAMPING;
        }
      }

      // Displace pixels
      const dst = ctx.createImageData(cw, ch);
      const out = dst.data;

      for (let y = 1; y < ch - 1; y++) {
        for (let x = 1; x < cw - 1; x++) {
          const i = y * cw + x;
          // Gradient gives displacement direction
          const dispX = buf2[i - 1] - buf2[i + 1];
          const dispY = buf2[i - cw] - buf2[i + cw];

          // Source pixel with displacement
          const sx = Math.max(0, Math.min(cw - 1, Math.round(x + dispX * 0.4)));
          const sy = Math.max(0, Math.min(ch - 1, Math.round(y + dispY * 0.4)));

          const di = i * 4;
          const si = (sy * cw + sx) * 4;
          // Add slight brightness where ripple is strong (caustic effect)
          const rippleStrength = Math.abs(buf2[i]) * 0.003;
          out[di] = Math.min(255, src[si] + rippleStrength * 60);
          out[di + 1] = Math.min(255, src[si + 1] + rippleStrength * 60);
          out[di + 2] = Math.min(255, src[si + 2] + rippleStrength * 40);
          out[di + 3] = 255;
        }
      }

      ctx.putImageData(dst, 0, 0);

      // Swap buffers
      const tmp = buf1;
      buf1 = buf2;
      buf2 = tmp;

      // Cursor glow (draw at canvas coords)
      const mx = mouse.x * SCALE;
      const my = mouse.y * SCALE;
      if (mouse.x > -500) {
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, 140 * SCALE);
        g.addColorStop(0, "rgba(255,255,255,0.12)");
        g.addColorStop(0.4, "rgba(255,252,245,0.05)");
        g.addColorStop(1, "rgba(255,250,240,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mx, my, 140 * SCALE, 0, Math.PI * 2);
        ctx.fill();
      }

      // Trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;
        if (p.age > 60) { trail.splice(i, 1); continue; }
        const life = 1 - p.age / 60;
        const alpha = life * life * 0.15 * p.str;
        const r = (80 + (1 - life) * 50) * SCALE;
        const g = ctx.createRadialGradient(p.x * SCALE, p.y * SCALE, 0, p.x * SCALE, p.y * SCALE, r);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x * SCALE, p.y * SCALE, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    video.addEventListener("canplay", () => { rafId = requestAnimationFrame(animate); });
    if (video.readyState >= 2) rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hidden"
      >
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ imageRendering: "auto" }}
      />
    </>
  );
}
