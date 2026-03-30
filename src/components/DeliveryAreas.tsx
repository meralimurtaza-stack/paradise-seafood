import Link from "next/link";

const AREAS = [
  {
    area: "Central London",
    slug: "central-london",
    desc: "Same day & next day delivery",
    schedule: "Mon\u2013Sat",
    badge: "CORE",
    badgeColor: "#10b981",
  },
  {
    area: "Greater London",
    slug: "greater-london",
    desc: "Full product range available",
    schedule: "Mon\u2013Sat",
    badge: "CORE",
    badgeColor: "#10b981",
  },
  {
    area: "Birmingham",
    slug: "birmingham",
    desc: "Fresh & frozen seafood delivery",
    schedule: "Tue, Thu, Sat",
    badge: "NEW",
    badgeColor: "#f59e0b",
  },
  {
    area: "Outside M25",
    slug: "outside-m25",
    desc: "Expanding coverage area",
    schedule: "Contact for schedule",
    badge: "NEW",
    badgeColor: "#f59e0b",
  },
];

export default function DeliveryAreas() {
  return (
    <section className="relative border-t border-white/[0.04] px-6 py-[100px]">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(10,125,140,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(184,155,94,0.04) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
          Delivery
        </p>
        <h2 className="mb-[60px] text-center font-serif text-[clamp(30px,4vw,48px)] font-bold text-brand-cream">
          Delivering Across{" "}
          <span className="italic text-brand-gold">London & Beyond</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((area, i) => (
            <Link
              key={i}
              href={`/delivery/${area.slug}`}
              className="group relative rounded-[14px] border border-white/[0.06] bg-white/[0.03] p-7 transition-all duration-300 hover:border-brand-gold/20 hover:bg-white/[0.05]"
            >
              <span
                className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[1.5px]"
                style={{
                  color: area.badgeColor,
                  background: area.badgeColor + "18",
                }}
              >
                {area.badge}
              </span>
              <h3 className="mb-2 font-serif text-[24px] font-bold text-brand-cream transition-colors group-hover:text-brand-gold">
                {area.area}
              </h3>
              <p className="mb-3 text-[14px] text-brand-muted">{area.desc}</p>
              <p className="text-[13px] font-semibold text-brand-gold">
                {area.schedule}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
