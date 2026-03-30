const REASONS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Superior Quality",
    desc: "We source only exceptional, sustainable products from trusted suppliers worldwide. MSC certified range available across multiple species.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6.5 12c3-6 11-6 14.5 0-3.5 6-11.5 6-14.5 0z" />
        <circle cx="17" cy="12" r="1" fill="currentColor" />
        <path d="M2 12s1.5-2 3-2c0 0-1.5 2 0 4-1.5 0-3-2-3-2z" />
      </svg>
    ),
    title: "Fresh Is Always Fresh",
    desc: "Daily deliveries Monday to Saturday. Your fish arrives hours from the market, never days.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M9 21V13h6v8" />
        <path d="M3 8h18" />
      </svg>
    ),
    title: "Scale & Reliability",
    desc: "2,500+ pallet frozen storage facility in North London. One of the largest seafood inventories in the city.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Expanding Reach",
    desc: "Now delivering to Birmingham and areas outside the M25. The same premium quality, broader coverage.",
  },
  {
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
    title: "Industry Expertise",
    desc: "Since 2007, we\u2019ve partnered with London\u2019s top chefs. We advise on specials, seasonal availability, and menu solutions.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 20H7c0-4 2-6 2-10a3 3 0 016 0" />
        <path d="M6 14h8" />
      </svg>
    ),
    title: "Competitive Pricing",
    desc: "Extensive stock levels and direct sourcing mean we offer the best rates. Premium doesn\u2019t require premium prices.",
  },
];

export default function WhyParadise() {
  return (
    <section
      className="border-t border-white/[0.04] px-6 py-[100px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(10,125,140,0.04) 0%, transparent 100%)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
          Why Paradise
        </p>
        <h2 className="mb-[60px] text-center font-serif text-[clamp(30px,4vw,48px)] font-bold text-brand-cream">
          Trusted by London&rsquo;s{" "}
          <span className="italic text-brand-gold">Finest</span>
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <div
              key={i}
              className="rounded-[14px] border border-white/5 bg-white/[0.02] px-8 py-9"
            >
              <div className="mb-5 text-brand-gold">{reason.icon}</div>
              <h3 className="mb-2.5 font-serif text-[22px] font-bold text-brand-cream">
                {reason.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-brand-muted">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
