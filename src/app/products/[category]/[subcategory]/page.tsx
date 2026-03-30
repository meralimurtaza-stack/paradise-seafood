import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";
import SpeciesInfo from "@/components/SpeciesInfo";
import { getSubcategoryImage } from "@/lib/productImages";
import {
  getCategories,
  getSubcategories,
  findCategoryBySlug,
  findSubcategoryBySlug,
  getProductsBySubcategory,
  slugify,
  type Product,
} from "@/lib/products";

interface Props {
  params: { category: string; subcategory: string };
}

export function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  getCategories().forEach((cat) => {
    getSubcategories(cat).forEach((sub) => {
      params.push({ category: slugify(cat), subcategory: slugify(sub) });
    });
  });
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const category = findCategoryBySlug(params.category);
  if (!category) return {};
  const subcategory = findSubcategoryBySlug(category, params.subcategory);
  if (!subcategory) return {};
  return {
    title: `${subcategory} — ${category} | Paradise Seafood`,
    description: `Buy wholesale ${subcategory.toLowerCase()} from Paradise Seafood. Premium ${category.toLowerCase()} delivered fresh across London. View all formats, sizes, and origins.`,
  };
}

function ProductRow({ product, categorySlug, subcategorySlug }: { product: Product; categorySlug: string; subcategorySlug: string }) {
  const waText = encodeURIComponent(
    `Hi Paradise Seafood, I'd like to enquire about ${product.name}.`
  );

  return (
    <Link
      href={`/products/${categorySlug}/${subcategorySlug}/${product.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/20 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex-1">
        <h3 className="mb-1 text-[15px] font-semibold text-brand-cream transition-colors group-hover:text-brand-gold">
          {product.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          {product.format && (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-brand-muted">
              {product.format}
            </span>
          )}
          {product.size_grade && (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-brand-muted">
              {product.size_grade}
            </span>
          )}
          <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-brand-muted">
            {product.unit}
          </span>
          <span className="rounded-full bg-brand-gold/10 px-2.5 py-0.5 text-[11px] text-brand-gold">
            {product.origin}
          </span>
          {product.certifications.map((cert) => (
            <span
              key={cert}
              className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 sm:flex-shrink-0">
        <a
          href={`https://wa.me/442078594099?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-[#1da851]"
        >
          <WhatsAppIcon /> Enquire
        </a>
      </div>
    </Link>
  );
}

export default function SubcategoryPage({ params }: Props) {
  const category = findCategoryBySlug(params.category);
  if (!category) notFound();
  const subcategory = findSubcategoryBySlug(category, params.subcategory);
  if (!subcategory) notFound();

  const products = getProductsBySubcategory(category, subcategory);
  const formats = [...new Set(products.map((p) => p.format).filter(Boolean))];

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <section className="px-6 pb-[100px] pt-12">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: category, href: `/products/${params.category}` },
              { label: subcategory },
            ]}
          />

          {/* Species hero image */}
          {(() => {
            const img = getSubcategoryImage(params.subcategory);
            if (!img) return null;
            return (
              <div className="relative mb-8 h-[200px] w-full overflow-hidden rounded-2xl border border-white/[0.06] sm:h-[260px]">
                <Image
                  src={img}
                  alt={subcategory}
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
              </div>
            );
          })()}

          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
            {category}
          </p>
          <h1 className="mb-4 font-serif text-[clamp(34px,5vw,56px)] font-bold text-brand-cream">
            {subcategory}
          </h1>
          <p className="mb-4 max-w-[600px] text-[17px] leading-[1.7] text-brand-muted">
            {products.length} {subcategory.toLowerCase()} products available.
            Click any product for full details or enquire directly via WhatsApp.
          </p>

          {/* Format tags */}
          {formats.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[12px] font-semibold text-brand-gold">
                All ({products.length})
              </span>
              {formats.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[12px] text-brand-muted"
                >
                  {f} ({products.filter((p) => p.format === f).length})
                </span>
              ))}
            </div>
          )}

          {/* Quick contact bar */}
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-4">
            <span className="text-[14px] text-brand-muted">
              Need a quote for {subcategory.toLowerCase()}?
            </span>
            <a
              href={`https://wa.me/442078594099?text=${encodeURIComponent(`Hi Paradise Seafood, I'd like a quote for ${subcategory} products.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-[#1da851]"
            >
              <WhatsAppIcon /> WhatsApp Us
            </a>
            <a
              href="tel:02078594099"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-gold transition-colors hover:text-brand-cream"
            >
              <PhoneIcon /> 020 7859 4099
            </a>
          </div>

          {/* Product list */}
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                categorySlug={params.category}
                subcategorySlug={params.subcategory}
              />
            ))}
          </div>

          {/* Species information cards */}
          <SpeciesInfo subcategory={subcategory} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
