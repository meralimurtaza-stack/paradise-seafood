"use client";

import { useState, useCallback, useRef } from "react";

export interface MatchedProduct {
  name: string;
  slug: string;
  format: string;
  size_grade: string;
  unit: string;
  origin: string;
  certifications: string[] | string;
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
  const [streaming, setStreaming] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;

    // Abort any in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setStreaming(true);
    setStreamedMessage("");
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/product-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Search failed");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let messageText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE lines
        const lines = buffer.split("\n");
        buffer = lines.pop() || ""; // Keep incomplete line in buffer

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);

          try {
            const event = JSON.parse(payload);

            if (event.type === "text") {
              messageText += event.text;
              // Strip any partial delimiter leak (trailing |'s)
              const display = messageText.replace(/\|+$/, "").trimEnd();
              setStreamedMessage(display);
            } else if (event.type === "done") {
              setStreaming(false);
              // Clean final message of any delimiter remnants
              const finalMessage = messageText
                .replace(/\|{2,}.*$/, "")
                .trimEnd();
              setResult({
                found: event.data.found,
                type: event.data.type,
                message: finalMessage,
                products: event.data.products || [],
                whatsappQuery: event.data.whatsappQuery,
              });
            } else if (event.type === "error") {
              throw new Error(event.error);
            }
          } catch (e) {
            // Skip malformed JSON lines
            if (e instanceof Error && e.message !== "Stream failed") continue;
            throw e;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStreaming(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setResult(null);
    setError(null);
    setStreamedMessage("");
    setStreaming(false);
  }, []);

  return { loading, streaming, streamedMessage, result, error, search, clear };
}
