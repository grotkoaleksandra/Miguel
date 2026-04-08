import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="relative z-10 border-t border-white/[0.04] py-16 md:py-20 px-8 md:px-16 lg:px-24 bg-[#060a10] text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-16">
          <div>
            <div className="text-[14px] tracking-[0.03em] mb-2">
              Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
            </div>
            <p className="text-white/20 text-[13px]">{dict.footer.tagline}</p>
          </div>
          <div className="flex gap-12">
            <div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/15 mb-3">Contact</div>
              <a href="mailto:hello@syrenacreative.com" className="text-[13px] text-white/35 link-hover hover:text-white/60 transition-colors duration-500" data-cursor-hover>
                hello@syrenacreative.com
              </a>
            </div>
            <div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/15 mb-3">Location</div>
              <span className="text-[13px] text-white/35">Warsaw, Poland</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-6 flex items-center justify-between">
          <span className="text-[10px] text-white/15">&copy; {new Date().getFullYear()} {dict.metadata.title}</span>
          {version !== "dev" && (
            <span className="text-[10px] text-white/10" data-site-version>{version}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
