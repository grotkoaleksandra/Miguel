"use client";

import { useEffect, useRef } from "react";

/**
 * Ocean video background with interactive water ripple distortion.
 * - Video renders to canvas at full res
 * - Ripple simulation at 1/4 res for performance
 * - Mouse movement creates propagating ripple waves
 * - Cursor glow + fading trail overlay
 *
 * Uses SVG feTurbulence + feDisplacementMap driven by a dynamic ripple texture
 * for GPU-accelerated distortion (no per-pixel JS loop).
 */
export function LiquidBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const rippleCanvas = rippleCanvasRef.current;
    const glowCanvas = glowCanvasRef.current;
    if (!rippleCanvas || !glowCanvas) return;
    const rCtx = rippleCanvas.getContext("2d")!;
    const gCtx = glowCanvas.getContext("2d")!;

    let w = window.innerWidth;
    let h = window.innerHeight;
    // Ripple sim resolution
    const SCALE = 4;
    let rw = Math.ceil(w / SCALE);
    let rh = Math.ceil(h / SCALE);
    let buf1 = new Float32Array(rw * rh);
    let buf2 = new Float32Array(rw * rh);
    const damping = 0.965;
    let rafId = 0;

    const mouse = { x: -1000, y: -1000 };
    const trail: { x: number; y: number; age: number; str: number }[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      rw = Math.ceil(w / SCALE);
      rh = Math.ceil(h / SCALE);
      rippleCanvas.width = rw;
      rippleCanvas.height = rh;
      glowCanvas.width = w;
      glowCanvas.height = h;
      glowCanvas.style.width = `${w}px`;
      glowCanvas.style.height = `${h}px`;
      buf1 = new Float32Array(rw * rh);
      buf2 = new Float32Array(rw * rh);
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
        const str = Math.min(dist / 5, 1);
        trail.push({ x: e.clientX, y: e.clientY, age: 0, str });
        if (trail.length > 100) trail.splice(0, 15);
      }

      // Drop into ripple buffer
      const rx = ((e.clientX / w) * rw) | 0;
      const ry = ((e.clientY / h) * rh) | 0;
      const rad = 4;
      const strength = Math.min(dist * 1.5, 400);
      for (let dy2 = -rad; dy2 <= rad; dy2++) {
        for (let dx2 = -rad; dx2 <= rad; dx2++) {
          const px2 = rx + dx2;
          const py2 = ry + dy2;
          if (px2 >= 0 && px2 < rw && py2 >= 0 && py2 < rh) {
            const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (d <= rad) {
              buf1[py2 * rw + px2] += strength * (1 - d / rad);
            }
          }
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      // --- Ripple propagation ---
      for (let y = 1; y < rh - 1; y++) {
        for (let x = 1; x < rw - 1; x++) {
          const i = y * rw + x;
          buf2[i] = (
            buf1[(y - 1) * rw + x] +
            buf1[(y + 1) * rw + x] +
            buf1[y * rw + (x - 1)] +
            buf1[y * rw + (x + 1)]
          ) / 2 - buf2[i];
          buf2[i] *= damping;
        }
      }

      // Render ripple as a displacement map texture (grayscale: 128 = neutral)
      const imgData = rCtx.createImageData(rw, rh);
      const d = imgData.data;
      for (let y = 1; y < rh - 1; y++) {
        for (let x = 1; x < rw - 1; x++) {
          const i = y * rw + x;
          // Horizontal displacement → R channel
          const dx = (buf2[y * rw + (x - 1)] - buf2[y * rw + (x + 1)]) * 0.5;
          // Vertical displacement → G channel
          const dy = (buf2[(y - 1) * rw + x] - buf2[(y + 1) * rw + x]) * 0.5;
          const pi = i * 4;
          d[pi] = Math.max(0, Math.min(255, 128 + dx * 2));     // R
          d[pi + 1] = Math.max(0, Math.min(255, 128 + dy * 2)); // G
          d[pi + 2] = 128; // B unused
          d[pi + 3] = 255;
        }
      }
      rCtx.putImageData(imgData, 0, 0);

      // Update the SVG feImage with the ripple canvas data URL
      const feImg = document.getElementById("ripple-map-image");
      if (feImg) {
        feImg.setAttribute("href", rippleCanvas.toDataURL());
      }

      // Swap buffers
      const tmp = buf1;
      buf1 = buf2;
      buf2 = tmp;

      // --- Glow canvas (cursor + trail) ---
      gCtx.clearRect(0, 0, w, h);

      if (mouse.x > -500) {
        const g = gCtx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        g.addColorStop(0, "rgba(255, 255, 255, 0.18)");
        g.addColorStop(0.25, "rgba(255, 252, 245, 0.10)");
        g.addColorStop(0.6, "rgba(255, 250, 240, 0.03)");
        g.addColorStop(1, "rgba(255, 250, 240, 0)");
        gCtx.fillStyle = g;
        gCtx.beginPath();
        gCtx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
        gCtx.fill();
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;
        if (p.age > 70) { trail.splice(i, 1); continue; }
        const life = 1 - p.age / 70;
        const alpha = life * life * 0.2 * p.str;
        const r = 100 + (1 - life) * 70;
        const g = gCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(255,255,255,${alpha})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        gCtx.fillStyle = g;
        gCtx.beginPath();
        gCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
        gCtx.fill();
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* SVG displacement filter — GPU accelerated */}
      <svg className="hidden" width="0" height="0">
        <defs>
          <filter id="liquid-ripple" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage id="ripple-map-image" href="" result="rippleMap" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" />
            <feDisplacementMap in="SourceGraphic" in2="rippleMap" scale="60" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Hidden ripple displacement canvas */}
      <canvas ref={rippleCanvasRef} className="hidden" />

      {/* Video + tint, distorted by the SVG filter */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-0 overflow-hidden"
        style={{ filter: "url(#liquid-ripple)" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Light wash so content is readable */}
        <div className="absolute inset-0 bg-white/35" />
      </div>

      {/* Glow + trail overlay */}
      <canvas
        ref={glowCanvasRef}
        className="fixed inset-0 z-[1] pointer-events-none"
      />
    </>
  );
}
