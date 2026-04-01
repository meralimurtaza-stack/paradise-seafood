import ScrollReveal from "./ScrollReveal";
import { PROTO_IMAGES } from "@/lib/protoImages";

export default function CTA() {
  return (
    <section className="relative py-40 overflow-hidden">
      {/* Background kitchen image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROTO_IMAGES.ctaKitchen}
          alt=""
          className="w-full h-full object-cover opacity-20 grayscale scale-110"
        />
      </div>
      <ScrollReveal className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-6xl font-headline mb-8">
          Ready to <span className="italic">Elevate</span> Your Menu?
        </h2>
        <p className="text-xl text-on-surface-variant font-light mb-12 leading-relaxed">
          Join London&rsquo;s top restaurants, hotels, and caterers who trust
          Paradise Seafood for their daily supply. Get a quote in minutes.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="/contact"
            className="editorial-gradient text-on-primary px-12 py-5 font-label font-bold tracking-[0.2em] rounded-full text-sm uppercase shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all"
          >
            Request A Quote
          </a>
          <a
            href="tel:02078594099"
            className="flex items-center gap-3 text-primary font-label tracking-widest text-sm py-4 px-8 border border-primary/20 rounded-full hover:bg-primary/5 hover:border-primary/50 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>phone</span>
            Speak With An Expert
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
