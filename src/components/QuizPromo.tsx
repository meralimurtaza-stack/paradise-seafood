import Link from "next/link";

export default function QuizPromo() {
  return (
    <section className="relative border-t border-white/5 px-6 lg:px-12 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(226,195,130,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[600px] text-center">
        <span className="material-symbols-outlined text-primary text-4xl mb-4 block">visibility</span>
        <h2 className="text-4xl font-headline mb-4">
          Name That <span className="italic">Seafood</span>
        </h2>
        <p className="text-on-surface-variant mb-8 leading-relaxed">
          Can you identify 10 species from our range? 90 seconds on the clock.
        </p>
        <Link
          href="/quiz"
          className="editorial-gradient text-on-primary px-10 py-4 font-label font-bold text-xs tracking-[0.2em] rounded-full active:scale-95 transition-transform uppercase inline-flex items-center gap-2"
        >
          Take the Quiz
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
