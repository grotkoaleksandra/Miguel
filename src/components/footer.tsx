import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="relative z-10 border-t border-foreground/[0.06] py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-[#e8e8e8]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-x-4 md:gap-x-8">
        {/* Logo */}
        <div className="col-span-12 md:col-span-3 mb-10 md:mb-0">
          <div className="text-[15px] tracking-[0.02em] mb-3">
            Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
          </div>
          <p className="text-[13px] text-foreground/30 leading-relaxed">
            {dict.footer.tagline}
          </p>
        </div>

        {/* Contact */}
        <div className="col-span-6 md:col-span-2 md:col-start-7">
          <div className="text-[10px] tracking-[0.25em] uppercase text-foreground/20 mb-4">
            Contact
          </div>
          <a
            href="mailto:hello@syrenacreative.com"
            className="text-[13px] text-foreground/40 link-hover hover:text-foreground transition-colors duration-500 block"
            data-cursor-hover
          >
            hello@syrenacreative.com
          </a>
        </div>

        {/* Location */}
        <div className="col-span-6 md:col-span-2 md:col-start-10">
          <div className="text-[10px] tracking-[0.25em] uppercase text-foreground/20 mb-4">
            Location
          </div>
          <span className="text-[13px] text-foreground/40">
            Warsaw, Poland
          </span>
        </div>

        {/* Bottom line */}
        <div className="col-span-12 mt-16 pt-6 border-t border-foreground/[0.04] flex items-center justify-between">
          <span className="text-[10px] text-foreground/15 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} {dict.metadata.title}
          </span>
          {version !== "dev" && (
            <span className="text-[10px] text-foreground/10" data-site-version>
              {version}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
