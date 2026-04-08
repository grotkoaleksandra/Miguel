import Link from "next/link";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

export function CtaSection({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-24 md:py-40 border-t border-[#111]/[0.06]">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-[-0.03em] text-[#111] mb-6">
          {dict.home.cta.title}
        </h2>
        <p className="text-[#111]/35 text-[15px] md:text-[17px] max-w-md mx-auto mb-10 leading-relaxed">
          {dict.home.cta.subtitle}
        </p>
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-3 text-[13px] tracking-[0.1em] uppercase border border-[#111]/15 rounded-full px-10 py-4 text-[#111]/60 hover:bg-[#111] hover:text-[#f7f7f5] transition-all duration-500"
          data-cursor-hover
        >
          {dict.home.cta.button} <span>→</span>
        </Link>
      </div>
    </section>
  );
}
