import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { PROTO_IMAGES } from "@/lib/protoImages";

const AREAS = [
  {
    area: "Central London",
    slug: "central-london",
    desc: "Daily morning deliveries to W1, WC1, EC, and SE1.",
  },
  {
    area: "Greater London",
    slug: "greater-london",
    desc: "Regular coverage across all London boroughs within the M25.",
  },
  {
    area: "Birmingham & Midlands",
    slug: "birmingham",
    desc: "Scheduled logistics for the UK's second culinary hub.",
  },
  {
    area: "Outside M25",
    slug: "outside-m25",
    desc: "Bespoke delivery solutions for luxury country hotels and estates.",
  },
];

export default function DeliveryAreas() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6 lg:px-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <ScrollReveal>
          <span className="text-primary font-label tracking-[0.2em] uppercase text-xs">
            Logistics Network
          </span>
          <h2 className="text-5xl font-headline mt-4 mb-8">
            Delivering Across London & Beyond
          </h2>
          <p className="text-on-surface-variant text-lg mb-12">
            Our temperature-controlled fleet operates 6 days a week, ensuring
            the cold chain is never broken from our hub to your door.
          </p>
          <div className="space-y-6">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/delivery/${area.slug}`}
                className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                    {area.area}
                  </h5>
                  <p className="text-sm text-on-surface-variant">
                    {area.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Right: delivery map visual */}
        <ScrollReveal delay={0.3} className="relative hidden lg:block">
          <div className="aspect-square rounded-full overflow-hidden border border-white/10 p-8 bg-surface-container-low relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROTO_IMAGES.deliveryMap}
              alt="London delivery coverage"
              className="w-full h-full object-cover rounded-full grayscale opacity-60"
              style={{ animation: "pulse-slow 8s infinite" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/10 p-12 rounded-full backdrop-blur-sm border border-primary/20 hover:scale-110 transition-transform duration-500">
                <span
                  className="material-symbols-outlined text-primary text-6xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_shipping
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
