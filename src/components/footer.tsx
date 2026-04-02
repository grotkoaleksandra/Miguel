import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="border-t border-foreground/[0.06] py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left */}
          <div>
            <div className="font-display text-2xl tracking-[0.01em] font-normal mb-4">
              Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
            </div>
            <p className="text-[13px] text-muted leading-relaxed">{dict.footer.tagline}</p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start md:items-end gap-4 text-[13px] text-muted">
            <span>Warsaw, Poland</span>
            <a href="mailto:hello@syrenacreative.com" className="link-hover hover:text-foreground transition-colors duration-500" data-cursor-hover>
              hello@syrenacreative.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-24 pt-8 border-t border-foreground/[0.06] gap-4">
          <span className="text-[11px] text-muted/50 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} {dict.metadata.title}. {dict.footer.rights}
          </span>
          {version !== "dev" && (
            <span className="text-[11px] text-muted/25" data-site-version>
              {version}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
