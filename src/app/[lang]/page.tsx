import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero — full viewport, large typography */}
      <section className="relative min-h-screen flex items-center bg-black text-white px-6 md:px-10">
        <div className="max-w-5xl w-full pt-20">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium leading-[0.95] tracking-tight">
            <span className="block animate-fade-up">{dict.home.hero.line1}</span>
            <span className="block animate-fade-up animate-delay-2">{dict.home.hero.line2}</span>
            <span className="block animate-fade-up animate-delay-4 text-accent">{dict.home.hero.line3}</span>
          </h1>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up animate-delay-5">
          <div className="w-px h-16 bg-white/30 mx-auto mb-3" />
          <span className="text-xs tracking-widest uppercase text-white/50">Scroll</span>
        </div>
      </section>

      {/* Selected Work — Project Grid */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-16">
            <h2 className="text-sm tracking-widest uppercase text-muted">
              {dict.home.projects.title}
            </h2>
            <span className="text-sm text-muted">
              {dict.home.projects.list.length} projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {dict.home.projects.list.map((project, i) => (
              <div key={project.title} className="project-card group cursor-pointer">
                {/* Image placeholder */}
                <div className="relative aspect-[4/3] bg-neutral-100 rounded-sm overflow-hidden mb-5">
                  <div className="project-image absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                    <span className="text-6xl md:text-7xl font-light text-neutral-400/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs tracking-wide px-3 py-1 rounded-full ${
                      project.status === "In Progress"
                        ? "bg-black text-white"
                        : "bg-white/90 text-black"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted mt-1">{project.description}</p>
                  </div>
                  <span className="text-xs tracking-widest uppercase text-muted whitespace-nowrap mt-1.5">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 px-6 md:px-10 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm tracking-widest uppercase text-white/50 mb-16">
            {dict.home.services.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {dict.home.services.list.map((service) => (
              <div
                key={service.title}
                className="bg-black p-8 md:p-10 group hover:bg-white/5 transition-colors duration-300"
              >
                <h3 className="text-lg md:text-xl font-medium mb-3 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 px-6 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6">
            {dict.home.cta.title}
          </h2>
          <p className="text-lg text-muted mb-10">
            {dict.home.cta.subtitle}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block text-sm tracking-widest uppercase border border-black rounded-full px-10 py-4 hover:bg-black hover:text-white transition-all duration-300"
          >
            {dict.home.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
