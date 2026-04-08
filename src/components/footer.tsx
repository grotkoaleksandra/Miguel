import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="relative z-10 border-t border-[#111]/[0.06] bg-[#f7f7f5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div>
            <div className="text-[#111] text-[15px] font-semibold tracking-[0.02em] mb-3">
              Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
            </div>
            <p className="text-[#111]/35 text-[14px] leading-relaxed max-w-xs">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <div className="text-[#111]/30 text-[11px] tracking-[0.15em] uppercase mb-4">Contact</div>
            <a
              href="mailto:hello@syrenacreative.com"
              className="text-[#111]/60 text-[14px] link-hover hover:text-[#111] transition-colors duration-300 block mb-2"
              data-cursor-hover
            >
              hello@syrenacreative.com
            </a>
          </div>

          <div>
            <div className="text-[#111]/30 text-[11px] tracking-[0.15em] uppercase mb-4">Studio</div>
            <div className="text-[#111]/60 text-[14px]">Warsaw, Poland</div>
            <div className="text-[#111]/30 text-[13px] mt-1">CET (GMT+1)</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-[#111]/[0.06] pt-6 flex items-center justify-between">
          <span className="text-[12px] text-[#111]/25">
            &copy; {new Date().getFullYear()} {dict.metadata.title}. {dict.footer.rights}
          </span>
          {version !== "dev" && (
            <span className="text-[11px] text-[#111]/15" data-site-version>{version}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
