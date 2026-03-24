import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { MagneticButton } from "@/components/magnetic-button";

export default async function ContactPage({
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
      <section className="min-h-[60vh] flex items-end bg-black text-white px-6 md:px-10 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="max-w-6xl w-full pt-32 relative z-10">
          <TextReveal
            tag="h1"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter"
            stagger={0.06}
          >
            {dict.contact.title}
          </TextReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-lg md:text-xl text-white/40 mt-8 max-w-xl leading-relaxed">
              {dict.contact.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-32 md:py-44 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          {/* Form */}
          <div>
            <form className="space-y-12">
              <ScrollReveal>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] tracking-[0.25em] uppercase text-muted mb-4"
                  >
                    {dict.contact.form.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border-b border-border bg-transparent py-4 text-xl focus:outline-none focus:border-accent transition-colors duration-500"
                    data-cursor-hover
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] tracking-[0.25em] uppercase text-muted mb-4"
                  >
                    {dict.contact.form.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border-b border-border bg-transparent py-4 text-xl focus:outline-none focus:border-accent transition-colors duration-500"
                    data-cursor-hover
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] tracking-[0.25em] uppercase text-muted mb-4"
                  >
                    {dict.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border-b border-border bg-transparent py-4 text-xl focus:outline-none focus:border-accent transition-colors duration-500 resize-none"
                    data-cursor-hover
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <MagneticButton className="inline-block">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] uppercase border border-foreground rounded-full px-12 py-5 hover:bg-foreground hover:text-background transition-all duration-700"
                    data-cursor-hover
                  >
                    {dict.contact.form.submit}
                    <span className="group-hover:translate-x-2 transition-transform duration-500">
                      →
                    </span>
                  </button>
                </MagneticButton>
              </ScrollReveal>
            </form>
          </div>

          {/* Info */}
          <div className="md:pt-2">
            <ScrollReveal delay={0.1}>
              <div className="space-y-12">
                <div>
                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted mb-4">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@syrenacreative.com"
                    className="text-xl link-hover hover:text-accent transition-colors duration-500"
                    data-cursor-hover
                  >
                    hello@syrenacreative.com
                  </a>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted mb-4">
                    Location
                  </h3>
                  <p className="text-xl">Warsaw, Poland</p>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted mb-4">
                    Pricing
                  </h3>
                  <p className="text-xl">Free pilot → €200 packages</p>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    We offer a free first project to prove our value.
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-muted mb-4">
                    Social
                  </h3>
                  <div className="flex gap-8">
                    <span className="text-lg link-hover cursor-pointer" data-cursor-hover>Instagram</span>
                    <span className="text-lg link-hover cursor-pointer" data-cursor-hover>TikTok</span>
                    <span className="text-lg link-hover cursor-pointer" data-cursor-hover>LinkedIn</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
