import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { VideoHero } from "@/components/video-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { Marquee } from "@/components/marquee";

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
      {/* ═══ HERO — water sim shows through, no box ═══ */}
      <VideoHero
        line1={dict.home.hero.line1}
        line2={dict.home.hero.line2}
        line3={dict.home.hero.line3}
      />

      {/* ═══ MARQUEE — energy strip ═══ */}
      <div className="relative z-10">
        <Marquee />

        {/* ═══ PHILOSOPHY — text floats directly on water ═══ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1100px] mx-auto">
            <TextReveal
              tag="blockquote"
              className="font-display text-4xl md:text-5xl lg:text-[4rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#030303]"
              stagger={0.03}
            >
              Code and design are just tools. What makes work unforgettable is understanding the people behind the brand.
            </TextReveal>
          </div>
        </section>

        {/* ═══ PROJECTS — bold, full-bleed images ═══ */}
        <section className="pb-16 md:pb-24">
          <div className="px-6 md:px-12 lg:px-20 mb-16">
            <div className="max-w-[1600px] mx-auto">
              <ScrollReveal>
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-foreground/40 mb-2">
                  {dict.home.projects.title}
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 px-3 md:px-6">
            {projects.map((project, i) => (
              <ScrollReveal key={project.title} delay={0.05}>
                <div className="group relative overflow-hidden cursor-pointer rounded-lg" data-cursor-hover>
                  {/* Full-bleed image */}
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    <img
                      src={projectImageMap[project.title] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=800&fit=crop"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex items-end p-6 md:p-10 lg:p-14">
                      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                          <span className="text-white/40 text-[10px] tracking-[0.25em] uppercase block mb-2">
                            {String(i + 1).padStart(2, "0")} — {project.category}
                          </span>
                          <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-normal tracking-[-0.02em]">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="hidden lg:block text-white/50 text-sm max-w-xs leading-relaxed">
                            {project.description}
                          </p>
                          <span className="text-white/30 text-2xl group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ═══ SERVICES — dark, bold, with big numbers ═══ */}
        <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20 bg-[#030303] text-white relative overflow-hidden">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />

          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 md:mb-28">
              <ScrollReveal>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.02em]">
                  What we do
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-white/30 text-sm max-w-sm leading-relaxed">
                  We combine design, development, and strategy to build digital products that work — and look the part.
                </p>
              </ScrollReveal>
            </div>

            <div>
              {dict.home.services.list.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 0.04}>
                  <div className="group border-t border-white/[0.08] py-8 md:py-10 flex items-center justify-between gap-6 cursor-pointer" data-cursor-hover>
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="text-accent/60 text-2xl md:text-3xl font-display tabular-nums font-normal w-12 md:w-16 group-hover:text-accent transition-colors duration-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-[-0.01em] group-hover:translate-x-3 transition-all duration-500">
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="hidden lg:block text-white/20 text-sm max-w-[280px] text-right leading-relaxed group-hover:text-white/40 transition-colors duration-500">
                        {service.description}
                      </p>
                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500">
                        <span className="text-white/20 group-hover:text-accent transition-colors duration-500 text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
              {/* Bottom border */}
              <div className="border-t border-white/[0.08]" />
            </div>
          </div>
        </section>

        {/* ═══ CTA — dramatic, over water ═══ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 text-center">
          <div className="max-w-[1000px] mx-auto">
            <TextReveal
              tag="h2"
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-normal tracking-[-0.03em] leading-[0.92] text-[#030303]"
              stagger={0.05}
            >
              {dict.home.cta.title}
            </TextReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-base md:text-lg text-foreground/40 mt-10 mb-14 max-w-md mx-auto leading-relaxed">
                {dict.home.cta.subtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <MagneticButton className="inline-block">
                <Link
                  href={`/${lang}/contact`}
                  className="group inline-flex items-center gap-4 text-[12px] tracking-[0.2em] uppercase bg-[#030303] text-white rounded-full px-14 py-6 hover:bg-accent transition-all duration-500"
                  data-cursor-hover
                >
                  {dict.home.cta.button}
                  <span className="group-hover:translate-x-2 transition-transform duration-500">
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
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=800&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&h=800&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&h=800&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1920&h=800&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=800&fit=crop",
};
