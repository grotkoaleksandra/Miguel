import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ExperienceProvider } from "@/contexts/experience-context";
import { IntroGate } from "@/components/intro-gate";
import { Centerpiece } from "@/components/centerpiece";
import { VerticalToolbar } from "@/components/vertical-toolbar";
import { ContentPanel } from "@/components/content-panel";
import { BrandMark } from "@/components/brand-mark";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <ExperienceProvider>
      <IntroGate />
      {/* LiquidBackground is in the layout at z-0 */}
      <Centerpiece />
      <ContentPanel dict={dict} />
      <VerticalToolbar />
      <BrandMark />
    </ExperienceProvider>
  );
}
