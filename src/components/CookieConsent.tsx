"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookieConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== "accepted" && stored !== "declined") {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
    window.dispatchEvent(new Event("cookie-consent-change"));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-gold/25 bg-brand-dark/95 backdrop-blur-md"
      style={{ backgroundColor: "rgba(12, 17, 23, 0.95)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[13px] leading-relaxed text-brand-cream/90 sm:max-w-2xl">
          We use cookies to help us understand how visitors use our website and
          improve your experience. No personal data is shared with third parties.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-md border border-white/15 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[1px] text-brand-cream/80 transition-colors hover:border-white/30 hover:text-brand-cream"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-md px-5 py-2.5 text-[12px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.25)]"
            style={{
              background: "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
