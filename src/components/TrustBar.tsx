"use client";

import { useState, useEffect, useRef } from "react";

function Counter({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  useLocale = true,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  useLocale?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let value = 0;
    const increment = end / 40;
    const interval = setInterval(() => {
      value += increment;
      if (value >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(value));
      }
    }, duration / 40);
    return () => clearInterval(interval);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {useLocale ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
}

const STATS = [
  { end: 2007, prefix: "Est. ", label: "Established", useLocale: false },
  { end: 500, suffix: "+", label: "Premium Products" },
  { end: 6, suffix: " Days", label: "Fresh Deliveries / Week" },
  { end: 2500, suffix: "+", label: "Pallet Cold Storage" },
];

export default function TrustBar() {
  return (
    <section className="bg-surface-container-low py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {STATS.map((stat, i) => (
            <div key={i} className={`text-center ${i < 3 ? "md:border-r border-white/10" : ""}`}>
              <div className="text-3xl font-serif-num text-on-surface">
                <Counter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  useLocale={stat.useLocale ?? true}
                />
              </div>
              <div className="text-[10px] font-label uppercase tracking-[0.2em] text-outline mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
