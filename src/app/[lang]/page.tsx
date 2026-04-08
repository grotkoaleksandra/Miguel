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
    <div className="bg-[#060a10] text-white">
      {/* ═══ HERO ═══ */}
      <VideoHero
        line1={dict.home.hero.line1}
        line2={dict.home.hero.line2}
        line3={dict.home.hero.line3}
      />

      <div className="relative z-10">

        {/* ═══ STATEMENT ═══ */}
        <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 border-t border-white/[0.04]">
          <div className="max-w-[1200px] mx-auto">
            <TextReveal
              tag="p"
              className="font-display text-[6.5vw] md:text-[3.2vw] font-normal leading-[1.15] tracking-[-0.02em] text-white/90"
              stagger={0.03}
            >
              Code and design are just tools. What makes work unforgettable is understanding the people behind the brand.
            </TextReveal>
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section className="pt-16 pb-32 md:pb-48 px-8 md:px-16 lg:px-24 border-t border-white/[0.04]">
          <div className="max-w-[1400px] mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-24">
                <h2 className="text-[10px] tracking-[0.4em] uppercase text-white/30">
                  Selected Work
                </h2>
                <div className="h-[1px] flex-1 bg-white/[0.04] mx-8" />
                <span className="text-[10px] text-white/20 tracking-wider">{projects.length}</span>
              </div>
            </ScrollReveal>

            <div className="space-y-20 md:space-y-28">
              {projects.map((project, i) => (
                <ScrollReveal key={project.title} delay={0.05}>
                  <Link href={`/${lang}/contact`} className="group block" data-cursor-hover>
                    <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
                      {/* Number */}
                      <div className="col-span-1 hidden md:block">
                        <span className="text-white/[0.06] text-5xl font-display">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Image */}
                      <div className={`col-span-12 md:col-span-6 ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-2"}`}>
                        <div className="relative overflow-hidden aspect-[16/10]">
                          <img
                            src={projectImages[project.title] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=750&fit=crop"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="col-span-12 md:col-span-4 md:pl-8">
                        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase block mb-4">
                          {project.category}
                        </span>
                        <h3 className="font-display text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 group-hover:text-white/70 transition-colors duration-500">
                          {project.title}
                        </h3>
                        <p className="text-white/25 text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-0 group-hover:w-8 h-[1px] bg-white/40 transition-all duration-700" />
                          <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase group-hover:text-white/50 transition-colors duration-500">
                            View project
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className="py-32 md:py-48 px-8 md:px-16 lg:px-24 border-t border-white/[0.04]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-12 gap-8 mb-20 md:mb-32">
              <div className="col-span-12 md:col-span-5">
                <ScrollReveal>
                  <h2 className="font-display text-4xl md:text-5xl font-normal tracking-[-0.02em] leading-[1.1]">
                    What we do
                  </h2>
                </ScrollReveal>
              </div>
              <div className="col-span-12 md:col-span-5 md:col-start-8 flex items-end">
                <ScrollReveal delay={0.1}>
                  <p className="text-white/25 text-sm leading-relaxed">
                    Design, development, and strategy to build digital products that work — and look the part.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <div>
              {dict.home.services.list.map((service, i) => (
                <ScrollReveal key={service.title} delay={i * 0.04}>
                  <div className="group border-t border-white/[0.06] py-7 md:py-9 flex items-center justify-between cursor-pointer" data-cursor-hover>
                    <div className="flex items-center gap-6 md:gap-10">
                      <span className="text-white/10 text-[11px] font-mono w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg md:text-xl font-light tracking-[-0.01em] group-hover:text-white/60 group-hover:translate-x-2 transition-all duration-500">
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-white/0 group-hover:text-white/30 transition-all duration-500 text-sm">→</span>
                  </div>
                </ScrollReveal>
              ))}
              <div className="border-t border-white/[0.06]" />
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="py-40 md:py-56 px-8 md:px-16 lg:px-24 text-center border-t border-white/[0.04]">
          <div className="max-w-[900px] mx-auto">
            <TextReveal
              tag="h2"
              className="font-display text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.03em] leading-[0.95] text-white/90"
              stagger={0.04}
            >
              {dict.home.cta.title}
            </TextReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-white/25 text-sm mt-10 mb-14 max-w-sm mx-auto leading-relaxed">
                {dict.home.cta.subtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <MagneticButton className="inline-block">
                <Link
                  href={`/${lang}/contact`}
                  className="group inline-flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase border border-white/15 rounded-full px-12 py-5 hover:bg-white hover:text-[#060a10] transition-all duration-500"
                  data-cursor-hover
                >
                  {dict.home.cta.button}
                  <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}

const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=750&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=750&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=750&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=750&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&h=750&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=750&fit=crop",
};
