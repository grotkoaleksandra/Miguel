import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";
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
      <section className="min-h-[70vh] flex items-end bg-black text-white px-6 md:px-10 pb-20">
        <div className="max-w-6xl w-full pt-32">
          <div className="text-sm tracking-[0.2em] uppercase text-white/40 mb-8 animate-fade-up">
            {dict.about.title}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight max-w-4xl animate-fade-up animate-delay-2">
            {dict.about.description}
          </h1>
        </div>
      </section>

      {/* Approach — big statement */}
      <section className="py-32 md:py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm tracking-[0.2em] uppercase text-muted mb-12">
              {dict.about.history.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light">
              {dict.about.history.content}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services — list style like Locomotive */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm tracking-[0.2em] uppercase text-white/40 mb-16">
              {dict.home.services.title}
            </h2>
          </ScrollReveal>
          {dict.home.services.list.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="group border-b border-white/10 py-8 md:py-10 flex items-center justify-between gap-6 hover:pl-4 transition-all duration-500">
                <div className="flex items-center gap-8">
                  <span className="text-white/20 text-sm font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <span className="text-white/20 group-hover:text-accent transition-colors duration-300">→</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="py-6 bg-accent text-white">
        <Marquee speed={20}>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            Let&apos;s build something great together
          </span>
          <span className="text-lg mx-4">✦</span>
          <span className="text-sm tracking-[0.3em] uppercase mx-8">
            Free pilot for your first project
          </span>
          <span className="text-lg mx-4">✦</span>
        </Marquee>
      </div>

      {/* CTA */}
      <section className="py-32 md:py-40 px-6 md:px-10 text-center">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-10">
            {dict.home.cta.title}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase border-2 border-foreground rounded-full px-12 py-5 hover:bg-foreground hover:text-background transition-all duration-500"
          >
            {dict.home.cta.button}
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
