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
      {/* ═══ HERO — water + massive type ═══ */}
      <VideoHero
        line1={dict.home.hero.line1}
        line2={dict.home.hero.line2}
        line3={dict.home.hero.line3}
      />

      <div className="relative z-10">

        {/* ═══ MANIFESTO — extreme scale, asymmetric ═══ */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Giant background number */}
          <div className="absolute -right-[5vw] top-1/2 -translate-y-1/2 pointer-events-none select-none">
            <ScrollReveal direction="right">
              <span className="text-[35vw] md:text-[25vw] font-display font-normal leading-none text-foreground/[0.03]">
                SC
              </span>
            </ScrollReveal>
          </div>

          <div className="relative px-6 md:px-12 lg:px-20">
            <div className="max-w-[1400px] mx-auto">
              {/* Small label offset left */}
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/30 block mb-8 md:mb-12 md:ml-[8%]">
                  ( Philosophy )
                </span>
              </ScrollReveal>

              {/* Big statement — pushed right */}
              <div className="md:ml-[15%] max-w-[900px]">
                <TextReveal
                  tag="p"
                  className="font-display text-[7vw] md:text-[3.5vw] font-normal leading-[1.1] tracking-[-0.02em] text-foreground"
                  stagger={0.025}
                >
                  Code and design are just tools. What makes work unforgettable is understanding the people behind the brand.
                </TextReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ PROJECTS — asymmetric, overlapping, editorial ═══ */}
        <section className="relative py-16 md:py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-[1600px] mx-auto">
            {/* Section label */}
            <ScrollReveal>
              <div className="flex items-center gap-6 mb-20 md:mb-32">
                <span className="text-[10px] tracking-[0.4em] uppercase text-foreground/30">
                  Selected Work
                </span>
                <div className="flex-1 h-[1px] bg-foreground/[0.06]" />
                <span className="text-[10px] tracking-[0.15em] text-foreground/20">
                  {projects.length} Projects
                </span>
              </div>
            </ScrollReveal>

            {/* Asymmetric project grid */}
            <div className="space-y-32 md:space-y-48">
              {projects.map((project, i) => {
                // Alternate between different asymmetric layouts
                const layouts = [
                  // Large left, info right-aligned
                  { imgClass: "md:w-[65%]", infoClass: "md:ml-auto md:w-[40%] md:-mt-20", imgAspect: "aspect-[3/4]" },
                  // Indented right, info left
                  { imgClass: "md:w-[55%] md:ml-auto", infoClass: "md:w-[45%] md:-mt-16", imgAspect: "aspect-[4/3]" },
                  // Full width cinematic
                  { imgClass: "w-full", infoClass: "md:w-[50%] md:-mt-24 md:ml-[5%]", imgAspect: "aspect-[21/9]" },
                  // Small offset
                  { imgClass: "md:w-[50%] md:ml-[10%]", infoClass: "md:w-[40%] md:ml-auto md:-mt-12", imgAspect: "aspect-[3/4]" },
                  // Wide with overlap
                  { imgClass: "md:w-[70%] md:ml-[15%]", infoClass: "md:w-[35%] md:-mt-20", imgAspect: "aspect-[16/9]" },
                  // Narrow tall
                  { imgClass: "md:w-[45%] md:ml-[30%]", infoClass: "md:w-[50%] md:-mt-16 md:ml-[5%]", imgAspect: "aspect-[2/3]" },
                ];
                const layout = layouts[i % layouts.length];

                return (
                  <ScrollReveal key={project.title} delay={0.05}>
                    <div className="relative">
                      {/* Giant index number — bleeds off edge */}
                      <div className={`absolute ${i % 2 === 0 ? "-left-[3vw]" : "-right-[3vw]"} -top-[4vw] pointer-events-none select-none`}>
                        <span className="text-[20vw] md:text-[12vw] font-display font-normal leading-none text-foreground/[0.04]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Image */}
                      <div className={`${layout.imgClass} group cursor-pointer`} data-cursor-hover>
                        <div className={`relative overflow-hidden ${layout.imgAspect}`}>
                          <img
                            src={projectImageMap[project.title] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1200&fit=crop"}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          />
                        </div>
                      </div>

                      {/* Info — overlaps image */}
                      <div className={`relative ${layout.infoClass} mt-6 md:mt-0`}>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/25 block mb-3">
                          {project.category}
                        </span>
                        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.02em] mb-3">
                          {project.title}
                        </h3>
                        <p className="text-foreground/35 text-sm leading-relaxed max-w-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES — dark, typographic, not a boring list ═══ */}
        <section className="py-24 md:py-40 bg-[#030303] text-white overflow-hidden">
          <div className="px-6 md:px-12 lg:px-20">
            <div className="max-w-[1400px] mx-auto">
              {/* Big title spanning full width */}
              <ScrollReveal>
                <h2 className="font-display text-[12vw] md:text-[8vw] font-normal tracking-[-0.03em] leading-[0.9] mb-16 md:mb-28">
                  Capabilities
                </h2>
              </ScrollReveal>

              {/* Services in a 2-col asymmetric grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 md:gap-y-16">
                {dict.home.services.list.map((service, i) => (
                  <ScrollReveal key={service.title} delay={i * 0.06}>
                    <div className={`group cursor-pointer ${i % 2 !== 0 ? "md:mt-12" : ""}`} data-cursor-hover>
                      <div className="flex items-start gap-4 mb-3">
                        <span className="text-accent text-[11px] font-mono mt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-light tracking-[-0.01em] group-hover:translate-x-3 transition-transform duration-700">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-white/20 text-sm leading-relaxed ml-10 group-hover:text-white/40 transition-colors duration-700">
                        {service.description}
                      </p>
                      <div className="mt-4 ml-10 w-0 group-hover:w-16 h-[1px] bg-accent transition-all duration-700" />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA — massive, over water ═══ */}
        <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="max-w-[1600px] mx-auto relative">
            {/* Background decorative text */}
            <div className="absolute -left-[5vw] top-1/2 -translate-y-1/2 pointer-events-none select-none">
              <span className="text-[40vw] md:text-[20vw] font-display font-normal leading-none text-foreground/[0.03]">?</span>
            </div>

            <div className="relative text-center">
              <TextReveal
                tag="h2"
                className="font-display text-[10vw] md:text-[7vw] font-normal tracking-[-0.04em] leading-[0.9] text-foreground"
                stagger={0.04}
              >
                {dict.home.cta.title}
              </TextReveal>
              <ScrollReveal delay={0.4}>
                <p className="text-foreground/30 text-base mt-8 mb-12 max-w-md mx-auto">
                  {dict.home.cta.subtitle}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <MagneticButton className="inline-block">
                  <Link
                    href={`/${lang}/contact`}
                    className="group relative inline-flex items-center gap-5 text-[12px] tracking-[0.2em] uppercase bg-foreground text-white rounded-full px-14 py-6 overflow-hidden hover:bg-accent transition-colors duration-500"
                    data-cursor-hover
                  >
                    {dict.home.cta.button}
                    <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                  </Link>
                </MagneticButton>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const projectImageMap: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1200&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1200&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920&h=1200&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&h=1200&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1920&h=1200&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=1200&fit=crop",
};
