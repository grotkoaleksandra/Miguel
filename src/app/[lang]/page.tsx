import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { HeroSection } from "@/components/hero-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { ServicesSection } from "@/components/services-section";
import { CtaSection } from "@/components/cta-section";

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
      <HeroSection dict={dict} />
      <ProjectsGrid dict={dict} />
      <ServicesSection dict={dict} />
      <CtaSection dict={dict} lang={lang} />
    </>
  );
}
