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
  const { loading, streaming, streamedMessage, result, error, search, clear } = useProductSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

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
    <nav className="fixed top-0 w-full z-50 bg-[#0f141a]/90 backdrop-blur-md shadow-xl shadow-[#0f141a]/20">
      <div className="flex justify-between items-center px-6 lg:px-12 py-6 w-full max-w-[1920px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/paradise_seafood_nav_logo.svg"
            alt="Paradise Seafood"
            width={300}
            height={100}
            className="h-[60px] w-auto md:h-[70px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center space-x-12 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-label uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center space-x-6 md:flex">
          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-md p-2 text-slate-400 transition-colors hover:text-primary"
            aria-label="Search products"
          >
            <SearchIcon />
          </button>

          <Link
            href="/contact"
            className="editorial-gradient text-on-primary px-8 py-3 font-label font-bold text-xs tracking-[0.2em] rounded-full active:scale-95 transition-transform uppercase"
          >
            Get A Quote
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-md p-2 text-slate-400 transition-colors hover:text-primary"
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
              className={`block h-[2px] w-6 bg-on-surface transition-all duration-300 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-on-surface transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-on-surface transition-all duration-300 ${
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
          className="border-t border-white/5 px-6 lg:px-12 pb-6 pt-4 bg-[#0f141a]/96"
        >
          <div className="mx-auto max-w-[700px]">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur transition duration-300 group-hover:bg-primary/30" />
              <div className="relative flex items-center bg-surface-container-highest rounded-xl p-2 pl-6">
                <SearchIcon className="flex-shrink-0 text-primary mr-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="bg-transparent border-none text-on-surface placeholder:text-outline-variant focus:ring-0 w-full font-label text-sm outline-none"
                  placeholder="Ask about any product... try 'monkfish'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNavSearch()}
                />
                {searchQuery && (
                  <button
                    onClick={handleSearchClear}
                    className="flex-shrink-0 text-outline transition-colors hover:text-on-surface mr-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={handleNavSearch}
                  disabled={loading}
                  className="bg-primary text-on-primary font-bold text-[10px] tracking-widest px-4 py-2 rounded-lg uppercase"
                >
                  {loading ? "..." : "Search"}
                </button>
                <button
                  onClick={handleSearchClose}
                  className="flex-shrink-0 text-outline transition-colors hover:text-on-surface ml-2"
                  aria-label="Close search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {loading && (
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-primary/15 bg-primary/[0.04] px-4 py-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-[13px] text-primary">Thinking&hellip;</span>
              </div>
            )}

            {error && !loading && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] text-red-300">
                {error}
              </div>
            )}

            {(result || streaming) && !loading && (
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-surface-container-high p-4">
                <SearchResults result={result} streamedMessage={streamedMessage} streaming={streaming} onClear={handleSearchClear} compact />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/5 px-6 pb-6 pt-4 bg-[#0f141a]/96 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-label uppercase tracking-widest text-slate-400 transition-colors hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 inline-flex editorial-gradient text-on-primary px-8 py-3 font-label font-bold text-xs tracking-[0.2em] rounded-full uppercase"
            onClick={() => setMobileOpen(false)}
          >
            Get A Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
