"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowIcon } from "@/components/icons";

/* ─── Data ─── */

interface Question {
  question: string;
  options: string[];
  answer: number; // index
  image: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What size grade means 'under 5 per kg'?",
    options: ["U5", "5/0", "Sub-5", "Grade 5"],
    answer: 0,
    image: "/images/products/cod.png",
  },
  {
    question: "What does MSC certification stand for?",
    options: [
      "Marine Safety Commission",
      "Marine Stewardship Council",
      "Maritime Seafood Council",
      "Marine Standards Certificate",
    ],
    answer: 1,
    image: "/images/products/salmon.png",
  },
  {
    question: "Which country are Fines de Claire oysters from?",
    options: ["UK", "Ireland", "France", "Spain"],
    answer: 2,
    image: "/images/products/halibut.png",
  },
  {
    question: "What's the Japanese name for yellowtail?",
    options: ["Maguro", "Hamachi", "Unagi", "Hirame"],
    answer: 1,
    image: "/images/products/tuna.png",
  },
  {
    question: "What cut of tuna is the fattiest belly portion?",
    options: ["Akami", "Chutoro", "Toro", "Saku"],
    answer: 2,
    image: "/images/products/swordfish.png",
  },
  {
    question: "What does IQF stand for?",
    options: [
      "Instant Quick Freeze",
      "Individually Quick Frozen",
      "Industrial Quality Fish",
      "International Quality Frozen",
    ],
    answer: 1,
    image: "/images/products/cod-fillet.png",
  },
  {
    question: "Langoustines are also known as?",
    options: [
      "Rock Lobster",
      "Dublin Bay Prawns",
      "Tiger Prawns",
      "Crevettes",
    ],
    answer: 1,
    image: "/images/products/sea-bass.png",
  },
  {
    question: "Which fish is also called 'rock eel' or 'huss'?",
    options: ["Conger Eel", "Dogfish", "Monkfish", "Catfish"],
    answer: 1,
    image: "/images/products/monkfish.png",
  },
  {
    question: "What makes diver-caught scallops premium?",
    options: [
      "They're bigger",
      "Less environmental damage and grit",
      "They're from deeper water",
      "They're always organic",
    ],
    answer: 1,
    image: "/images/products/dover-sole.png",
  },
  {
    question: "What does 'H&G' mean in fish preparation?",
    options: [
      "Halved and Grilled",
      "Hand-picked and Graded",
      "Headed and Gutted",
      "Hooked and Gathered",
    ],
    answer: 2,
    image: "/images/products/salmon-fillet.png",
  },
];

const TOTAL_TIME = 90;

function getTitle(score: number): string {
  if (score <= 3) return "Kitchen Porter";
  if (score <= 6) return "Commis Chef";
  if (score <= 8) return "Sous Chef";
  return "Executive Chef";
}

