"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackToSheet } from "@/lib/tracking";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  trackAction: string;
  trackDetails?: string;
}

export default function TrackedLink({
  trackAction,
  trackDetails,
  onClick,
  ...rest
}: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    trackToSheet({
      type: "conversion",
      action: trackAction,
      source:
        typeof window !== "undefined" ? window.location.pathname : "",
      ...(trackDetails ? { details: trackDetails } : {}),
    });
    onClick?.(e);
  }

  return <a {...rest} onClick={handleClick} />;
}
