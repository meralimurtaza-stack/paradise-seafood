import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Delivery Areas | Paradise Seafood — London Seafood Supplier",
  description:
    "Fresh and frozen seafood delivered across Central London, Greater London, Birmingham, and beyond the M25. Monday to Saturday delivery from Paradise Seafood.",
};

const AREAS = [
  {
    title: "Central London",
    slug: "central-london",
    badge: "CORE",
    badgeColor: "bg-brand-gold/15 text-brand-gold",
    schedule: "Mon — Sat",
    desc: "Same day and next day delivery across all central London postcodes.",
    postcodes: "EC, WC, W, SW, SE, E, N, NW",
  },
  {
    title: "Greater London",
    slug: "greater-london",
    badge: "CORE",
    badgeColor: "bg-brand-gold/15 text-brand-gold",
    schedule: "Mon — Sat",
    desc: "Comprehensive coverage across the whole of Greater London.",
    postcodes: "All London postcodes",
  },
  {
    title: "Birmingham",
    slug: "birmingham",
    badge: "NEW",
    badgeColor: "bg-brand-teal/15 text-brand-teal",
    schedule: "Tue, Thu, Sat",
    desc: "Now delivering premium seafood to Birmingham and surrounding areas.",
    postcodes: "B postcodes",
  },
  {
    title: "Outside M25",
    slug: "outside-m25",
    badge: "EXPANDING",
    badgeColor: "bg-white/10 text-brand-cream",
    schedule: "Contact us",
    desc: "We're expanding beyond the M25. Get in touch to check your area.",
    postcodes: "Selected routes",
  },
];

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-6 pt-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(10,126,140,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[800px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
            Delivery
          </p>
          <h1 className="mb-4 font-serif text-[clamp(34px,5.5vw,60px)] font-bold leading-[1.08] text-brand-cream">
            Delivering Across London{" "}
            <span className="italic text-brand-gold">&amp; Beyond</span>
          </h1>
          <p className="mx-auto max-w-[540px] text-[16px] leading-relaxed text-brand-muted">
            Fresh and frozen seafood delivered to your kitchen, six days a week.
            Temperature-controlled vehicles. No minimum order.
          </p>
        </div>
      </section>

      {/* Area cards */}
      <section className="px-6 pb-28 pt-16">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/delivery/${area.slug}`}
                className="group relative rounded-[14px] border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-brand-gold/20 hover:bg-white/[0.04]"
              >
                {/* Badge */}
                <span
                  className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] ${area.badgeColor}`}
                >
                  {area.badge}
                </span>

                <div className="mb-5 text-brand-gold">
                  <TruckIcon />
                </div>

                <h2 className="mb-2.5 font-serif text-[26px] font-bold text-brand-cream transition-colors group-hover:text-brand-gold">
                  {area.title}
                </h2>
                <p className="mb-5 text-[14px] leading-[1.7] text-brand-muted">
                  {area.desc}
                </p>

                {/* Meta pills */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] text-brand-muted">
                    <CalendarIcon /> {area.schedule}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[12px] text-brand-muted">
                    <MapPinIcon /> {area.postcodes}
                  </span>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-8 right-8 text-brand-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-gold">
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="mb-4 font-serif text-[clamp(26px,4vw,40px)] font-bold text-brand-cream">
            Not Sure If We Deliver to You?
          </h2>
          <p className="mb-10 text-[15px] leading-relaxed text-brand-muted">
            Get in touch and we&rsquo;ll confirm delivery to your postcode, schedule, and any minimum order requirements.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[13px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
              }}
            >
              Request A Quote
              <ArrowIcon />
            </a>
            <a
              href="tel:02078594099"
              className="inline-flex items-center gap-2 rounded-md border border-brand-gold/30 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[1px] text-brand-gold transition-all hover:border-brand-gold/60 hover:bg-brand-gold/5"
            >
              <PhoneIcon />
              020 7859 4099
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
