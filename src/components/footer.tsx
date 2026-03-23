import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();
  return (
    <footer className="border-t border-border py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left */}
          <div>
            <div className="text-2xl font-medium tracking-tight mb-2">
              Syrena Creative<span className="align-super text-[8px] ml-0.5">®</span>
            </div>
            <p className="text-sm text-muted">{dict.footer.tagline}</p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start md:items-end gap-2 text-sm text-muted">
            <span>Warsaw, Poland</span>
            <a href="mailto:hello@syrenacreative.com" className="link-hover hover:text-foreground transition-colors">
              hello@syrenacreative.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-16 pt-8 border-t border-border gap-4">
          <span className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {dict.metadata.title}. {dict.footer.rights}
          </span>
          {version !== "dev" && (
            <span className="text-xs text-muted/50" data-site-version>
              {version}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
