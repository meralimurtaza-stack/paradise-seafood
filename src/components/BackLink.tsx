import Link from "next/link";

interface Props {
  href: string;
  label: string;
}

/**
 * Left-aligned back link with a leading arrow. Gold text, DM Sans.
 * Has a 44px minimum hit area for easy tapping on mobile.
 */
export default function BackLink({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="group mb-4 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-brand-gold transition-colors hover:text-brand-cream"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:-translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span className="underline-offset-4 group-hover:underline">{label}</span>
    </Link>
  );
}
