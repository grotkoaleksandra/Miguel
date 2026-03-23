import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ScrollReveal } from "@/components/scroll-reveal";

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
      <section className="min-h-[50vh] flex items-end bg-black text-white px-6 md:px-10 pb-20">
        <div className="max-w-6xl w-full pt-32">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight animate-fade-up">
            {dict.contact.title}
          </h1>
          <p className="text-lg md:text-xl text-white/50 mt-6 max-w-xl animate-fade-up animate-delay-2">
            {dict.contact.description}
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Form */}
          <div>
            <form className="space-y-10">
              <ScrollReveal>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] tracking-[0.2em] uppercase text-muted mb-4"
                  >
                    {dict.contact.form.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full border-b-2 border-border bg-transparent py-4 text-xl focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] tracking-[0.2em] uppercase text-muted mb-4"
                  >
                    {dict.contact.form.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border-b-2 border-border bg-transparent py-4 text-xl focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] tracking-[0.2em] uppercase text-muted mb-4"
                  >
                    {dict.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border-b-2 border-border bg-transparent py-4 text-xl focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase border-2 border-foreground rounded-full px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  {dict.contact.form.submit}
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </button>
              </ScrollReveal>
            </form>
          </div>

          {/* Info */}
          <div className="md:pt-4">
            <ScrollReveal delay={0.1}>
              <div className="space-y-10">
                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@syrenacreative.com"
                    className="text-lg link-hover hover:text-accent transition-colors"
                  >
                    hello@syrenacreative.com
                  </a>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                    Location
                  </h3>
                  <p className="text-lg">Warsaw, Poland</p>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                    Pricing
                  </h3>
                  <p className="text-lg">Free pilot → €200 packages</p>
                  <p className="text-sm text-muted mt-1">
                    We offer a free first project to prove our value.
                  </p>
                </div>

                <div>
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                    Social
                  </h3>
                  <div className="flex gap-6">
                    <span className="text-lg link-hover cursor-pointer">Instagram</span>
                    <span className="text-lg link-hover cursor-pointer">TikTok</span>
                    <span className="text-lg link-hover cursor-pointer">LinkedIn</span>
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
