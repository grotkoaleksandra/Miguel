import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

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
      <section className="min-h-[60vh] flex items-end bg-black text-white px-6 md:px-10 pb-16">
        <div className="max-w-5xl w-full pt-32">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-6 animate-fade-up">
            {dict.about.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl animate-fade-up animate-delay-2">
            {dict.about.description}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm tracking-widest uppercase text-muted mb-12">
            {dict.about.history.title}
          </h2>
          <p className="text-2xl md:text-3xl leading-relaxed font-light">
            {dict.about.history.content}
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm tracking-widest uppercase text-muted mb-12">
            {dict.home.services.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {dict.home.services.list.map((service) => (
              <div key={service.title}>
                <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
