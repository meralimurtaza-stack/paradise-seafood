import Image from "next/image";
import Link from "next/link";

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
  { label: "Name That Seafood Quiz", href: "/quiz" },
  { label: "Get A Quote", href: "/contact" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f141a] border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 lg:px-12 py-20 w-full max-w-[1920px] mx-auto">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Image
            src="/images/paradise_seafood_dark_logo.svg"
            alt="Paradise Seafood"
            width={160}
            height={90}
            className="mb-4 h-[80px] w-auto"
          />
          <p className="text-slate-400 text-sm font-body leading-relaxed">
            Established in 2007, we are London&rsquo;s premier portal for the
            world&rsquo;s finest seafood. Quality, reliability, and precision are
            the anchors of our service.
          </p>
        </div>

        {/* Products */}
        <div>
          <h6 className="text-primary font-headline text-xl mb-6">Our Range</h6>
          <ul className="space-y-4">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-slate-400 hover:text-primary transition-colors text-sm font-body"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="text-primary font-headline text-xl mb-6">Support</h6>
          <ul className="space-y-4">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-slate-400 hover:text-primary transition-colors text-sm font-body"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h6 className="text-primary font-headline text-xl mb-6">Contact</h6>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>phone</span>
              020 7859 4099
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" style={{ fontSize: 16 }}>mail</span>
              inquiries@paradiseseafood.co.uk
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0" style={{ fontSize: 16 }}>location_on</span>
              Unit 6, Fishers Ind. Estate, Wiggenhall Rd, Watford WD18 0FN
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0" style={{ fontSize: 16 }}>schedule</span>
              Monday &ndash; Saturday: Open until 5pm
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-8 px-6 lg:px-12">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-body tracking-wider">
            &copy; 2026 Paradise Seafood. Established 2007.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-500 text-xs">Built by Hey-Insights</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
