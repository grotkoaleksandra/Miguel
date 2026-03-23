import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

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
      <section className="min-h-[50vh] flex items-end bg-black text-white px-6 md:px-10 pb-16">
        <div className="max-w-5xl w-full pt-32">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight mb-6 animate-fade-up">
            {dict.contact.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl animate-fade-up animate-delay-2">
            {dict.contact.description}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <form className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block text-xs tracking-widest uppercase text-muted mb-3"
              >
                {dict.contact.form.name}
              </label>
              <input
                id="name"
                type="text"
                className="w-full border-b border-border bg-transparent py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-widest uppercase text-muted mb-3"
              >
                {dict.contact.form.email}
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-b border-border bg-transparent py-3 text-lg focus:outline-none focus:border-foreground transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs tracking-widest uppercase text-muted mb-3"
              >
                {dict.contact.form.message}
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full border-b border-border bg-transparent py-3 text-lg focus:outline-none focus:border-foreground transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-block text-sm tracking-widest uppercase border border-foreground rounded-full px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {dict.contact.form.submit}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
