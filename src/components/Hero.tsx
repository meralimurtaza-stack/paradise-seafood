"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon } from "./icons";
import { useProductSearch } from "@/lib/useProductSearch";
import { PROTO_IMAGES } from "@/lib/protoImages";
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

  const show = skipIntro || phase >= 6;
  const logoVisible = skipIntro || phase >= 1;
  const logoShifted = skipIntro || phase >= 3;
  const headlineVisible = skipIntro || phase >= 3;
  const subtitleVisible = skipIntro || phase >= 4;
  const searchVisible = skipIntro || phase >= 5;

  return (
    <section className="relative h-screen max-h-[921px] flex items-center overflow-hidden pt-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PROTO_IMAGES.hero}
          alt=""
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
        />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left column: content */}
        <div className="flex flex-col justify-center">
          {/* Intro Logo — visible during animation, then hidden */}
          <div
            className="transition-all"
            style={{
              opacity: logoVisible ? 1 : 0,
              transform: `scale(${logoVisible ? 1 : 0.95}) translateY(${logoShifted ? "-30px" : "0px"})`,
              transitionDuration: logoShifted ? "0.8s" : "1.2s",
              transitionTimingFunction: EASE,
              height: show ? "0px" : "auto",
              overflow: "hidden",
              maxHeight: show ? "0px" : "300px",
            }}
          >
            <div className="w-[220px] sm:w-[280px] mb-8">
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
          <span
            className="text-primary font-label tracking-[0.3em] uppercase text-sm mb-6"
            style={{
              opacity: headlineVisible ? 1 : 0,
              transform: `translateY(${headlineVisible ? "0px" : "20px"})`,
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}
          >
            Established 2007
          </span>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-headline text-on-surface leading-[1.1] mb-8"
            style={{
              opacity: headlineVisible ? 1 : 0,
              transform: `translateY(${headlineVisible ? "0px" : "24px"})`,
              transition: `opacity 0.8s ${EASE} 0.1s, transform 0.8s ${EASE} 0.1s`,
            }}
          >
            London&rsquo;s{" "}
            <span
              className="inline-block animate-shimmer bg-clip-text italic"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #e2c382 0%, #ffdf9e 25%, #e2c382 50%, #ffdf9e 75%, #e2c382 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Premium
            </span>{" "}
            Seafood Wholesaler.
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl text-on-surface-variant font-light leading-relaxed max-w-xl mb-12"
            style={{
              opacity: subtitleVisible ? 1 : 0,
              transform: `translateY(${subtitleVisible ? "0px" : "20px"})`,
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}
          >
            Supplying London&rsquo;s Finest Kitchens. Trusted by Michelin-starred
            restaurants, luxury hotels, and Premier League training grounds.
          </p>

          {/* Search Bar */}
          <div
            className="max-w-md"
            style={{
              opacity: searchVisible ? 1 : 0,
              transform: `translateY(${searchVisible ? "0px" : "20px"})`,
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur transition duration-300 group-hover:bg-primary/30" />
              <div className="relative flex items-center bg-surface-container-highest rounded-xl p-2 pl-6">
                <span className="material-symbols-outlined text-primary mr-4" style={{ fontSize: 20 }}>search</span>
                <input
                  type="text"
                  className="bg-transparent border-none text-on-surface placeholder:text-outline-variant focus:ring-0 w-full font-label text-sm outline-none"
                  placeholder="Ask about any product... try 'monkfish'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                {query && !loading && (
                  <button
                    onClick={handleClear}
                    className="flex-shrink-0 text-outline transition-colors hover:text-on-surface mr-2"
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
                  className="bg-primary text-on-primary font-bold text-[10px] tracking-widest px-4 py-2 rounded-lg uppercase disabled:opacity-70"
                >
                  {loading ? "..." : "Search"}
                </button>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-primary/15 bg-primary/[0.04] px-4 py-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-[13px] text-primary">Thinking&hellip;</span>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] text-red-300">
                {error}
              </div>
            )}

            {/* Results */}
            {result && !loading && (
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-surface-container-high p-4">
                <SearchResults result={result} onClear={handleClear} />
              </div>
            )}

            {/* Example chips */}
            {!result && !loading && (
              <div
                className="mt-4 flex flex-wrap gap-2"
                style={{
                  opacity: searchVisible ? 1 : 0,
                  transition: `opacity 0.6s ${EASE} 0.3s`,
                }}
              >
                {EXAMPLE_QUERIES.slice(0, 4).map((eq) => (
                  <button
                    key={eq}
                    onClick={() => handleExampleClick(eq)}
                    className="whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 font-label text-[11px] text-outline transition-all hover:border-primary/30 hover:text-primary"
                  >
                    {eq}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: stats */}
        <div className="hidden lg:flex flex-col justify-end pb-12">
          <div className="grid grid-cols-2 gap-12 border-l border-white/10 pl-12">
            <div className="space-y-2">
              <div className="text-4xl font-serif-num text-primary">500+</div>
              <div className="text-xs font-label uppercase tracking-widest text-slate-400">Premium Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-serif-num text-primary">Daily</div>
              <div className="text-xs font-label uppercase tracking-widest text-slate-400">Fresh Deliveries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
