import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { VideoHero } from "@/components/video-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { MagneticButton } from "@/components/magnetic-button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const projects = dict.home.projects.list;

  return (
    <>
      {/* ═══ HERO (fixed video + overlay text) ═══ */}
      <VideoHero
        line1={dict.home.hero.line1}
        line2={dict.home.hero.line2}
        line3={dict.home.hero.line3}
      />

      {/* ═══ SCROLLABLE CONTENT — slides up over the fixed video ═══ */}
      <div className="relative z-10">
        {/* ─── INTRO / PHILOSOPHY ─── */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-[#e8e8e8]/85 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-x-4 md:gap-x-8">
            <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
              <ScrollReveal>
                <span className="text-foreground/25 text-[11px] tracking-[0.3em] uppercase">
                  About us
                </span>
              </ScrollReveal>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <TextReveal
                tag="p"
                className="font-display text-3xl md:text-4xl lg:text-[2.8rem] font-normal leading-[1.25] tracking-[-0.01em] text-foreground/85"
                stagger={0.035}
              >
                Code and design are just tools. What makes work unforgettable is understanding the people behind the brand.
              </TextReveal>
              <ScrollReveal delay={0.5}>
                <div className="mt-16 h-[1px] bg-foreground/[0.06]" />
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-foreground/20 text-[11px] tracking-[0.2em] uppercase">
                    Syrena Creative
                  </span>
                  <span className="text-foreground/20 text-[11px] tracking-[0.2em] uppercase">
                    Warsaw, 2025
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── PROJECTS — Stacked Grid ─── */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-[#e8e8e8]/85 backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex items-baseline justify-between mb-20">
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-foreground/30">
                  {dict.home.projects.title}
                </h2>
                <span className="text-[11px] text-foreground/20 tracking-[0.15em]">
                  ( {projects.length} )
                </span>
              </div>
            </ScrollReveal>

            <div className="space-y-24 md:space-y-32">
              {projects.map((project, i) => (
                <ScrollReveal key={project.title} delay={0.1}>
                  <div className={`grid grid-cols-12 gap-x-4 md:gap-x-8 items-start ${
                    i % 2 === 0 ? "" : "md:direction-rtl"
                  }`}>
                    {/* Image */}
                    <div className={`col-span-12 ${
                      i % 2 === 0 ? "md:col-span-7" : "md:col-span-7 md:col-start-6"
                    } mb-8 md:mb-0`}>
                      <div className="relative overflow-hidden aspect-[4/3] group cursor-pointer" data-cursor-hover>
                        <img
                          src={projectImageMap[project.title] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                    {/* Info */}
                    <div className={`col-span-12 ${
                      i % 2 === 0 ? "md:col-span-4 md:col-start-9" : "md:col-span-4 md:col-start-1 md:row-start-1"
                    } flex flex-col justify-center`}>
                      <span className="text-foreground/20 text-[11px] font-mono tracking-[0.15em] mb-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl font-normal tracking-[-0.01em] mb-4">
                        {project.title}
                      </h3>
                      <p className="text-foreground/40 text-[14px] leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/25 border border-foreground/[0.08] rounded-full px-4 py-1.5">
                          {project.category}
                        </span>
                        <span className={`text-[10px] tracking-[0.2em] uppercase ${
                          project.status === "In Progress" ? "text-foreground/40" : "text-foreground/20"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-[#030303]/90 backdrop-blur-sm text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 mb-20 md:mb-28">
              <div className="col-span-12 md:col-span-3">
                <ScrollReveal>
                  <h2 className="text-[11px] tracking-[0.3em] uppercase text-white/25">
                    {dict.home.services.title}
                  </h2>
                </ScrollReveal>
              </div>
              <div className="col-span-12 md:col-span-5 md:col-start-5 mt-6 md:mt-0">
                <ScrollReveal delay={0.1}>
                  <p className="text-white/30 text-[14px] leading-relaxed">
                    We combine design, development, and strategy to build digital products that work — and look the part.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <div>
              {dict.home.services.list.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 0.05}>
                  <div className="group border-t border-white/[0.06] last:border-b py-8 md:py-10 flex items-start md:items-center justify-between gap-6 cursor-pointer transition-colors duration-700 hover:border-white/[0.12]" data-cursor-hover>
                    <div className="flex items-start md:items-center gap-6 md:gap-12">
                      <span className="text-white/[0.06] text-[11px] tabular-nums font-mono mt-1 md:mt-0 tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl font-light tracking-[-0.01em] group-hover:text-white/60 transition-colors duration-500">
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-white/[0.06] group-hover:text-white/30 group-hover:translate-x-1 transition-all duration-500 text-sm">
                      →
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 text-center bg-[#e8e8e8]/85 backdrop-blur-sm">
          <div className="max-w-[900px] mx-auto">
            <ScrollReveal>
              <span className="text-foreground/20 text-[11px] tracking-[0.3em] uppercase block mb-12">
                Next step
              </span>
            </ScrollReveal>
            <TextReveal
              tag="h2"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-normal tracking-[-0.03em] leading-[0.95]"
              stagger={0.05}
            >
              {dict.home.cta.title}
            </TextReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-[15px] text-foreground/35 mt-10 mb-14 max-w-md mx-auto leading-relaxed">
                {dict.home.cta.subtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <MagneticButton className="inline-block">
                <Link
                  href={`/${lang}/contact`}
                  className="group inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase border border-foreground/[0.12] rounded-full px-12 py-5 hover:bg-foreground hover:text-[#e8e8e8] transition-all duration-700"
                  data-cursor-hover
                >
                  {dict.home.cta.button}
                  <span className="group-hover:translate-x-1 transition-transform duration-500 text-xs">
                    →
                  </span>
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}

const projectImageMap: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=800&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=800&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=800&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=800&fit=crop",
};
