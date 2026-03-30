import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "./icons";

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const PRODUCT_LINKS = [
  { label: "Fresh Fish", href: "/products/fresh-fish" },
  { label: "Frozen Seafood", href: "/products/frozen-seafood" },
  { label: "Shellfish", href: "/products/shellfish" },
  { label: "Smoked Fish", href: "/products/smoked-fish" },
  { label: "Deli Products", href: "/products/deli" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Why Paradise", href: "/about" },
  { label: "Delivery Areas", href: "/delivery" },
  { label: "Get A Quote", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/30 px-6 pb-10 pt-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Image
              src="/images/paradise_seafood_dark_logo.svg"
              alt="Paradise Seafood"
              width={160}
              height={90}
              className="mb-4 h-[80px] w-auto"
            />
            <p className="text-[14px] leading-[1.7] text-[#64748b]">
              London&rsquo;s premium fresh & frozen seafood wholesaler.
              Supplying the finest kitchens since 2007.
            </p>
          </div>

          {/* Products column */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-brand-gold">
              Products
            </h4>
            {PRODUCT_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-1.5 text-[14px] text-[#64748b] transition-colors duration-300 hover:text-brand-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company column */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-brand-gold">
              Company
            </h4>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-1.5 text-[14px] text-[#64748b] transition-colors duration-300 hover:text-brand-cream"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact column */}
          <div>
            <h4 className="mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-brand-gold">
              Contact
            </h4>
            <p className="mb-2.5 flex items-center gap-2 text-[14px] text-brand-muted">
              <PhoneIcon /> 020 7859 4099
            </p>
            <p className="mb-2.5 flex items-center gap-2 text-[14px] text-brand-muted">
              <MailIcon /> inquiries@paradiseseafood.co.uk
            </p>
            <p className="flex items-start gap-2 text-[14px] text-brand-muted">
              <span className="mt-0.5 flex-shrink-0">
                <PinIcon />
              </span>
              Unit 17, Fishers Ind. Estate, Wiggenhall Rd, Watford WD18 0FN
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="text-[12px] text-[#475569]">
            &copy; 2026 Paradise Seafood Ltd. All rights reserved.
          </p>
          <p className="text-[12px] text-[#475569]">Built by Hey-Insights</p>
        </div>
      </div>
    </footer>
  );
}
