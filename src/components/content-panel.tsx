"use client";

import { useExperience } from "@/contexts/experience-context";
import type { Dictionary } from "@/i18n/types";

const projectImages: Record<string, string> = {
  "Syrena Travel": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop",
  "Max Kennedy": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
  "Yoga Studio": "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=500&fit=crop",
  "Massage Therapist": "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&h=500&fit=crop",
  "Art Marketplace": "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=500&fit=crop",
  "Cultural Magazine": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop",
};

export function ContentPanel({ dict }: { dict: Dictionary }) {
  const { activeSection, setActiveSection } = useExperience();

  if (!activeSection) return null;

  return (
    <div
      className="fixed inset-0 z-[40] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveSection(activeSection);
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#f5f0eb]/60 backdrop-blur-xl animate-fade-in" />

      {/* Panel */}
      <div
        className="relative z-10 w-[calc(100vw-5rem)] md:w-[calc(100vw-8rem)] max-w-[1200px] max-h-[80vh] overflow-y-auto p-8 md:p-12"
        style={{ animation: "panelIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        {/* Close */}
        <button
          onClick={() => setActiveSection(activeSection)}
          className="absolute top-0 right-0 text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
          data-cursor-hover
        >
          Close
        </button>

        {activeSection === "work" && <WorkContent dict={dict} />}
        {activeSection === "services" && <ServicesContent dict={dict} />}
        {activeSection === "about" && <AboutContent dict={dict} />}
        {activeSection === "contact" && <ContactContent />}
      </div>
    </div>
  );
}

function WorkContent({ dict }: { dict: Dictionary }) {
  const projects = dict.home.projects.list;
  return (
    <div>
      <h2 className="font-display text-4xl md:text-5xl font-normal tracking-[-0.02em] text-[#1a1a1a] mb-12">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div key={p.title} className="group cursor-pointer" data-cursor-hover>
            <div className="relative overflow-hidden aspect-[16/10] mb-4">
              <img
                src={projectImages[p.title] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop"}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[#1a1a1a] text-lg font-light mb-1">{p.title}</h3>
                <span className="text-[#1a1a1a]/25 text-[10px] tracking-[0.2em] uppercase">{p.category}</span>
              </div>
              <span className="text-[#1a1a1a]/10 text-3xl font-display">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesContent({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <h2 className="font-display text-4xl md:text-5xl font-normal tracking-[-0.02em] text-[#1a1a1a] mb-4">
        What we do
      </h2>
      <p className="text-[#1a1a1a]/35 text-sm mb-12 max-w-md leading-relaxed">
        Design, development, and strategy to build digital products that work — and look the part.
      </p>
      <div className="space-y-0">
        {dict.home.services.list.map((s, i) => (
          <div key={s.title} className="group border-t border-[#1a1a1a]/[0.06] py-6 flex items-center justify-between cursor-pointer" data-cursor-hover>
            <div className="flex items-center gap-6">
              <span className="text-[#1a1a1a]/10 text-[11px] font-mono w-6">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-light text-[#1a1a1a] group-hover:text-[#1a1a1a]/60 group-hover:translate-x-2 transition-all duration-500">
                {s.title}
              </h3>
            </div>
            <span className="text-[#1a1a1a]/0 group-hover:text-[#1a1a1a]/30 transition-all duration-500 text-sm">→</span>
          </div>
        ))}
        <div className="border-t border-[#1a1a1a]/[0.06]" />
      </div>
    </div>
  );
}

function AboutContent({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="font-display text-4xl md:text-5xl font-normal tracking-[-0.02em] text-[#1a1a1a] mb-8">
          {dict.about?.title || "About"}
        </h2>
        <p className="text-[#1a1a1a]/40 text-sm leading-[1.8]">
          {dict.about?.description || "We are a creative studio based in Warsaw, Poland. We design and build digital experiences for bold brands."}
        </p>
      </div>
      <div className="flex flex-col justify-end">
        <div className="space-y-6">
          <div>
            <span className="text-[#1a1a1a]/15 text-[9px] tracking-[0.3em] uppercase block mb-2">Location</span>
            <span className="text-[#1a1a1a]/50 text-sm">Warsaw, Poland</span>
          </div>
          <div>
            <span className="text-[#1a1a1a]/15 text-[9px] tracking-[0.3em] uppercase block mb-2">Contact</span>
            <a href="mailto:hello@syrenacreative.com" className="text-[#1a1a1a]/50 text-sm link-hover hover:text-[#1a1a1a]/80 transition-colors" data-cursor-hover>
              hello@syrenacreative.com
            </a>
          </div>
          <div>
            <span className="text-[#1a1a1a]/15 text-[9px] tracking-[0.3em] uppercase block mb-2">Founded</span>
            <span className="text-[#1a1a1a]/50 text-sm">2025</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="font-display text-4xl md:text-5xl font-normal tracking-[-0.02em] text-[#1a1a1a] mb-4">
          Let&apos;s talk
        </h2>
        <p className="text-[#1a1a1a]/25 text-sm leading-relaxed mb-8">
          Free consultation for your first project.
        </p>
        <a
          href="mailto:hello@syrenacreative.com"
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase border border-[#1a1a1a]/15 rounded-full px-10 py-4 text-[#1a1a1a]/60 hover:bg-[#1a1a1a] hover:text-[#f5f0eb] transition-all duration-500"
          data-cursor-hover
        >
          Send email <span>→</span>
        </a>
      </div>
      <div className="flex flex-col justify-end">
        <div className="space-y-6">
          <div>
            <span className="text-[#1a1a1a]/15 text-[9px] tracking-[0.3em] uppercase block mb-2">Email</span>
            <a href="mailto:hello@syrenacreative.com" className="text-[#1a1a1a]/50 text-sm" data-cursor-hover>
              hello@syrenacreative.com
            </a>
          </div>
          <div>
            <span className="text-[#1a1a1a]/15 text-[9px] tracking-[0.3em] uppercase block mb-2">Based in</span>
            <span className="text-[#1a1a1a]/50 text-sm">Warsaw, Poland</span>
          </div>
        </div>
      </div>
    </div>
  );
}
