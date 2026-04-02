import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { VideoHero } from "@/components/video-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ProjectCard } from "@/components/project-card";
import { TextReveal } from "@/components/text-reveal";
import { HorizontalScroll } from "@/components/horizontal-scroll";
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
      {/* ═══ HERO ═══ */}
      <VideoHero
        line1={dict.home.hero.line1}
        line2={dict.home.hero.line2}
        line3={dict.home.hero.line3}
      />

      {/* ═══ BIG STATEMENT ═══ */}
      <section className="py-40 md:py-60 px-6 md:px-10 relative">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="text-[11px] tracking-[0.3em] uppercase text-muted mb-16">
              Philosophy
            </div>
          </ScrollReveal>
          <TextReveal
            tag="blockquote"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-normal leading-[1.15] tracking-[-0.01em]"
            stagger={0.04}
          >
            Code and design are just tools. What makes work unforgettable is understanding the people behind the brand.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <div className="mt-20 flex items-center gap-6">
              <div className="w-20 h-[1px] bg-foreground/20" />
              <span className="text-[11px] text-muted tracking-[0.25em] uppercase">
                Syrena Creative, Warsaw
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PROJECTS — Horizontal Scroll Showcase ═══ */}
      <section className="relative">
        <div className="px-6 md:px-10 mb-16">
          <div className="max-w-[1600px] mx-auto flex items-baseline justify-between">
            <ScrollReveal>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-muted">
                {dict.home.projects.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="text-[11px] text-muted/60 tracking-[0.15em]">
                ( {projects.length} )
              </span>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15}>
            <div className="max-w-[1600px] mx-auto h-[1px] bg-foreground/[0.08] mt-8" />
          </ScrollReveal>
        </div>

        <HorizontalScroll className="h-[300vh]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} variant="horizontal" />
          ))}
          {/* End card */}
          <div className="flex-shrink-0 w-[40vw] md:w-[25vw] flex items-center justify-center">
            <MagneticButton>
              <Link
                href={`/${lang}/contact`}
                className="group flex flex-col items-center gap-5 text-muted hover:text-foreground transition-colors duration-700"
                data-cursor-hover
              >
                <div className="w-28 h-28 rounded-full border border-foreground/15 flex items-center justify-center group-hover:scale-110 group-hover:border-foreground/40 transition-all duration-700">
                  <span className="text-2xl group-hover:rotate-90 transition-transform duration-700">+</span>
                </div>
                <span className="text-[11px] tracking-[0.25em] uppercase">Your project</span>
              </Link>
            </MagneticButton>
          </div>
        </HorizontalScroll>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="py-40 md:py-60 px-6 md:px-10 bg-[#030303] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative">
          <ScrollReveal>
            <h2 className="text-[11px] tracking-[0.3em] uppercase text-white/25 mb-28">
              {dict.home.services.title}
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {dict.home.services.list.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.06}>
                <div className="group border-b border-white/[0.06] py-10 md:py-14 flex items-start md:items-center justify-between gap-6 cursor-pointer transition-all duration-700 hover:border-white/15" data-cursor-hover>
                  <div className="flex items-start md:items-center gap-8 md:gap-16">
                    <span className="text-white/10 text-[11px] tabular-nums font-mono mt-1 md:mt-0 tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl lg:text-[2.8rem] font-normal tracking-[-0.01em] group-hover:text-accent transition-colors duration-700">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-10">
                    <p className="hidden lg:block text-[13px] text-white/25 max-w-xs text-right leading-relaxed group-hover:text-white/40 transition-colors duration-700">
                      {service.description}
                    </p>
                    <span className="text-white/10 group-hover:text-accent group-hover:translate-x-2 transition-all duration-700 text-lg">
                      →
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL BREAK ═══ */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal direction="none">
            <div className="text-center text-white">
              <div className="text-[11px] tracking-[0.4em] uppercase text-white/40 mb-8">Based in</div>
              <div className="font-display text-6xl md:text-8xl lg:text-9xl font-normal tracking-[-0.02em]">Warsaw</div>
              <div className="text-[11px] tracking-[0.4em] uppercase text-white/40 mt-8">Working globally</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-40 md:py-60 px-6 md:px-10 text-center relative">
        <div className="max-w-5xl mx-auto">
          <TextReveal
            tag="h2"
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-normal tracking-[-0.02em] leading-[0.95]"
            stagger={0.05}
          >
            {dict.home.cta.title}
          </TextReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-base md:text-lg text-muted mt-12 mb-16 max-w-lg mx-auto leading-relaxed">
              {dict.home.cta.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <MagneticButton className="inline-block">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-4 text-[12px] tracking-[0.2em] uppercase border border-foreground/20 rounded-full px-14 py-6 hover:bg-foreground hover:text-background transition-all duration-700"
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
    </>
  );
}
