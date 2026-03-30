import { ArrowIcon } from "./icons";

const REVIEWS = [
  {
    name: "Sara Yassine",
    date: "December 2020",
    text: "Fantastic service, quality and reasonable prices. I highly recommend buying your seafood from them. I cannot wait to try all their products. The best seafood I have had!",
    initial: "S",
    color: "#8b5e3c",
  },
  {
    name: "Jai Chan",
    date: "December 2020",
    text: "First time ordering from them. Cooked the lobster in ginger & spring onion Chinese style and white wine with cream mussels, it was very fresh and the whole experience was amazing.",
    initial: "J",
    color: "#6b7280",
  },
  {
    name: "Gunalingam Jegathas",
    date: "December 2020",
    text: "Amazing, delivery was on time and the overall experience was great. I would strongly recommend buying seafood from them especially black cod. 10/10",
    initial: "G",
    color: "#4a5568",
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section className="border-t border-white/[0.04] px-6 py-[100px]">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 text-center text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
          Don&rsquo;t just take our word
        </p>
        <h2 className="mb-[60px] text-center font-serif text-[clamp(30px,4vw,48px)] font-bold text-brand-cream">
          What our{" "}
          <span className="italic text-brand-gold">customers</span> say
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="rounded-[14px] border border-white/[0.06] bg-white/[0.03] p-7"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon key={s} />
                ))}
              </div>
              {/* Quote */}
              <div className="relative mb-5">
                <span className="absolute -left-1 -top-2 font-brand text-[40px] leading-none text-brand-gold/30">
                  &ldquo;
                </span>
                <p className="pl-4 text-[14px] leading-[1.7] text-[#cbd5e1]">
                  {review.text}
                </p>
              </div>
              {/* Author + Google */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold text-white"
                    style={{ background: review.color }}
                  >
                    {review.initial}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-[1px] text-brand-cream">
                      {review.name}
                    </p>
                    <p className="text-[11px] text-[#64748b]">
                      {review.date}
                    </p>
                  </div>
                </div>
                <GoogleIcon />
              </div>
            </div>
          ))}
        </div>
        {/* See all reviews link */}
        <div className="mt-8 text-center">
          <a
            href="https://g.page/paradiseseafood/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 px-6 py-2.5 text-[14px] font-semibold text-brand-gold transition-all duration-300 hover:bg-brand-gold/[0.08]"
          >
            See All Reviews <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
