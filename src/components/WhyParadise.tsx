const REASONS = [
  {
    icon: "verified",
    title: "Superior Quality",
    desc: "Sourcing only the highest grade seafood, ensuring every product meets the standards of Michelin-starred kitchens.",
  },
  {
    icon: "schedule",
    title: "Fresh Is Always Fresh",
    desc: "Our logistics are optimized for speed, moving products from water to kitchen in record time.",
  },
  {
    icon: "scale",
    title: "Scale & Reliability",
    desc: "2,500+ pallet cold storage capacity means we never compromise on availability or temperature control.",
  },
  {
    icon: "map",
    title: "Expanding Reach",
    desc: "From our Watford hub to Central London and beyond, our fleet covers the most demanding territories.",
  },
  {
    icon: "restaurant",
    title: "Industry Expertise",
    desc: "Founded and run by experts who understand the unique pressure and precision required in professional catering.",
  },
  {
    icon: "payments",
    title: "Competitive Pricing",
    desc: "Luxury quality doesn't have to mean inflated margins. We leverage our scale to provide sustainable B2B value.",
  },
];

export default function WhyParadise() {
  return (
    <section className="bg-surface-container-low py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <span className="text-primary font-label tracking-[0.2em] uppercase text-xs">The Paradise Standard</span>
          <h2 className="text-5xl font-headline mt-4">Trusted by London&rsquo;s Finest</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REASONS.map((reason, i) => (
            <div
              key={i}
              className="p-10 bg-surface-container-highest rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              <span
                className="material-symbols-outlined text-primary text-4xl mb-8 block"
              >
                {reason.icon}
              </span>
              <h4 className="text-2xl font-headline mb-4">{reason.title}</h4>
              <p className="text-on-surface-variant font-light leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
