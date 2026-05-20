import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { ProjectsGrid } from "@/components/projects-grid";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-black text-white">
      <section className="pt-40 md:pt-56 pb-10 px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-12 md:col-span-3">
            <span className="type-caption text-white/50">
              {dict.nav.work}
            </span>
          </div>
          <div className="col-span-12 md:col-span-9 mt-6 md:mt-0">
            <h1
              className="text-white"
              style={{
                fontFamily: '"Times New Roman", serif',
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(48px, 7vw, 96px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {dict.home.projects.title}
            </h1>
          </div>
        </div>
      </section>

      <ProjectsGrid dict={dict} />
    </main>
  );
}
