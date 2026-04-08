import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/auth-context";
import { CustomCursor } from "@/components/custom-cursor";
import { LiquidBackground } from "@/components/liquid-background";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

const fontFamilyMap: Record<Locale, string> = {
  en: "var(--font-geist), sans-serif",
  fr: "var(--font-geist), sans-serif",
  es: "var(--font-geist), sans-serif",
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  // Detect if we're on the homepage (children will be the immersive experience)
  // Other pages (about, contact, intranet) get the normal navbar/footer layout

  return (
    <div style={{ fontFamily: fontFamilyMap[lang] }} className="relative h-screen overflow-hidden bg-[#060a10]">
      <AuthProvider>
        <CustomCursor />
        <LiquidBackground />
        {children}
      </AuthProvider>
    </div>
  );
}
