"use client";

const items = [
  "Design",
  "Development",
  "Strategy",
  "Branding",
  "E-Commerce",
  "Web Apps",
  "Warsaw",
];

export function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-6 md:py-8 bg-[#030303] select-none">
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: "25s" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center text-white/70 text-sm md:text-base tracking-[0.15em] uppercase mx-6 md:mx-10">
            {item}
            <span className="ml-6 md:ml-10 text-accent/50 text-xs">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
