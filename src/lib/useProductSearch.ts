"use client";

import { useState, useCallback } from "react";

export interface MatchedProduct {
  name: string;
  format: string;
  size_grade: string;
  unit: string;
  origin: string;
  certifications: string[];
  fresh_or_frozen: string;
  category: string;
  subcategory: string;
}

export interface SearchResult {
  found: boolean;
  type: "product_match" | "dish_suggestion" | "recommendation" | "not_found";
  message: string;
  products: MatchedProduct[];
  whatsappQuery?: string;
}

export function useProductSearch() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/product-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Search failed");
      }

      const data: SearchResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { loading, result, error, search, clear };
}
