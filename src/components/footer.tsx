import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="relative z-10 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div>
            <div className="text-white text-[15px] font-semibold tracking-[0.02em] mb-3">
              Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
            </div>
            <p className="text-white/30 text-[14px] leading-relaxed max-w-xs">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <div className="text-white/25 text-[11px] tracking-[0.15em] uppercase mb-4">Contact</div>
            <a
              href="mailto:hello@syrenacreative.com"
              className="text-white/50 text-[14px] link-hover hover:text-white transition-colors duration-300 block mb-2"
              data-cursor-hover
            >
              hello@syrenacreative.com
            </a>
          </div>

          <div>
            <div className="text-white/25 text-[11px] tracking-[0.15em] uppercase mb-4">Studio</div>
            <div className="text-white/50 text-[14px]">Warsaw, Poland</div>
            <div className="text-white/25 text-[13px] mt-1">CET (GMT+1)</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.06] pt-6 flex items-center justify-between">
          <span className="text-[12px] text-white/20">
            &copy; {new Date().getFullYear()} {dict.metadata.title}. {dict.footer.rights}
          </span>
          {version !== "dev" && (
            <span className="text-[11px] text-white/10" data-site-version>{version}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
