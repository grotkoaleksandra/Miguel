"use client";

import { useExperience } from "@/contexts/experience-context";

export function BrandMark() {
  const { entered } = useExperience();

  if (!entered) return null;

  return (
    <div className="fixed top-0 left-0 z-[55] px-6 md:px-10 h-16 flex items-center">
      <span className="text-[#1a1a1a]/60 text-[14px] font-semibold tracking-[0.06em]">
        Syrena<span className="hidden md:inline"> Creative</span>
        <span className="align-super text-[8px] ml-0.5">®</span>
      </span>
    </div>
  );
}
