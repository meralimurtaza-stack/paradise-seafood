const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwVFg1cNS3Ig226Wemjj_4u8qi3OqsHNGcPMceem0Pd4UZEr76MJmzJYqwcvwLQipa7/exec';

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
