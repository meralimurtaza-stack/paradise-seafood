const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyeGRXIAzmWQBurv8B2S--ZGhabo5LV_zPd1UdXbZTFUv4jumpCHLboFPpDKOI4ev92/exec";

// Client-side tracking (for conversions, page views)
export function trackToSheet(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  fetch(SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

// Server-side tracking (for AI search logs)
export async function trackToSheetServer(data: Record<string, unknown>) {
  try {
    await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(data),
    });
  } catch {}
}
