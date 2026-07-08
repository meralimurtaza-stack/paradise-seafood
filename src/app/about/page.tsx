import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import TrackedLink from "@/components/TrackedLink";
import { whatsappUrl } from "@/lib/constants";

const WA_QUOTE = whatsappUrl(
  "Hi Paradise Seafood, I would like to request a quote."
);

const WA_AMIR = whatsappUrl(
  "Hi Amir, I found Paradise Seafood online and would like to discuss our seafood requirements."
);

export const metadata: Metadata = {
  title: "About Us | Paradise Seafood — London's Premium Seafood Wholesaler",
  description:
    "Family-run since 2007. Learn how Mohamed and Amir built Paradise Seafood into London's go-to premium seafood wholesaler through quality, relationships, and relentless service.",
};

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

          {/* Story with Amir photo + contact card */}
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            {/* Amir card: photo + name + title + WhatsApp button */}
            <div className="flex-shrink-0 md:w-[280px]">
              {/* Photo — square crop, rounded, subtle gold border + hover */}
              <TrackedLink
                action="whatsapp_click"
                href={WA_AMIR}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Amir on WhatsApp"
                className="relative block aspect-square w-full overflow-hidden rounded-[12px] border transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_-10px_rgba(184,155,94,0.45)]"
                style={{ borderColor: "rgba(184,155,94,0.3)" }}
              >
                <Image
                  src="/images/amir_pic.jpeg"
                  alt="Amir Merali, Director of Paradise Seafood"
                  fill
                  sizes="(min-width: 768px) 280px, 100vw"
                  priority
                  className="object-cover"
                />
              </TrackedLink>

              {/* Name + Title */}
              <div className="mt-5">
                <h3 className="font-serif text-[24px] font-semibold leading-tight text-brand-cream">
                  Amir Merali
                </h3>
                <p className="mt-1 text-[14px] font-medium text-brand-gold">
                  Director
                </p>
              </div>

              {/* Contact buttons — stack on mobile, side-by-side on desktop */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-wrap">
                <TrackedLink
                  action="whatsapp_click"
                  href={WA_AMIR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-brand-cream transition-all duration-200 hover:border-[#25D366]/40 hover:bg-[#25D366]/[0.08]"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  Message Amir
                </TrackedLink>
                <TrackedLink
                  action="phone_click"
                  href="tel:+447864929925"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-gold/30 bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-brand-cream transition-all duration-200 hover:border-brand-gold/60 hover:bg-brand-gold/[0.08]"
                >
                  <PhoneIcon className="h-4 w-4 text-brand-gold" />
                  Call Amir
                </TrackedLink>
              </div>
            </div>

            {/* Story paragraphs */}
            <div className="space-y-6 text-[17px] leading-[1.8] text-brand-muted">
              <p>
                Paradise Seafood was founded in 2007 by Mohamed, who built the
                business on a simple principle: supply the best seafood with
                service that never lets a kitchen down.
              </p>
              <p>
                In 2012, his son Amir joined. A Mathematics graduate from Queen
                Mary University of London with a Master&rsquo;s in Leadership
                from the University of Warwick, Amir spent two years teaching
                through Teach First before bringing that same rigour and
                relentless focus to Paradise Seafood. He builds personal
                relationships with every chef and kitchen he serves, understands
                their standards, and picks up the phone at any hour.
              </p>
              <p>
                That combination &mdash; Mohamed&rsquo;s deep industry knowledge
                and Amir&rsquo;s relentless focus on relationships and service
                &mdash; is what turned Paradise Seafood into London&rsquo;s go-to
                premium wholesaler. Nearly two decades later, the principles
                have not changed: exceptional quality, delivered when you need
                it, by people who care.
              </p>
            </div>
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
            How can we serve you?
          </h2>
          <p className="mb-10 text-[17px] leading-[1.7] text-brand-muted">
            Whether you run a Michelin-starred kitchen or a neighbourhood
            restaurant, we would love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedLink
              action="quote_click"
              href={WA_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[6px] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[1px] text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)]"
              style={{
                background: "linear-gradient(135deg, #B89B5E, #96793E)",
              }}
            >
              Request A Quote <ArrowIcon />
            </TrackedLink>
            <TrackedLink
              action="phone_click"
              href="tel:02078594099"
              className="inline-flex items-center gap-2.5 rounded-[6px] border border-brand-gold/40 bg-transparent px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[1px] text-brand-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold/[0.08]"
            >
              <PhoneIcon /> 020 7859 4099
            </TrackedLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
