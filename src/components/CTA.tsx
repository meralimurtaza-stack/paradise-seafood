import { ArrowIcon, PhoneIcon } from "./icons";

export default function CTA() {
  return (
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
          Ready to Elevate Your Menu?
        </h2>
        <p className="mb-10 text-[17px] leading-[1.7] text-brand-muted">
          Join London&rsquo;s top restaurants, hotels, and caterers who trust
          Paradise Seafood for their daily supply. Get a quote in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[6px] px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[1px] text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)]"
            style={{ background: "linear-gradient(135deg, #B89B5E, #96793E)" }}
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
  );
}