function getTitleEmoji(score: number): string {
  if (score <= 3) return "\u{1F9F9}";
  if (score <= 6) return "\u{1F52A}";
  if (score <= 8) return "\u{1F468}\u{200D}\u{1F373}";
  return "\u{1F451}";
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
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        {/* Progress */}
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

  // Start timer
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

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && phase === "quiz") {
      setTimeTaken(TOTAL_TIME);
      setPhase("results");
    }
  }, [timeLeft, phase]);

  // Cleanup
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
    startTimer();
  };

  const handleSelect = (optionIndex: number) => {
    if (revealed) return;
    setSelected(optionIndex);
    setRevealed(true);

    const updated = [...answers];
    updated[current] = optionIndex;
    setAnswers(updated);

    // Capture time immediately for the last question
    const isLast = current >= QUESTIONS.length - 1;
    const capturedTime = TOTAL_TIME - timeLeft;

    // Auto-advance after 1.2s
    setTimeout(() => {
      if (!isLast) {
        setCurrent(current + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        // Quiz complete — use time captured at answer moment
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
    const text = `I scored ${score}/10 in ${timeTaken} seconds on the Paradise Seafood quiz — ${getTitle(score)}! Think you can beat me?`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title: "Seafood Quiz", text, url });
      } catch {
        // fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent fail
    }
  };

  /* ─── Landing ─── */
  if (phase === "landing") {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Navbar />
        <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(184,155,94,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 30% 70%, rgba(10,126,140,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto max-w-[640px] text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/[0.06] px-4 py-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-gold">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-[12px] font-semibold uppercase tracking-[2px] text-brand-gold">
                90 Second Challenge
              </span>
            </div>

            <h1 className="mb-5 font-serif text-[clamp(36px,6vw,64px)] font-bold leading-[1.08] text-brand-cream">
              Think You Know{" "}
              <span className="italic text-brand-gold">Seafood?</span>
              <br />
              Prove It.
            </h1>

            <p className="mb-10 text-[17px] leading-relaxed text-brand-muted">
              10 questions. 90 seconds. Are you an Executive Chef or a Kitchen
              Porter?
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
                <span className="text-brand-gold">10</span> Questions
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
      <div className="min-h-screen bg-brand-dark">
        <Navbar />
        <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6 py-12">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={q.image}
              alt=""
              fill
              className="object-cover"
              style={{ opacity: 0.12 }}
              quality={60}
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(12,17,23,0.7) 0%, rgba(12,17,23,0.95) 70%)",
              }}
            />
          </div>

          <div className="relative mx-auto w-full max-w-[680px]">
            {/* Top bar: progress + timer */}
            <div className="mb-10 flex items-center justify-between">
              {/* Progress info */}
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-[3px] text-brand-gold">
                  Question {current + 1}
                  <span className="text-brand-muted"> / {QUESTIONS.length}</span>
                </span>
              </div>

              {/* Timer */}
              <TimerCircle timeLeft={timeLeft} total={TOTAL_TIME} />
            </div>

            {/* Progress bar */}
            <div className="mb-10 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((current + 1) / QUESTIONS.length) * 100}%`,
                  background:
                    "linear-gradient(90deg, #B89B5E 0%, #96793E 100%)",
                }}
              />
            </div>

            {/* Question */}
            <h2 className="mb-10 font-serif text-[clamp(24px,4vw,38px)] font-bold leading-[1.2] text-brand-cream">
              {q.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                let optionClass =
                  "group relative rounded-xl border px-6 py-4.5 text-left text-[15px] font-medium transition-all duration-300 cursor-pointer ";

                if (revealed) {
                  if (i === q.answer) {
                    optionClass +=
                      "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
                  } else if (i === selected && i !== q.answer) {
                    optionClass +=
                      "border-red-500/40 bg-red-500/10 text-red-300";
                  } else {
                    optionClass +=
                      "border-white/[0.04] bg-white/[0.01] text-white/30";
                  }
                } else {
                  optionClass +=
                    "border-white/[0.08] bg-white/[0.03] text-brand-cream hover:border-brand-gold/30 hover:bg-brand-gold/[0.06]";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    className={optionClass}
                  >
                    <span className="mr-3 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-current/20 text-[12px] font-bold opacity-60">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}

                    {/* Correct/wrong indicator */}
                    {revealed && i === q.answer && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-emerald-400">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                    {revealed && i === selected && i !== q.answer && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-red-400">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ─── Results ─── */
  const title = getTitle(score);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <section className="relative overflow-hidden px-6 pb-20 pt-16">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              score >= 9
                ? "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(184,155,94,0.12) 0%, transparent 70%)"
                : score >= 7
                  ? "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(184,155,94,0.08) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(10,126,140,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[600px] text-center">
          {/* Title badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/[0.06] px-5 py-2">
            <span className="text-[20px]">{getTitleEmoji(score)}</span>
            <span className="text-[13px] font-bold uppercase tracking-[2px] text-brand-gold">
              {title}
            </span>
          </div>

          {/* Score */}
          <h1 className="mb-3 font-serif text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] text-brand-cream">
            You scored{" "}
            <span className="text-brand-gold">{score}/10</span> in{" "}
            <span className="text-brand-gold">{timeTaken}</span> seconds
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

          {/* Answer review */}
          <div className="mb-12 rounded-[14px] border border-white/[0.06] bg-white/[0.02] px-6 py-6 text-left">
            <h3 className="mb-4 text-[12px] font-semibold uppercase tracking-[3px] text-brand-gold">
              Your Answers
            </h3>
            <div className="space-y-2.5">
              {QUESTIONS.map((q, i) => {
                const correct = answers[i] === q.answer;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-[13px]"
                  >
                    <span className="mt-0.5 flex-shrink-0">
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
                    <div>
                      <span className={correct ? "text-brand-cream" : "text-white/50"}>
                        {q.question}
                      </span>
                      {!correct && (
                        <span className="ml-1 text-brand-gold">
                          {q.options[q.answer]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WhatsApp capture */}
          <div className="mb-10 rounded-[14px] border border-brand-gold/15 bg-brand-gold/[0.04] px-7 py-8">
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
                  We&rsquo;ll send your result shortly!
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
            {copied
              ? "Link copied!"
              : "Challenge your kitchen team"}
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
