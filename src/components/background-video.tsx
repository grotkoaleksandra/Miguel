"use client";

export function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/1918465/1918465-hd_1920_1080_24fps.mp4"
          type="video/mp4"
        />
      </video>
      {/* Light tint so text is readable on content sections */}
      <div className="absolute inset-0 bg-white/50" />
    </div>
  );
}
