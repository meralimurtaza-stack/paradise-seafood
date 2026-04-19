"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowIcon } from "@/components/icons";

/* ─── Data ─── */

interface Question {
  image: string;
  options: string[];
  answer: number; // index
}

const QUESTIONS: Question[] = [
  {
    image: "/images/products/cod.png",
    options: ["Cod", "Haddock", "Pollock", "Hake"],
    answer: 0,
  },
  {
    image: "/images/products/tuna.png",
    options: ["Salmon", "Tuna", "Swordfish", "Marlin"],
    answer: 1,
  },
  {
    image: "/images/products/salmon-fillet.png",
    options: ["Trout", "Sea Bass", "Salmon", "Arctic Char"],
    answer: 2,
  },
  {
    image: "/images/products/monkfish.png",
    options: ["Monkfish", "Cod", "Halibut", "Turbot"],
    answer: 0,
  },
  {
    image: "/images/products/dover-sole.png",
    options: ["Plaice", "Lemon Sole", "Dover Sole", "Turbot"],
    answer: 2,
  },
  {
    image: "/images/products/sea-bass.png",
    options: ["Sea Bream", "Sea Bass", "Barramundi", "Snapper"],
    answer: 1,
  },
  {
    image: "/images/products/halibut.png",
    options: ["Halibut", "Turbot", "Brill", "Cod"],
    answer: 0,
  },
  {
    image: "/images/products/swordfish.png",
    options: ["Tuna", "Marlin", "Swordfish", "Mahi Mahi"],
    answer: 2,
  },
  {
    image: "/images/products/sea-bream.png",
    options: ["Sea Bass", "Red Snapper", "Sea Bream", "Dorade"],
    answer: 2,
  },
  {
    image: "/images/products/john-dory.png",
    options: ["Turbot", "John Dory", "Brill", "Plaice"],
    answer: 1,
  },
];

const TOTAL_TIME = 90;

function getTitle(score: number): string {
  if (score <= 3) return "Kitchen Porter";
  if (score <= 6) return "Commis Chef";
  if (score <= 8) return "Sous Chef";
  return "Executive Chef";
}

function getTitleIcon(score: number) {
  if (score <= 3)
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-brand-muted">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <rect x="9" y="13" width="6" height="8" rx="1" />
      </svg>
    );
  if (score <= 6)
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M7 21h10M9 21v-4a3 3 0 0 1 6 0v4" />
        <path d="M4 11c0-3.87 3.13-7 7-7h2c3.87 0 7 3.13 7 7v1H4v-1z" />
      </svg>
    );
  if (score <= 8)
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V20H6z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    );
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ─── Timer Circle ─── */

