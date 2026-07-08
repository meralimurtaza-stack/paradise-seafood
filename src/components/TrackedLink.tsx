"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackToSheet } from "@/lib/tracking";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  action: string;
  details?: string;
  children: ReactNode;
};

// A plain <a> that fires a fire-and-forget conversion event to Google Sheets
// on click. It never calls preventDefault, so the link behaves normally.
export default function TrackedLink({
  action,
  details,
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        trackToSheet({
          type: "conversion",
          action,
          source: window.location.pathname,
          ...(details ? { details } : {}),
        });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
