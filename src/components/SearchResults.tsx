"use client";

import Link from "next/link";
import type { SearchResult } from "@/lib/useProductSearch";
import { WhatsAppIcon, PhoneIcon } from "./icons";
import { whatsappUrl, PHONE_NUMBER } from "@/lib/constants";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function CertBadge({ cert }: { cert: string }) {
  return (
    <span className="inline-block rounded-full border border-brand-gold/20 bg-brand-gold/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.5px] text-brand-gold">
      {cert}
    </span>
  );
}

function FormatBadge({ format }: { format: string }) {
  const isFresh = format.toLowerCase().includes("fresh");
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.5px] ${
        isFresh
          ? "border border-brand-teal/20 bg-brand-teal/[0.08] text-brand-teal"
          : "border border-white/10 bg-white/[0.05] text-brand-muted"
      }`}
    >
      {format}
    </span>
  );
}

function getCertifications(certs: string[] | string | undefined): string[] {
  if (!certs) return [];
  if (Array.isArray(certs)) return certs;
  return certs
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

interface Props {
  result?: SearchResult | null;
  streamedMessage?: string;
  streaming?: boolean;
  onClear: () => void;
  compact?: boolean;
}

export default function SearchResults({
  result,
  streamedMessage,
  streaming,
  onClear,
  compact,
}: Props) {
  const displayMessage = result?.message || streamedMessage || "";
  const showProducts = result && !streaming;

  if (!displayMessage && !streaming) return null;

  return (
    <div className={`${compact ? "max-h-[70vh] overflow-y-auto" : ""}`}>
      {/* Message */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* AI indicator */}
          <div className="mt-0.5 flex-shrink-0 rounded-full bg-brand-gold/15 p-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-brand-gold"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <p
            className={`${
              compact ? "text-[13px]" : "text-[15px]"
            } leading-relaxed text-brand-cream`}
          >
            {displayMessage}
            {streaming && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-brand-gold align-middle" />
            )}
          </p>
        </div>
        <button
          onClick={onClear}
          className="flex-shrink-0 rounded-md p-1 text-brand-muted transition-colors hover:bg-white/[0.06] hover:text-brand-cream"
          aria-label="Clear results"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Product cards */}
      {showProducts && result.products && result.products.length > 0 && (
        <div
          className={`mb-4 grid gap-2 ${
            compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {result.products.map((p, i) => {
            const catSlug = slugify(p.category);
            const subSlug = slugify(p.subcategory);
            const prodSlug = p.slug || slugify(p.name);
            const href = `/products/${catSlug}/${subSlug}/${prodSlug}`;
            const certs = getCertifications(p.certifications);
            return (
              <Link
                key={i}
                href={href}
                className="group flex items-start gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-200 hover:border-brand-gold/20 hover:bg-white/[0.04]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-brand-cream group-hover:text-brand-gold">
                    {p.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {p.fresh_or_frozen && (
                      <FormatBadge format={p.fresh_or_frozen} />
                    )}
                    {p.size_grade && (
                      <span className="text-[11px] text-brand-muted">
                        {p.size_grade}
                      </span>
                    )}
                    {p.origin && (
                      <span className="text-[11px] text-brand-muted">
                        {p.origin}
                      </span>
                    )}
                  </div>
                  {certs.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {certs.map((c) => (
                        <CertBadge key={c} cert={c} />
                      ))}
                    </div>
                  )}
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="mt-1 flex-shrink-0 text-brand-muted transition-colors group-hover:text-brand-gold"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      {showProducts && (
        <div className="flex flex-wrap gap-2">
          {result.found ? (
            <>
              <a
                href={whatsappUrl(
                  `Hi Paradise Seafood, I am interested in: ${result.products
                    .map((p) => p.name)
                    .slice(0, 3)
                    .join(", ")}. Can you send me pricing?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-4 py-2 text-[12px] font-semibold text-white transition-all hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" /> Enquire via WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-brand-gold/30 px-4 py-2 text-[12px] font-semibold text-brand-gold transition-all hover:border-brand-gold/60 hover:bg-brand-gold/5"
              >
                <PhoneIcon className="h-3.5 w-3.5" /> 020 7859 4099
              </a>
            </>
          ) : (
            <a
              href={whatsappUrl(
                `Hi Paradise Seafood, I was looking for ${
                  result.whatsappQuery || "a product"
                } on your website. Do you carry this?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-4 py-2 text-[12px] font-semibold text-white transition-all hover:bg-[#1da851]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> Enquire via WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  );
}