function TimerCircle({
  timeLeft,
  total,
}: {
  timeLeft: number;
  total: number;
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / total;
  const dashoffset = circumference * (1 - progress);
  const isUrgent = timeLeft <= 15;

  return (
    <div className="relative flex h-[72px] w-[72px] items-center justify-center">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke={isUrgent ? "#ef4444" : "#B89B5E"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <span
        className={`absolute text-[16px] font-bold tabular-nums ${
          isUrgent ? "text-red-400" : "text-brand-gold"
        }`}
      >
        {timeLeft}s
      </span>
    </div>
  );
}

/* ─── Eye icon for the question prompt ─── */

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-brand-gold">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ─── Main Component ─── */

type Phase = "landing" | "quiz" | "results";

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [timeTaken, setTimeTaken] = useState(0);
  const [whatsapp, setWhatsapp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [fadeKey, setFadeKey] = useState(0);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Auto-submit on timeout
  useEffect(() => {
    if (timeLeft === 0 && phase === "quiz") {
      setTimeTaken(TOTAL_TIME);
      setPhase("results");
    }
  }, [timeLeft, phase]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleStart = () => {
    setPhase("quiz");
    setCurrent(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSelected(null);
    setRevealed(false);
    setTimeLeft(TOTAL_TIME);
    setTimeTaken(0);
    setSubmitted(false);
    setFadeKey(0);
    startTimer();
  };

  const handleSelect = (optionIndex: number) => {
    if (revealed) return;
    setSelected(optionIndex);
    setRevealed(true);

    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);

    const isLast = current >= QUESTIONS.length - 1;
    const capturedTime = TOTAL_TIME - timeLeft;

    setTimeout(() => {
      if (!isLast) {
        setCurrent(current + 1);
        setSelected(null);
        setRevealed(false);
        setFadeKey((k) => k + 1);
      } else {
        setTimeTaken(capturedTime);
        if (timerRef.current) clearInterval(timerRef.current);
        setPhase("results");
      }
    }, 1200);
  };

  const score = answers.reduce<number>(
    (acc, ans, i) => acc + (ans === QUESTIONS[i].answer ? 1 : 0),
    0
  );

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quiz submission:", {
      whatsapp,
      score,
      timeTaken,
      title: getTitle(score),
      answers,
    });
    setSubmitted(true);
  };

  const handleShare = async () => {
    const text = `I identified ${score}/10 seafood species in ${timeTaken} seconds on the Paradise Seafood quiz \u2014 ${getTitle(score)}! Can you beat me?`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title: "Name That Seafood", text, url });
      } catch {
        // fallback
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent
    }
  };

  /* ─── Landing ─── */
  if (phase === "landing") {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6">
          {/* Collage of species images as faded background */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-5 grid-rows-2 opacity-[0.07]">
            {[
              "cod", "tuna", "salmon-fillet", "monkfish", "dover-sole",
              "sea-bass", "halibut", "swordfish", "sea-bream", "john-dory",
            ].map((name) => (
              <div key={name} className="relative overflow-hidden">
                <Image
                  src={`/images/products/${name}.png`}
                  alt=""
                  fill
                  className="object-cover"
                  quality={30}
                  sizes="20vw"
                />
              </div>
            ))}
          </div>

          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(184,155,94,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(12,17,23,0.9) 0%, transparent 80%)",
            }}
          />

          <div className="relative mx-auto max-w-[640px] text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/[0.06] px-4 py-1.5">
              <EyeIcon />
              <span className="text-[12px] font-semibold uppercase tracking-[2px] text-brand-gold">
                Visual Challenge
              </span>
            </div>

            <h1 className="mb-3 font-serif text-[clamp(36px,6vw,64px)] font-bold leading-[1.08] text-brand-cream">
              Name That{" "}
              <span className="italic text-brand-gold">Seafood</span>
            </h1>

            <p className="mb-10 text-[17px] leading-relaxed text-brand-muted">
              Can you identify 10 seafood species from photos alone?
              <br className="hidden sm:block" />
              90 seconds on the clock. Are you an Executive Chef or a Kitchen Porter?
            </p>

            <button
              onClick={handleStart}
              className="group inline-flex items-center gap-3 rounded-lg px-10 py-4.5 text-[15px] font-bold uppercase tracking-[1.5px] text-brand-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(184,155,94,0.35)]"
              style={{
                background: "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
              }}
            >
              Start Quiz
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Stats */}
            <div className="mt-14 flex items-center justify-center gap-8 text-[13px] text-brand-muted">
              <span className="flex items-center gap-1.5">
                <span className="text-brand-gold">10</span> Photos
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-1.5">
                <span className="text-brand-gold">90</span> Seconds
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-1.5">
                <span className="text-brand-gold">4</span> Ranks
              </span>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  /* ─── Quiz ─── */
  if (phase === "quiz") {
    const q = QUESTIONS[current];

    return (
      <div className="min-h-screen bg-surface">
        <Navbar />
        <section className="relative flex min-h-[calc(100vh-80px)] flex-col overflow-hidden px-6 py-8">
          {/* Full-screen product image background */}
          <div className="absolute inset-0" key={`bg-${fadeKey}`}>
            <Image
              src={q.image}
              alt=""
              fill
              className="object-cover animate-[fadeIn_0.5s_ease-out]"
              style={{ opacity: 0.2 }}
              quality={60}
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(12,17,23,0.95) 0%, rgba(12,17,23,0.6) 40%, rgba(12,17,23,0.75) 100%)",
              }}
            />
          </div>

          <div className="relative mx-auto flex w-full max-w-[680px] flex-1 flex-col">
            {/* Top bar: progress + timer */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-[3px] text-brand-gold">
                  Question {current + 1}
                  <span className="text-brand-muted"> / {QUESTIONS.length}</span>
                </span>
              </div>
              <TimerCircle timeLeft={timeLeft} total={TOTAL_TIME} />
            </div>

            {/* Progress bar */}
            <div className="mb-8 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((current + (revealed ? 1 : 0)) / QUESTIONS.length) * 100}%`,
                  background:
                    "linear-gradient(90deg, #B89B5E 0%, #96793E 100%)",
                }}
              />
            </div>

            {/* Main content: image + question */}
            <div className="flex flex-1 flex-col items-center justify-center" key={`q-${fadeKey}`}>
              {/* Featured image */}
              <div className="relative mb-8 h-[200px] w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/[0.08] sm:h-[260px]">
                <Image
                  src={q.image}
                  alt="What seafood is this?"
                  fill
                  className="object-cover animate-[fadeIn_0.4s_ease-out]"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(12,17,23,0.3)]" />
              </div>

              {/* Question */}
              <div className="mb-8 flex items-center gap-2.5">
                <EyeIcon />
                <h2 className="font-serif text-[clamp(22px,3.5vw,32px)] font-bold text-brand-cream">
                  What seafood is this?
                </h2>
              </div>

              {/* Options */}
              <div className="grid w-full max-w-[520px] grid-cols-2 gap-3">
                {q.options.map((opt, i) => {
                  let optionClass =
                    "group relative rounded-xl border px-5 py-4 text-center text-[15px] font-medium transition-all duration-300 cursor-pointer ";

                  if (revealed) {
                    if (i === q.answer) {
                      optionClass +=
                        "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 scale-[1.02]";
                    } else if (i === selected && i !== q.answer) {
                      optionClass +=
                        "border-red-500/40 bg-red-500/10 text-red-300 scale-[0.98]";
                    } else {
                      optionClass +=
                        "border-white/[0.04] bg-white/[0.01] text-white/25";
                    }
                  } else {
                    optionClass +=
                      "border-white/[0.08] bg-white/[0.04] text-brand-cream hover:border-brand-gold/30 hover:bg-brand-gold/[0.08] hover:scale-[1.02] active:scale-[0.98]";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      className={optionClass}
                    >
                      {opt}

                      {revealed && i === q.answer && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-400">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                      )}
                      {revealed && i === selected && i !== q.answer && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-red-400">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ─── Results ─── */
  const title = getTitle(score);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        {/* Background glow based on score */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              score >= 9
                ? "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(184,155,94,0.15) 0%, transparent 70%)"
                : score >= 7
                  ? "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(184,155,94,0.08) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(10,126,140,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[600px] text-center">
          {/* Title badge */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-gold/20 bg-brand-gold/[0.06] px-5 py-2.5">
            {getTitleIcon(score)}
            <span className="text-[13px] font-bold uppercase tracking-[2px] text-brand-gold">
              {title}
            </span>
          </div>

          {/* Score */}
          <h1 className="mb-3 font-serif text-[clamp(30px,5vw,52px)] font-bold leading-[1.15] text-brand-cream">
            You identified{" "}
            <span className="text-brand-gold">{score}/10</span> in{" "}
            <span className="text-brand-gold">{timeTaken}s</span>
          </h1>

          <p className="mb-12 font-serif text-[clamp(20px,3vw,28px)] italic text-brand-gold">
            {title}!
          </p>

          {/* Score breakdown */}
          <div className="mb-12 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5">
              <div className="text-[28px] font-bold text-brand-gold">
                {score}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-brand-muted">
                Correct
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5">
              <div className="text-[28px] font-bold text-brand-cream">
                {timeTaken}s
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-brand-muted">
                Time Taken
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5">
              <div className="text-[28px] font-bold text-brand-cream">
                {10 - score}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-brand-muted">
                Wrong
              </div>
            </div>
          </div>

          {/* Answer review with thumbnails */}
          <div className="mb-12 rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-5 py-6 text-left sm:px-6">
            <h3 className="mb-5 text-[12px] font-semibold uppercase tracking-[3px] text-brand-gold">
              Your Answers
            </h3>
            <div className="space-y-3">
              {QUESTIONS.map((q, i) => {
                const correct = answers[i] === q.answer;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-[13px]"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-white/[0.06]">
                      <Image
                        src={q.image}
                        alt={q.options[q.answer]}
                        fill
                        className="object-cover"
                        quality={40}
                        sizes="40px"
                      />
                    </div>

                    <span className="flex-shrink-0">
                      {correct ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-400">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-red-400">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      )}
                    </span>

                    <div className="min-w-0">
                      <span className={correct ? "text-brand-cream" : "text-white/40"}>
                        {correct
                          ? q.options[q.answer]
                          : answers[i] !== null
                            ? q.options[answers[i] as number]
                            : "No answer"}
                      </span>
                      {!correct && (
                        <span className="ml-1.5 text-brand-gold">
                          &rarr; {q.options[q.answer]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WhatsApp capture */}
          <div className="mb-10 rounded-[14px] border border-brand-gold/15 bg-brand-gold/[0.04] px-6 py-8 sm:px-7">
            {!submitted ? (
              <>
                <h3 className="mb-2 font-serif text-[22px] font-bold text-brand-cream">
                  Claim Your Free Gift
                </h3>
                <p className="mb-6 text-[14px] text-brand-muted">
                  Enter your WhatsApp number to receive your result and claim a
                  free gift from Paradise Seafood.
                </p>
                <form
                  onSubmit={handleWhatsAppSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Your WhatsApp number"
                    required
                    className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3 text-[14px] text-brand-cream placeholder-white/25 outline-none transition-colors focus:border-brand-gold/40"
                  />
                  <button
                    type="submit"
                    className="rounded-lg px-6 py-3 text-[13px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:brightness-110"
                    style={{
                      background:
                        "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
                    }}
                  >
                    Send Result
                  </button>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center gap-3 py-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-400">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-[15px] font-semibold text-brand-cream">
                  We will send your result shortly!
                </span>
              </div>
            )}
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="mb-12 inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-[13px] font-semibold text-brand-cream transition-all hover:border-brand-gold/30 hover:bg-brand-gold/[0.06]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            {copied ? "Link copied!" : "Challenge your kitchen team"}
          </button>

          {/* CTAs */}
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-[13px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)]"
                style={{
                  background:
                    "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
                }}
              >
                Explore 500+ Products <ArrowIcon />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border border-brand-gold/30 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[1px] text-brand-gold transition-all hover:border-brand-gold/60 hover:bg-brand-gold/5"
              >
                Try AI Product Finder
              </Link>
            </div>

            <button
              onClick={handleStart}
              className="mt-4 text-[13px] font-semibold text-brand-muted transition-colors hover:text-brand-gold"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
