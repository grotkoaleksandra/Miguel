import Link from "next/link";
import type { Dictionary } from "@/i18n/types";
import { getVersion } from "@/lib/version";

/**
 * Inverted footer — white bg, black text, full viewport height.
 * Giant logo at top, link columns at bottom. Matches Stink Studios footer.
 */
export function Footer({ dict }: { dict: Dictionary }) {
  const version = getVersion();

  return (
    <footer className="relative bg-white text-black" style={{ minHeight: "100vh", padding: "20px 0 90px 0" }}>
      <div className="mx-auto px-5">
        {/* Giant logo wordmark */}
        <div
          className="font-bold uppercase leading-[0.85] tracking-[-0.03em] text-black"
          style={{
            fontSize: "clamp(48px, 13vw, 200px)",
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            marginBottom: 180,
            paddingTop: 20,
          }}
        >
          Syrena<br />Creative
        </div>

        {/* Divider */}
        <div className="divider-dark" />

        {/* Bottom content */}
        <div
          className="grid grid-cols-12 gap-x-5 gap-y-8"
          style={{ paddingTop: 20 }}
        >
          {/* Nav links */}
          <div className="col-span-6 md:col-span-2 space-y-1">
            <FooterLink href="/">Work</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>

          {/* Company links */}
          <div className="col-span-6 md:col-span-3 space-y-1">
            <FooterLink href="mailto:hello@syrenacreative.com">hello@syrenacreative.com</FooterLink>
            <span className="type-text block text-black/60" style={{ fontSize: 23 }}>Warsaw, Poland</span>
            <span className="type-text block text-black/40" style={{ fontSize: 23 }}>CET (GMT+1)</span>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-2" />

          {/* Tagline / newsletter area */}
          <div className="col-span-12 md:col-span-5">
            <p className="type-text text-black/60" style={{ fontSize: 23 }}>
              {dict.footer.tagline}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: 120 }}
        >
          <span className="type-caption text-black/30">
            &copy; {new Date().getFullYear()} {dict.metadata.title}. {dict.footer.rights}
          </span>
          {version !== "dev" && (
            <span className="type-caption text-black/20" data-site-version>{version}</span>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");
  const cls = "type-text link-underline text-black hover:opacity-40 transition-opacity duration-200 block";
  const style = { fontSize: 23, textDecorationColor: "rgba(0,0,0,0.3)" };

  if (isExternal) {
    return <a href={href} className={cls} style={style}>{children}</a>;
  }
  return <Link href={href} className={cls} style={style}>{children}</Link>;
}
