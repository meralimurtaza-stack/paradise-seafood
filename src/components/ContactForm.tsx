"use client";

import { useState, FormEvent } from "react";
import { ArrowIcon } from "./icons";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      business: (form.elements.namedItem("business") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      _hp: (form.elements.namedItem("_hp") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[14px] border border-brand-gold/20 bg-brand-gold/[0.04] px-8 py-12 text-center">
        <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mb-2 font-serif text-[24px] font-bold text-brand-cream">
          Thank You
        </h3>
        <p className="mb-6 text-[15px] text-brand-muted">
          We&rsquo;ve received your enquiry and will get back to you within a few hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[13px] font-semibold text-brand-gold underline underline-offset-4 transition-colors hover:text-brand-cream"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="business"
            className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[2px] text-brand-muted"
          >
            Business Name
          </label>
          <input
            type="text"
            id="business"
            name="business"
            placeholder="Your restaurant or business"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-brand-cream placeholder-white/20 outline-none transition-colors focus:border-brand-gold/40 focus:bg-white/[0.05]"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[2px] text-brand-muted"
          >
            Contact Name <span className="text-brand-gold">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-brand-cream placeholder-white/20 outline-none transition-colors focus:border-brand-gold/40 focus:bg-white/[0.05]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[2px] text-brand-muted"
          >
            Email <span className="text-brand-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@restaurant.com"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-brand-cream placeholder-white/20 outline-none transition-colors focus:border-brand-gold/40 focus:bg-white/[0.05]"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[2px] text-brand-muted"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your phone number"
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-brand-cream placeholder-white/20 outline-none transition-colors focus:border-brand-gold/40 focus:bg-white/[0.05]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[2px] text-brand-muted"
        >
          Message <span className="text-brand-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what you're looking for — products, quantities, delivery requirements..."
          className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] text-brand-cream placeholder-white/20 outline-none transition-colors focus:border-brand-gold/40 focus:bg-white/[0.05]"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/[0.08] px-4 py-3 text-[13px] text-red-400">
          {errorMsg}{" "}
          <button
            type="submit"
            className="font-semibold underline underline-offset-2 hover:text-red-300"
          >
            Try again
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-md px-8 py-3.5 text-[13px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.25)] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        style={{
          background: "linear-gradient(135deg, #B89B5E 0%, #96793E 100%)",
        }}
      >
        {status === "sending" ? "Sending..." : "Send Enquiry"}
        {status !== "sending" && <ArrowIcon />}
      </button>
    </form>
  );
}
