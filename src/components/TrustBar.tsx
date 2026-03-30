"use client";

import { useState, useEffect, useRef } from "react";

function Counter({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
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
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  { end: 2007, prefix: "Est. ", label: "Established" },
  { end: 500, suffix: "+", label: "Products" },
  { end: 6, suffix: " Days", label: "Fresh Deliveries / Week" },
  { end: 2500, suffix: "+", label: "Pallet Cold Storage" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-white/[0.015] px-6 py-11">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-around gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="min-w-[130px] text-center">
            <div className="font-serif text-[38px] font-bold text-brand-gold">
              <Counter
                end={stat.end}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[2.5px] text-[#64748b]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
