import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us | Paradise Seafood — London's Premium Seafood Wholesaler",
  description:
    "Family-run since 2007. Learn how Mohamed and Amir built Paradise Seafood into London's go-to premium seafood wholesaler through quality, relationships, and relentless service.",
};

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
    desc: "Amir knows his customers\u2019 menus by heart. We\u2019re partners, not just suppliers.",
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
    desc: "Need a last-minute order? Call us. We\u2019ll make it happen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-0 pt-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(10,126,140,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(184,155,94,0.05) 0%, transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-[800px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
            About Paradise Seafood
          </p>
          <h1 className="mb-3 font-serif text-[clamp(38px,6vw,64px)] font-bold leading-[1.08] text-brand-cream">
            Our Story
          </h1>
          <p className="mb-12 font-serif text-[clamp(20px,3vw,28px)] italic text-brand-gold">
            Family-run since 2007
          </p>
        </div>
      </section>

      {/* Logo + Story */}
      <section className="px-6 pb-[100px] pt-8">
        <div className="mx-auto max-w-[800px]">
          {/* Full logo */}
          <div className="mb-16 flex justify-center">
            <Image
              src="/images/paradise_seafood_dark_logo.svg"
              alt="Paradise Seafood"
              width={400}
              height={230}
              className="h-auto w-full max-w-[360px]"
            />
          </div>

          {/* Story paragraphs */}
          <div className="space-y-6 text-[17px] leading-[1.8] text-brand-muted">
            <p>
              Paradise Seafood was founded in 2007 by Mohamed, who built the
              business on a simple principle: supply the best seafood with
              service that never lets a kitchen down.
            </p>
            <p>
              In 2012, his son Amir joined. A mathematics graduate who&rsquo;d
              spent two years teaching through Teach First, Amir brought a
              different energy &mdash; building personal relationships with every
              chef and kitchen he serves. He knows their menus, understands
              their standards, and picks up the phone at any hour.
            </p>
            <p>
              That combination &mdash; Mohamed&rsquo;s deep industry knowledge
              and Amir&rsquo;s relentless focus on relationships and service
              &mdash; is what turned Paradise Seafood into London&rsquo;s go-to
              premium wholesaler. Nearly two decades later, the principle
              hasn&rsquo;t changed: exceptional quality, delivered when you need
              it, by people who care.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
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

      {/* CTA */}
      <section className="relative border-t border-white/[0.04] px-6 py-[100px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(184,155,94,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[700px] text-center">
          <h2 className="mb-4 font-serif text-[clamp(30px,4vw,44px)] font-bold text-brand-cream">
            Ready to Work With Us?
          </h2>
          <p className="mb-10 text-[17px] leading-[1.7] text-brand-muted">
            Whether you run a Michelin-starred kitchen or a neighbourhood
            restaurant, we&rsquo;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-[6px] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[1px] text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)]"
              style={{
                background: "linear-gradient(135deg, #B89B5E, #96793E)",
              }}
            >
              Request A Quote <ArrowIcon />
            </a>
            <a
              href="tel:02078594099"
              className="inline-flex items-center gap-2.5 rounded-[6px] border border-brand-gold/40 bg-transparent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[1px] text-brand-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold/[0.08]"
            >
              <PhoneIcon /> 020 7859 4099
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
