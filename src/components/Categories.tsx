import Link from "next/link";

const CATEGORIES = [
  {
    name: "Fresh Fish",
    slug: "fresh-fish",
    count: "60+ species",
    desc: "Daily deliveries, Mon\u2013Sat",
    gradient: "linear-gradient(135deg, #0a3d62, #0e6f5c, #0a7e8c)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6.5 12c3-6 11-6 14.5 0-3.5 6-11.5 6-14.5 0z" />
        <circle cx="17" cy="12" r="1" fill="currentColor" />
        <path d="M2 12s1.5-2 3-2c0 0-1.5 2 0 4-1.5 0-3-2-3-2z" />
      </svg>
    ),
  },
  {
    name: "Shellfish",
    slug: "shellfish",
    count: "40+ lines",
    desc: "Live, cooked & prepared",
    gradient: "linear-gradient(135deg, #4a1942, #6b2058, #8b3a62)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22c-4.97 0-9-2.69-9-6v-2c0-3.31 4.03-6 9-6s9 2.69 9 6v2c0 3.31-4.03 6-9 6z" />
        <path d="M12 8V2" />
        <path d="M8 3l4 5 4-5" />
      </svg>
    ),
  },
  {
    name: "Frozen",
    slug: "frozen-seafood",
    count: "80+ products",
    desc: "IQF, block & semi-IQF",
    gradient: "linear-gradient(135deg, #0c2461, #1e3799, #4a69bd)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v20M2 12h20" />
        <path d="m9 5 3 3 3-3" />
        <path d="m9 19 3-3 3 3" />
        <path d="m5 9 3 3-3 3" />
        <path d="m19 9-3 3 3 3" />
      </svg>
    ),
  },
  {
    name: "Smoked",
    slug: "smoked-fish",
    count: "30+ lines",
    desc: "Traditional & oak-smoked",
    gradient: "linear-gradient(135deg, #6d3200, #a04800, #c96b20)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 22c-3 0-5-1.5-5-5 0-4 5-7 5-12 0 5 5 8 5 12 0 3.5-2 5-5 5z" />
        <path d="M12 22c-1.5 0-2.5-.8-2.5-2.5 0-2 2.5-3.5 2.5-6 0 2.5 2.5 4 2.5 6 0 1.7-1 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "Deli",
    slug: "deli",
    count: "50+ items",
    desc: "Caviar, roe & specialties",
    gradient: "linear-gradient(135deg, #3d0c02, #6b1d0a, #8b3a1a)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M2 9h20" />
        <path d="m10 3-4 6" />
        <path d="m14 3 4 6" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="px-6 py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
          Our Range
        </p>
        <h2 className="mb-[60px] text-center font-serif text-[clamp(30px,4vw,48px)] font-bold text-brand-cream">
          Premium Seafood,{" "}
          <span className="italic text-brand-gold">Every Category</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/products/${cat.slug}`}
              className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
              style={{
                background: cat.gradient,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Dot pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 35%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px, 55px 55px",
                }}
              />
              {/* Faded icon */}
              <div className="absolute right-5 top-5 scale-[2.2] text-white/[0.12]">
                {cat.icon}
              </div>
              {/* Content */}
              <div className="relative">
                <h3 className="mb-0.5 font-serif text-[24px] font-bold text-brand-cream">
                  {cat.name}
                </h3>
                <div className="mb-1 text-[13px] font-semibold text-brand-gold">
                  {cat.count}
                </div>
                <p className="text-[12px] text-white/60">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
