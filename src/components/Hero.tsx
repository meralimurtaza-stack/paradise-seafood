"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon } from "./icons";
import { useProductSearch } from "@/lib/useProductSearch";
import SearchResults from "./SearchResults";

const EXAMPLE_QUERIES = [
  "Do you have monkfish?",
  "MSC certified fish",
  "What do I need for sashimi?",
  "King prawns",
  "Live lobster",
  "Do you have sea cucumber?",
];

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function Hero() {
  const [query, setQuery] = useState("");
  const { loading, result, error, search, clear } = useProductSearch();
  const [skipIntro, setSkipIntro] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("ps-hero-played");
    if (hasPlayed) {
      setSkipIntro(true);
      setPhase(6);
    } else {
      setSkipIntro(false);
      setPhase(0);
      const timers = [
        setTimeout(() => setPhase(1), 200),
        setTimeout(() => setPhase(2), 1600),
        setTimeout(() => setPhase(3), 2800),
        setTimeout(() => setPhase(4), 3300),
        setTimeout(() => setPhase(5), 3700),
        setTimeout(() => {
          setPhase(6);
          sessionStorage.setItem("ps-hero-played", "1");
        }, 4200),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    search(query);
  };

  const handleExampleClick = (q: string) => {
    setQuery(q);
    search(q);
  };

  const handleClear = () => {
    clear();
    setQuery("");
  };

  // Animation helpers
  const show = skipIntro || phase >= 6;
  const logoVisible = skipIntro || phase >= 1;
  const logoShifted = skipIntro || phase >= 3;
  const headlineVisible = skipIntro || phase >= 3;
  const subtitleVisible = skipIntro || phase >= 4;
  const searchVisible = skipIntro || phase >= 5;

  return (
    <section className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-6 pb-[60px] pt-20">
      {/* Background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(10, 126, 140, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(184, 155, 94, 0.06) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 60%, rgba(10, 60, 100, 0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Breathing glow */}
      <div
        className="pointer-events-none absolute inset-0 animate-breath-glow"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 40%, rgba(184,155,94,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Gold wave SVG accent */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-[0.04]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#B89B5E"
          d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,165.3C672,171,768,213,864,218.7C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L0,320Z"
        />
      </svg>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-dark to-transparent" />

      {/* Content */}
      <div className="relative w-full max-w-[800px] text-center">
        {/* Intro Logo — visible during animation, then hidden */}
        <div
          className="transition-all"
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: `scale(${logoVisible ? 1 : 0.95}) translateY(${logoShifted ? "-30px" : "0px"})`,
            transitionDuration: logoShifted ? "0.8s" : "1.2s",
            transitionTimingFunction: EASE,
            marginBottom: logoShifted ? "20px" : "0px",
            height: logoShifted ? (show ? "0px" : "auto") : "auto",
            overflow: "hidden",
            maxHeight: show ? "0px" : "300px",
          }}
        >
          <div className="mx-auto w-[220px] sm:w-[280px]">
            <Image
              src="/images/paradise_seafood_dark_logo.svg"
              alt="Paradise Seafood"
              width={280}
              height={163}
              className="w-full"
              priority
            />
          </div>
        </div>

        {/* Eyebrow */}
        <p
          className="mb-6 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold"
          style={{
            opacity: headlineVisible ? 1 : 0,
            transform: `translateY(${headlineVisible ? "0px" : "20px"})`,
            transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
          }}
        >
          London&rsquo;s Premium Seafood Wholesaler
        </p>

        {/* Headline */}
        <h1
          className="mb-5 font-serif text-[clamp(38px,6vw,68px)] font-bold leading-[1.08] text-brand-cream"
          style={{
            opacity: headlineVisible ? 1 : 0,
            transform: `translateY(${headlineVisible ? "0px" : "24px"})`,
            transition: `opacity 0.8s ${EASE} 0.1s, transform 0.8s ${EASE} 0.1s`,
          }}
        >
          Supplying London&rsquo;s
          <br />
          <span
            className="inline-block animate-shimmer bg-clip-text italic"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #B89B5E 0%, #D4C08A 25%, #B89B5E 50%, #D4C08A 75%, #B89B5E 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Finest Kitchens
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mb-12 max-w-[560px] text-[18px] leading-[1.6] text-brand-muted"
          style={{
            opacity: subtitleVisible ? 1 : 0,
            transform: `translateY(${subtitleVisible ? "0px" : "20px"})`,
            transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
          }}
        >
          500+ premium products. Daily fresh deliveries. Trusted by
          Michelin-starred restaurants, luxury hotels, and Premier League
          training grounds.
        </p>

        {/* Search bar */}
        <div
          className="mx-auto max-w-[640px]"
          style={{
            opacity: searchVisible ? 1 : 0,
            transform: `translateY(${searchVisible ? "0px" : "20px"})`,
            transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
          }}
        >
          <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-1.5 shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-3 px-5 py-3">
              <span className="flex-shrink-0 text-[#64748b]">
                <SearchIcon />
              </span>
              <input
                type="text"
                className="w-full border-none bg-transparent font-sans text-[17px] text-brand-cream outline-none placeholder:text-[#475569]"
                placeholder="Ask about any product&hellip; try 'monkfish' or 'sashimi ingredients'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {query && !loading && (
                <button
                  onClick={handleClear}
                  className="flex-shrink-0 rounded-md p-1 text-brand-muted transition-colors hover:text-brand-cream"
                  aria-label="Clear"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleSearch}
                disabled={loading}
                className="whitespace-nowrap rounded-lg bg-gradient-to-br from-brand-gold to-[#96793E] px-6 py-2.5 font-sans text-[12px] font-bold uppercase tracking-[1px] text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold" />
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold [animation-delay:0.2s]" />
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold [animation-delay:0.4s]" />
                  </span>
                ) : (
                  "Ask AI"
                )}
              </button>
            </div>
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="mt-6 flex items-center justify-center gap-2.5 rounded-[12px] border border-brand-gold/15 bg-brand-gold/[0.04] px-5 py-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-gold" />
              </span>
              <span className="font-sans text-[14px] text-brand-gold">
                Thinking&hellip;
              </span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="mt-6 rounded-[12px] border border-red-500/20 bg-red-500/[0.06] px-5 py-4 text-[14px] text-red-300">
              {error}. Try{" "}
              <a
                href={`https://wa.me/442078594099?text=${encodeURIComponent(
                  `Hi Paradise Seafood, I'm looking for: ${query}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#25D366] underline"
              >
                WhatsApp
              </a>{" "}
              instead.
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="mt-6 rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-5">
              <SearchResults result={result} onClear={handleClear} />
            </div>
          )}

          {/* Example query chips — hide when results showing */}
          {!result && !loading && (
            <div
              className="mt-4 flex flex-wrap justify-center gap-2"
              style={{
                opacity: searchVisible ? 1 : 0,
                transition: `opacity 0.6s ${EASE} 0.3s`,
              }}
            >
              {EXAMPLE_QUERIES.map((eq) => (
                <button
                  key={eq}
                  onClick={() => handleExampleClick(eq)}
                  className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 font-sans text-[13px] text-brand-muted transition-all duration-200 hover:border-brand-gold/30 hover:bg-brand-gold/[0.08] hover:text-brand-gold"
                >
                  {eq}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
