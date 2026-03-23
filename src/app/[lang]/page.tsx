import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import { VideoHero } from "@/components/video-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";
import { ProjectCard } from "@/components/project-card";

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
      {/* ═══ HERO — Full viewport, animated gradient, massive type ═══ */}
      <VideoHero
        line1={dict.home.hero.line1}
        line2={dict.home.hero.line2}
        line3={dict.home.hero.line3}
      />

      {/* ═══ MARQUEE — Running text strip ═══ */}
      <div className="py-6 border-y border-border bg-background">
        <Marquee speed={25} className="text-foreground">
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            Websites &amp; Apps
          </span>
          <span className="text-accent text-lg mx-4">✦</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            Social Media
          </span>
          <span className="text-accent text-lg mx-4">✦</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            AI Video
          </span>
          <span className="text-accent text-lg mx-4">✦</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            Branding
          </span>
          <span className="text-accent text-lg mx-4">✦</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            E-Commerce
          </span>
          <span className="text-accent text-lg mx-4">✦</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            Prototypes
          </span>
          <span className="text-accent text-lg mx-4">✦</span>
        </Marquee>
      </div>

      {/* ═══ BIG STATEMENT ═══ */}
      <section className="py-32 md:py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <blockquote className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-tight">
              &ldquo;Code and design are just tools.
              <span className="text-accent"> What makes work unforgettable</span> is
              understanding the people behind the brand.&rdquo;
            </blockquote>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-sm text-muted tracking-wide">
                Syrena Creative, Warsaw
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FEATURED PROJECT — Cinematic full-width ═══ */}
      <section className="px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-sm tracking-[0.2em] uppercase text-muted">
                {dict.home.projects.title}
              </h2>
              <span className="text-sm text-muted">
                {projects.length} projects
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="h-px bg-border animate-expand-line mb-12" />
          </ScrollReveal>

          {/* Hero project — full width */}
          <ScrollReveal>
            <ProjectCard project={projects[0]} index={0} variant="featured" />
          </ScrollReveal>

          {/* 2-up grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-12">
            {projects.slice(1, 3).map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.15}>
                <ProjectCard project={project} index={i + 1} />
              </ScrollReveal>
            ))}
          </div>

          {/* Another full-width hero */}
          <div className="mt-12">
            <ScrollReveal>
              <ProjectCard project={projects[3]} index={3} variant="featured" />
            </ScrollReveal>
          </div>

          {/* Final 2-up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-12">
            {projects.slice(4).map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.15}>
                <ProjectCard project={project} index={i + 4} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES — What we can build ═══ */}
      <section className="py-32 md:py-40 px-6 md:px-10 mt-24 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-20">
              {dict.home.services.title}
            </h2>
          </ScrollReveal>

          <div className="space-y-0">
            {dict.home.services.list.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.08}>
                <div className="group border-b border-white/10 py-8 md:py-10 flex items-start md:items-center justify-between gap-6 cursor-pointer hover:pl-4 transition-all duration-500">
                  <div className="flex items-start md:items-center gap-6 md:gap-10">
                    <span className="text-white/20 text-sm tabular-nums font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="hidden md:block text-sm text-white/40 max-w-xs text-right">
                    {service.description}
                  </p>
                  <span className="text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all duration-300 text-xl">
                    →
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {[
            { value: "6+", label: "Active Projects" },
            { value: "€0", label: "Pilot Cost" },
            { value: "€200", label: "Starting Package" },
            { value: "∞", label: "Ambition" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-light text-accent mb-3">
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-white/40">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ CTA — Big, bold, impossible to ignore ═══ */}
      <section className="py-32 md:py-44 px-6 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95]">
              {dict.home.cta.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-muted mt-8 mb-12 max-w-xl mx-auto">
              {dict.home.cta.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase border-2 border-foreground rounded-full px-12 py-5 hover:bg-foreground hover:text-background transition-all duration-500"
            >
              {dict.home.cta.button}
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
