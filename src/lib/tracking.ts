const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwMmCSJzr4qDFnw670C2Wno8hDqccPznyj9oWovi-Jm86RDfwqDr7GLQ069fpqS24cZ/exec';

// Client-side tracking (for conversions, page views)
export function trackToSheet(data: Record<string, any>) {
  if (typeof window === 'undefined') return;
  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  }).catch(() => {});
}

// Server-side tracking (for AI search logs)
export async function trackToSheetServer(data: Record<string, any>) {
  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    });
  } catch {}
}
