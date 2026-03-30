import { getSpeciesData, type SpeciesInfo as SpeciesInfoType } from "@/lib/species";

function FishIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6.5 12c3-6 11-6 14.5 0-3.5 6-11.5 6-14.5 0z" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
      <path d="M2 12s1.5-2 3-2c0 0-1.5 2 0 4-1.5 0-3-2-3-2z" />
    </svg>
  );
}

function ChefHatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V20H6z" />
      <line x1="6" y1="17" x2="18" y2="17" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
    </svg>
  );
}

interface Props {
  subcategory: string;
}

export default function SpeciesInfo({ subcategory }: Props) {
  const data = getSpeciesData(subcategory);

  if (!data) {
    // Generic fallback for species not in the data file
    return (
      <section className="mt-16 border-t border-white/[0.04] pt-16">
        <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-8 py-9">
          <div className="mb-5 text-brand-gold">
            <FishIcon />
          </div>
          <h3 className="mb-2.5 font-serif text-[22px] font-bold text-brand-cream">
            About {subcategory}
          </h3>
          <p className="text-[14px] leading-[1.7] text-brand-muted">
            Premium quality {subcategory.toLowerCase()} sourced from trusted
            suppliers worldwide. Contact us for availability, formats, and
            pricing.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 border-t border-white/[0.04] pt-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* About */}
        <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-7 py-8">
          <div className="mb-5 text-brand-gold">
            <FishIcon />
          </div>
          <h3 className="mb-3 font-serif text-[22px] font-bold text-brand-cream">
            About {data.name}
          </h3>
          <p className="text-[14px] leading-[1.7] text-brand-muted">
            {data.about}
          </p>
        </div>

        {/* Why Chefs Love It */}
        <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-7 py-8">
          <div className="mb-5 text-brand-gold">
            <ChefHatIcon />
          </div>
          <h3 className="mb-3 font-serif text-[22px] font-bold text-brand-cream">
            Why Chefs Love It
          </h3>
          <ul className="space-y-3">
            {data.chefs.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-[14px] leading-[1.6] text-brand-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Health & Nutrition */}
        <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-7 py-8">
          <div className="mb-5 text-brand-gold">
            <HeartIcon />
          </div>
          <h3 className="mb-4 font-serif text-[22px] font-bold text-brand-cream">
            Health & Nutrition
          </h3>

          {/* Stats cards */}
          <div className="mb-5 grid grid-cols-3 gap-2">
            {data.stats.map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-brand-gold/15 bg-brand-gold/[0.06] px-3 py-3 text-center"
              >
                <div className="text-[20px] font-bold leading-tight text-brand-gold">
                  {s.stat}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.5px] text-brand-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Health points */}
          <ul className="space-y-2.5">
            {data.health.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-[13px] leading-[1.6] text-brand-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
