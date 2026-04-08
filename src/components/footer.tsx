import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="relative z-10 py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-[#030303] text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div>
            <div className="font-display text-2xl tracking-[0.01em] mb-3">
              Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
            </div>
            <p className="text-white/30 text-[13px] leading-relaxed max-w-xs">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/20 mb-4">Contact</div>
              <a
                href="mailto:hello@syrenacreative.com"
                className="text-[13px] text-white/50 link-hover hover:text-white transition-colors duration-500 block"
                data-cursor-hover
              >
                hello@syrenacreative.com
              </a>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/20 mb-4">Location</div>
              <span className="text-[13px] text-white/50">Warsaw, Poland</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex items-center justify-between">
          <span className="text-[10px] text-white/20 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} {dict.metadata.title}
          </span>
          {version !== "dev" && (
            <span className="text-[10px] text-white/10" data-site-version>
              {version}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
