const DIFFERENTIATORS = [
  {
    title: "Quality Without Compromise",
    desc: "We reject anything that doesn\u2019t meet our standards. Every product is hand-selected.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Relationships, Not Transactions",
    desc: "Amir works closely with chefs to understand their kitchens and the standards they demand. We\u2019re partners, not just suppliers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M11 17.5L6 12l.7-.7c.9-.9 2.5-.9 3.4 0l1.5 1.5" />
        <path d="m14 14 2.5 2.5" />
        <path d="M18 9.5L13.5 14" />
        <path d="M2 9l4.6-2.7a2 2 0 012-.1L12 8" />
        <path d="m22 9-4.6-2.7a2 2 0 00-2-.1L12 8" />
        <path d="M2 9v7l3 3" />
        <path d="M22 9v7l-3 3" />
      </svg>
    ),
  },
  {
    title: "Service At Any Hour",
    desc: "Need a last-minute order? Call us. We\u2019ll do everything we can to make it happen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function OurDifference() {
  return (
    <section className="border-t border-white/[0.04] px-6 py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
          Our Difference
        </p>
        <h2 className="mb-[60px] text-center font-serif text-[clamp(30px,4vw,48px)] font-bold text-brand-cream">
          What Sets Us{" "}
          <span className="italic text-brand-gold">Apart</span>
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {DIFFERENTIATORS.map((item, i) => (
            <div
              key={i}
              className="rounded-[14px] border border-white/5 bg-white/[0.02] px-8 py-9"
            >
              <div className="mb-5 text-brand-gold">{item.icon}</div>
              <h3 className="mb-2.5 font-serif text-[22px] font-bold text-brand-cream">
                {item.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-brand-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
