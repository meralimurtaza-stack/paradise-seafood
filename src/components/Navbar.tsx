"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { SearchIcon } from "./icons";
import { useProductSearch } from "@/lib/useProductSearch";
import SearchResults from "./SearchResults";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Delivery", href: "/delivery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, result, error, search, clear } = useProductSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setSearchOpen(false);
    }
    if (searchOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [searchOpen]);

  const handleNavSearch = () => {
    if (!searchQuery.trim()) return;
    search(searchQuery);
  };

  const handleSearchClear = () => {
    clear();
    setSearchQuery("");
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    clear();
    setSearchQuery("");
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-[20px]"
      style={{ background: "rgba(12, 17, 23, 0.88)" }}
    >
      <div className="mx-auto flex h-[90px] max-w-[1200px] items-center justify-between px-6">
        {/* Full brand logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/paradise_seafood_nav_logo.svg"
            alt="Paradise Seafood"
            width={300}
            height={100}
            className="h-[70px] w-auto md:h-[80px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.5px] text-brand-muted transition-colors duration-300 hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}

          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-md p-2 text-brand-muted transition-colors hover:text-brand-gold"
            aria-label="Search products"
          >
            <SearchIcon />
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[6px] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[1px] text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)]"
            style={{
              background: "linear-gradient(135deg, #B89B5E, #96793E)",
            }}
          >
            Get A Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-md p-2 text-brand-muted transition-colors hover:text-brand-gold"
            aria-label="Search products"
          >
            <SearchIcon />
          </button>
          <button
            className="flex flex-col gap-[5px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] w-6 bg-brand-cream transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-brand-cream transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-brand-cream transition-all duration-300 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search panel dropdown */}
      {searchOpen && (
        <div
          ref={searchPanelRef}
          className="border-t border-white/5 px-6 pb-6 pt-4"
          style={{ background: "rgba(12, 17, 23, 0.96)" }}
        >
          <div className="mx-auto max-w-[700px]">
            {/* Search input */}
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
              <SearchIcon className="flex-shrink-0 text-brand-muted" />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full bg-transparent font-sans text-[15px] text-brand-cream outline-none placeholder:text-white/25"
                placeholder="Search products... try 'king prawns' or 'sushi ingredients'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNavSearch()}
              />
              {searchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="flex-shrink-0 text-brand-muted transition-colors hover:text-brand-cream"
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
              )}
              <button
                onClick={handleNavSearch}
                disabled={loading}
                className="whitespace-nowrap rounded-lg bg-gradient-to-br from-brand-gold to-[#96793E] px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[1px] text-brand-dark transition-all hover:brightness-110 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold" />
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold [animation-delay:0.2s]" />
                    <span className="inline-block h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand-gold [animation-delay:0.4s]" />
                  </span>
                ) : (
                  "Search"
                )}
              </button>
              <button
                onClick={handleSearchClose}
                className="flex-shrink-0 text-brand-muted transition-colors hover:text-brand-cream"
                aria-label="Close search"
              >
                <svg
                  width="18"
                  height="18"
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

            {/* Loading */}
            {loading && (
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-brand-gold/15 bg-brand-gold/[0.04] px-4 py-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-gold" />
                </span>
                <span className="text-[13px] text-brand-gold">
                  Thinking&hellip;
                </span>
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
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <SearchResults
                  result={result}
                  onClear={handleSearchClear}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t border-white/5 px-6 pb-6 pt-4 md:hidden"
          style={{ background: "rgba(12, 17, 23, 0.96)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-3 text-[14px] font-medium uppercase tracking-[0.5px] text-brand-muted transition-colors duration-300 hover:text-brand-gold"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-[6px] px-6 py-3 text-[12px] font-semibold uppercase tracking-[1px] text-brand-dark"
            style={{
              background: "linear-gradient(135deg, #B89B5E, #96793E)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            Get A Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
