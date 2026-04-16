import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us | Paradise Seafood — London's Premium Seafood Wholesaler",
  description:
    "Get in touch with Paradise Seafood. WhatsApp, phone, or email us for pricing, availability, and delivery enquiries. Unit 17, Fishers Industrial Estate, Watford.",
};

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-6 pt-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(184,155,94,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[700px] text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
            Contact
          </p>
          <h1 className="mb-4 font-serif text-[clamp(38px,6vw,64px)] font-bold leading-[1.08] text-brand-cream">
            Get In Touch
          </h1>
          <p className="text-[16px] leading-relaxed text-brand-muted">
            Whether you need a quote, want to discuss your menu, or set up a
            trade account &mdash; we&rsquo;re here to help.
          </p>
        </div>
      </section>

      {/* Contact method cards */}
      <section className="px-6 pb-20 pt-14">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-3">
          {/* WhatsApp */}
          <a
            href="https://wa.me/442078594099?text=Hi%20Paradise%20Seafood%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-[14px] border border-[#25D366]/20 bg-[#25D366]/[0.08] px-8 py-8 transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#25D366]/[0.12]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366]">
              <WhatsAppIcon />
            </div>
            <h2 className="mb-1.5 font-serif text-[22px] font-bold text-brand-cream">
              WhatsApp
            </h2>
            <p className="mb-4 text-[14px] leading-relaxed text-brand-muted">
              Chat with our team. Quick replies, even at unsociable hours.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#25D366] transition-all group-hover:gap-2.5">
              Open WhatsApp <ArrowIcon className="text-[#25D366]" />
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:02078594099"
            className="group rounded-[14px] border border-brand-gold/20 bg-brand-gold/[0.04] px-8 py-8 transition-all duration-300 hover:border-brand-gold/40 hover:bg-brand-gold/[0.08]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
              <PhoneIcon />
            </div>
            <h2 className="mb-1.5 font-serif text-[22px] font-bold text-brand-cream">
              020 7859 4099
            </h2>
            <p className="mb-4 text-[14px] leading-relaxed text-brand-muted">
              Monday to Saturday, early morning to evening.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-gold transition-all group-hover:gap-2.5">
              Call now <ArrowIcon className="text-brand-gold" />
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:inquiries@paradiseseafood.co.uk"
            className="group rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-8 py-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.08] text-brand-cream">
              <MailIcon />
            </div>
            <h2 className="mb-1.5 font-serif text-[22px] font-bold text-brand-cream">
              Email
            </h2>
            <p className="mb-4 text-[14px] leading-relaxed text-brand-muted">
              inquiries@paradiseseafood.co.uk
            </p>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-cream transition-all group-hover:gap-2.5">
              Send email <ArrowIcon className="text-brand-cream" />
            </span>
          </a>
        </div>
      </section>

      {/* Enquiry form + Address */}
      <section className="border-t border-white/[0.04] px-6 py-24">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="mb-2 font-serif text-[clamp(26px,3.5vw,36px)] font-bold text-brand-cream">
              Send Us an Enquiry
            </h2>
            <p className="mb-10 text-[14px] text-brand-muted">
              Fill in the form and we&rsquo;ll get back to you within a few
              hours.
            </p>

            <ContactForm />
          </div>

          {/* Address sidebar */}
          <div className="lg:col-span-2">
            <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-7 py-8">
              <div className="mb-5 text-brand-gold">
                <MapPinIcon />
              </div>
              <h3 className="mb-1.5 font-serif text-[22px] font-bold text-brand-cream">
                Visit Us
              </h3>
              <p className="mb-6 text-[14px] leading-[1.7] text-brand-muted">
                Unit 17, Fishers Industrial Estate,
                <br />
                Wiggenhall Road,
                <br />
                Watford WD18 0FN
              </p>

              <div className="mb-6 h-px w-full bg-white/[0.06]" />

              <h3 className="mb-3 font-serif text-[18px] font-bold text-brand-cream">
                Opening Hours
              </h3>
              <div className="space-y-2 text-[14px] text-brand-muted">
                <div className="flex justify-between">
                  <span>Monday &mdash; Friday</span>
                  <span className="text-brand-cream">4:00am &mdash; 3:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-brand-cream">4:00am &mdash; 12:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-brand-muted">Closed</span>
                </div>
              </div>

              <div className="mb-6 mt-6 h-px w-full bg-white/[0.06]" />

              <div className="space-y-3">
                <a
                  href="https://wa.me/442078594099?text=Hi%20Paradise%20Seafood%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-[#1da851]"
                >
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
                <a
                  href="tel:02078594099"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-brand-gold/30 px-5 py-3 text-[13px] font-semibold text-brand-gold transition-all hover:border-brand-gold/60 hover:bg-brand-gold/5"
                >
                  <PhoneIcon /> 020 7859 4099
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative border-t border-white/[0.04]">
        <div className="relative overflow-hidden" style={{ height: "420px" }}>
          {/* Dark overlay to blend with site theme */}
          <div className="pointer-events-none absolute inset-0 z-10 border-b border-white/[0.04]" style={{
            background: "linear-gradient(to bottom, rgba(12,17,23,0.3) 0%, transparent 30%, transparent 70%, rgba(12,17,23,0.5) 100%)",
          }} />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.5!2d-0.3964!3d51.6565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48766a45b7e3b7c1%3A0x4b2a6c8e8c8e8c8e!2sUnit%2017%2C%20Fishers%20Industrial%20Estate%2C%20Wiggenhall%20Rd%2C%20Watford%20WD18%200FN!5e0!3m2!1sen!2suk!4v1700000000000"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.7) contrast(1.2)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Paradise Seafood location — Unit 17, Fishers Industrial Estate, Watford"
          />
        </div>
        {/* Map label */}
        <div className="absolute bottom-6 left-6 z-20 rounded-lg border border-white/[0.08] bg-surface/90 px-5 py-3 backdrop-blur-sm">
          <p className="text-[13px] font-semibold text-brand-cream">
            Paradise Seafood
          </p>
          <p className="text-[12px] text-brand-muted">
            Unit 17, Fishers Ind. Estate, Watford WD18 0FN
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
