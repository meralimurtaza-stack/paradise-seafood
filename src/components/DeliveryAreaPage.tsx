import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SnowflakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  );
}

interface DetailItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface Props {
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  details: DetailItem[];
  features: string[];
  whatsappMessage: string;
}

export default function DeliveryAreaPage({
  title,
  description,
  badge,
  badgeColor = "bg-brand-gold/15 text-brand-gold",
  details,
  features,
  whatsappMessage,
}: Props) {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />

      <section className="px-6 pb-28 pt-12">
        <div className="mx-auto max-w-[900px]">
          <Breadcrumb
            items={[
              { label: "Delivery", href: "/delivery" },
              { label: title },
            ]}
          />

          {/* Header */}
          <div className="mb-12">
            {badge && (
              <span
                className={`mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] ${badgeColor}`}
              >
                {badge}
              </span>
            )}
            <h1 className="mb-4 font-serif text-[clamp(34px,5vw,56px)] font-bold leading-[1.08] text-brand-cream">
              {title}
            </h1>
            <p className="max-w-[600px] text-[17px] leading-[1.8] text-brand-muted">
              {description}
            </p>
          </div>

          {/* Details grid */}
          <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((d, i) => (
              <div
                key={i}
                className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-6 py-5"
              >
                <div className="mb-2 text-brand-gold">{d.icon}</div>
                <p className="text-[12px] font-semibold uppercase tracking-[2px] text-brand-muted">
                  {d.label}
                </p>
                <p className="mt-1 text-[16px] font-semibold text-brand-cream">
                  {d.value}
                </p>
              </div>
            ))}
          </div>

          {/* What we deliver */}
          <div className="mb-14 rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-8 py-8">
            <h2 className="mb-5 font-serif text-[24px] font-bold text-brand-cream">
              What We Deliver
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[14px] leading-[1.6] text-brand-muted"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="rounded-[14px] border border-brand-gold/10 bg-brand-gold/[0.03] px-8 py-10 text-center">
            <h2 className="mb-3 font-serif text-[clamp(24px,3.5vw,36px)] font-bold text-brand-cream">
              Ready to Order?
            </h2>
            <p className="mb-8 text-[15px] text-brand-muted">
              Get in touch for pricing, availability, and to set up delivery to
              your kitchen.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[13px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:brightness-110"
                style={{
                  background:
                    "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
