"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackToSheet } from "@/lib/tracking";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!sessionStorage.getItem("ps_session")) {
      sessionStorage.setItem(
        "ps_session",
        Math.random().toString(36).substring(2) + Date.now().toString(36)
      );
    }

    trackToSheet({
      type: "pageview",
      page: pathname,
      referrer: document.referrer || "direct",
      device: window.innerWidth < 768 ? "mobile" : "desktop",
      session_id: sessionStorage.getItem("ps_session"),
    });
  }, [pathname]);

  return null;
}
