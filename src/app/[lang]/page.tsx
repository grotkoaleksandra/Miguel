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
      <section className="py-40 md:py-56 px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <TextReveal
            tag="blockquote"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-[1.2] tracking-tight"
            stagger={0.04}
          >
            Code and design are just tools. What makes work unforgettable is understanding the people behind the brand.
          </TextReveal>
          <ScrollReveal delay={0.6}>
            <div className="mt-16 flex items-center gap-4">
              <div className="w-16 h-px bg-accent" />
              <span className="text-xs text-muted tracking-[0.2em] uppercase">
                Syrena Creative, Warsaw
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ PROJECTS — Horizontal Scroll Showcase ═══ */}
      <section className="relative">
        <div className="px-6 md:px-10 mb-12">
          <div className="max-w-7xl mx-auto flex items-baseline justify-between">
            <ScrollReveal>
              <h2 className="text-sm tracking-[0.2em] uppercase text-muted">
                {dict.home.projects.title}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <span className="text-xs text-muted tracking-wider">
                ( {projects.length} )
              </span>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15}>
            <div className="max-w-7xl mx-auto h-px bg-border mt-6" />
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
                className="group flex flex-col items-center gap-4 text-muted hover:text-foreground transition-colors duration-500"
                data-cursor-hover
              >
                <div className="w-24 h-24 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl group-hover:rotate-45 transition-transform duration-500">+</span>
                </div>
                <span className="text-xs tracking-[0.2em] uppercase">Your project</span>
              </Link>
            </MagneticButton>
          </div>
        </HorizontalScroll>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="py-40 md:py-56 px-6 md:px-10 bg-black text-white relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="max-w-7xl mx-auto relative">
          <ScrollReveal>
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/30 mb-24">
              {dict.home.services.title}
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {dict.home.services.list.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.06}>
                <div className="group border-b border-white/[0.06] py-10 md:py-12 flex items-start md:items-center justify-between gap-6 cursor-pointer transition-all duration-700 hover:border-white/20" data-cursor-hover>
                  <div className="flex items-start md:items-center gap-8 md:gap-12">
                    <span className="text-white/15 text-xs tabular-nums font-mono mt-1 md:mt-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-[2.5rem] font-light tracking-tight group-hover:text-accent transition-colors duration-500">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-8">
                    <p className="hidden lg:block text-sm text-white/30 max-w-xs text-right leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                      {service.description}
                    </p>
                    <span className="text-white/15 group-hover:text-accent group-hover:translate-x-2 transition-all duration-500 text-xl">
                      →
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REEL / VISUAL BREAK ═══ */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal direction="none">
            <div className="text-center text-white">
              <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6">Based in</div>
              <div className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">Warsaw</div>
              <div className="text-xs tracking-[0.3em] uppercase text-white/50 mt-6">Working globally</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-40 md:py-56 px-6 md:px-10 text-center relative">
        <div className="max-w-5xl mx-auto">
          <TextReveal
            tag="h2"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter leading-[0.95]"
            stagger={0.05}
          >
            {dict.home.cta.title}
          </TextReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg md:text-xl text-muted mt-10 mb-14 max-w-xl mx-auto leading-relaxed">
              {dict.home.cta.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <MagneticButton className="inline-block">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase border border-foreground rounded-full px-14 py-6 hover:bg-foreground hover:text-background transition-all duration-700"
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
