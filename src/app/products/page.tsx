import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getCategoryInfos } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products | Paradise Seafood — London's Premium Seafood Wholesaler",
  description:
    "Browse 500+ premium seafood products: fresh fish, shellfish, frozen seafood, smoked fish, and deli items. London's leading wholesale supplier since 2007.",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Fresh Fish": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6.5 12c3-6 11-6 14.5 0-3.5 6-11.5 6-14.5 0z" />
      <circle cx="17" cy="12" r="1" fill="currentColor" />
      <path d="M2 12s1.5-2 3-2c0 0-1.5 2 0 4-1.5 0-3-2-3-2z" />
    </svg>
  ),
  Shellfish: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 22c-4.97 0-9-2.69-9-6v-2c0-3.31 4.03-6 9-6s9 2.69 9 6v2c0 3.31-4.03 6-9 6z" />
      <path d="M12 8V2" /><path d="M8 3l4 5 4-5" />
    </svg>
  ),
  "Frozen Seafood": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 2v20M2 12h20" />
      <path d="m9 5 3 3 3-3" /><path d="m9 19 3-3 3 3" />
      <path d="m5 9 3 3-3 3" /><path d="m19 9-3 3 3 3" />
    </svg>
  ),
  "Smoked Fish": (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M12 22c-3 0-5-1.5-5-5 0-4 5-7 5-12 0 5 5 8 5 12 0 3.5-2 5-5 5z" />
      <path d="M12 22c-1.5 0-2.5-.8-2.5-2.5 0-2 2.5-3.5 2.5-6 0 2.5 2.5 4 2.5 6 0 1.7-1 2.5-2.5 2.5z" />
    </svg>
  ),
  Deli: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20" /><path d="m10 3-4 6" /><path d="m14 3 4 6" />
    </svg>
  ),
};

export default function ProductsPage() {
  const categories = getCategoryInfos();

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <section className="px-6 pb-[100px] pt-12">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumb items={[{ label: "Products" }]} />

          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
            Our Range
          </p>
          <h1 className="mb-4 font-serif text-[clamp(34px,5vw,56px)] font-bold text-brand-cream">
            Product Catalogue
          </h1>
          <p className="mb-12 max-w-[600px] text-[17px] leading-[1.7] text-brand-muted">
            Browse over 500 premium seafood products across five categories.
            From daily fresh fish to speciality deli items.
          </p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl p-7 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
                style={{ background: cat.gradient }}
              >
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 35%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 75% 65%, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px, 55px 55px",
                  }}
                />
                <div className="absolute right-6 top-6 scale-[1.8] text-white/[0.12]">
                  {CATEGORY_ICONS[cat.name]}
                </div>
                <div className="relative">
                  <h2 className="mb-1 font-serif text-[28px] font-bold text-brand-cream">
                    {cat.name}
                  </h2>
                  <div className="mb-1 text-[14px] font-semibold text-brand-gold">
                    {cat.count} products
                  </div>
                  <p className="text-[13px] text-white/60">
                    {cat.subcategoryCount} subcategories
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
