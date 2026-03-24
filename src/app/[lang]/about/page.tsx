import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-end bg-black text-white px-6 md:px-10 pb-24 relative overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="max-w-6xl w-full pt-32 relative z-10">
          <ScrollReveal>
            <div className="text-xs tracking-[0.3em] uppercase text-white/30 mb-10">
              {dict.about.title}
            </div>
          </ScrollReveal>
          <TextReveal
            tag="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight max-w-5xl"
            stagger={0.04}
          >
            {dict.about.description}
          </TextReveal>
        </div>
      </section>

      {/* Approach */}
      <section className="py-40 md:py-56 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs tracking-[0.3em] uppercase text-muted mb-16">
              {dict.about.history.title}
            </h2>
          </ScrollReveal>
          <TextReveal
            tag="p"
            className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light"
            stagger={0.03}
          >
            {dict.about.history.content}
          </TextReveal>
        </div>
      </section>

      {/* Visual break */}
      <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Services */}
      <section className="py-32 md:py-44 px-6 md:px-10 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal>
            <h2 className="text-xs tracking-[0.3em] uppercase text-white/30 mb-20">
              {dict.home.services.title}
            </h2>
          </ScrollReveal>
          {dict.home.services.list.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.06}>
              <div className="group border-b border-white/[0.06] py-10 md:py-12 flex items-center justify-between gap-6 transition-all duration-700 hover:border-white/20" data-cursor-hover>
                <div className="flex items-center gap-10">
                  <span className="text-white/15 text-xs font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight group-hover:text-accent transition-colors duration-500">
                    {service.title}
                  </h3>
                </div>
                <span className="text-white/15 group-hover:text-accent group-hover:translate-x-2 transition-all duration-500">→</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 md:py-56 px-6 md:px-10 text-center">
        <TextReveal
          tag="h2"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-12"
          stagger={0.05}
        >
          {dict.home.cta.title}
        </TextReveal>
        <ScrollReveal delay={0.4}>
          <MagneticButton className="inline-block">
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase border border-foreground rounded-full px-14 py-6 hover:bg-foreground hover:text-background transition-all duration-700"
              data-cursor-hover
            >
              {dict.home.cta.button}
              <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </Link>
          </MagneticButton>
        </ScrollReveal>
      </section>
    </>
  );
}
