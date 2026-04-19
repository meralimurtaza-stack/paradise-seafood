import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { WhatsAppIcon, PhoneIcon, ArrowIcon } from "@/components/icons";
import SpeciesInfo from "@/components/SpeciesInfo";
import { getProductImage } from "@/lib/productImages";
import { whatsappUrl } from "@/lib/constants";
import {
  getCategories,
  getSubcategories,
  findCategoryBySlug,
  findSubcategoryBySlug,
  getProductsBySubcategory,
  getProductBySlug,
  slugify,
} from "@/lib/products";

interface Props {
  params: { category: string; subcategory: string; slug: string };
}

export function generateStaticParams() {
  const params: { category: string; subcategory: string; slug: string }[] = [];
  getCategories().forEach((cat) => {
    getSubcategories(cat).forEach((sub) => {
      getProductsBySubcategory(cat, sub).forEach((product) => {
        params.push({
          category: slugify(cat),
          subcategory: slugify(sub),
          slug: product.slug,
        });
      });
    });
  });
  return params;
}

export function generateMetadata({ params }: Props): Metadata {
  const category = findCategoryBySlug(params.category);
  if (!category) return {};
  const subcategory = findSubcategoryBySlug(category, params.subcategory);
  if (!subcategory) return {};
  const product = getProductBySlug(category, subcategory, params.slug);
  if (!product) return {};

  const desc = [
    `Buy wholesale ${product.name} from Paradise Seafood.`,
    product.format && `Available as ${product.format}.`,
    product.origin && `Origin: ${product.origin}.`,
    product.certifications.length > 0 &&
      `${product.certifications.join(", ")} certified.`,
    "Premium seafood delivered across London.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title: `${product.name} | Paradise Seafood`,
    description: desc,
  };
}

export default function ProductPage({ params }: Props) {
  const category = findCategoryBySlug(params.category);
  if (!category) notFound();
  const subcategory = findSubcategoryBySlug(category, params.subcategory);
  if (!subcategory) notFound();
  const product = getProductBySlug(category, subcategory, params.slug);
  if (!product) notFound();

  const waHref = whatsappUrl(
    `Hi Paradise Seafood, I would like to enquire about ${product.name}.`
  );

  // Related products (same subcategory, exclude current)
  const related = getProductsBySubcategory(category, subcategory)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Specs grid data
  const specs = [
    { label: "Category", value: category },
    { label: "Subcategory", value: subcategory },
    { label: "Format", value: product.format },
    { label: "Size / Grade", value: product.size_grade },
    { label: "Unit", value: product.unit },
    { label: "Origin", value: product.origin },
    { label: "Type", value: product.fresh_or_frozen === "fresh" ? "Fresh" : "Frozen" },
    { label: "Case Packing", value: product.case_packing },
  ].filter((s) => s.value);

  // Schema.org Product markup
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `Wholesale ${product.name} from Paradise Seafood. ${product.format ? `Format: ${product.format}.` : ""} ${product.origin ? `Origin: ${product.origin}.` : ""}`.trim(),
    brand: {
      "@type": "Brand",
      name: "Paradise Seafood",
    },
    category: category,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Paradise Seafood Ltd",
        url: "https://paradiseseafood.co.uk",
      },
    },
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="px-6 pb-[100px] pt-12">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: category, href: `/products/${params.category}` },
              {
                label: subcategory,
                href: `/products/${params.category}/${params.subcategory}`,
              },
              { label: product.name },
            ]}
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
            {/* Left: product details */}
            <div>
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
                {category} / {subcategory}
              </p>
              <h1 className="mb-6 font-serif text-[clamp(30px,4vw,48px)] font-bold text-brand-cream">
                {product.name}
              </h1>

              {/* Certification badges */}
              {product.certifications.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="rounded-full bg-emerald-500/10 px-4 py-1.5 text-[12px] font-bold tracking-wide text-emerald-400"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}

              {/* Specs grid */}
              <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4"
                  >
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-[2px] text-[#64748b]">
                      {spec.label}
                    </div>
                    <div className="text-[15px] font-semibold text-brand-cream">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#25D366] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1da851] hover:shadow-[0_8px_25px_rgba(37,211,102,0.3)]"
                >
                  <WhatsAppIcon /> Enquire on WhatsApp
                </a>
                <a
                  href="tel:02078594099"
                  className="inline-flex items-center gap-2 rounded-[6px] border border-brand-gold/40 px-6 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-brand-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold/[0.08]"
                >
                  <PhoneIcon /> 020 7859 4099
                </a>
                <a
                  href={whatsappUrl(
                    "Hi Paradise Seafood, I would like to request a quote."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[6px] px-6 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-brand-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(184,155,94,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #B89B5E, #96793E)",
                  }}
                >
                  Request A Quote <ArrowIcon />
                </a>
              </div>
            </div>

            {/* Right: product image */}
            <div className="flex items-start justify-center lg:pt-10">
              {(() => {
                const img = getProductImage(product.slug, params.subcategory);
                if (img) {
                  return (
                    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-cover"
                        quality={80}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  );
                }
                return (
                  <div className="flex h-[300px] w-full items-center justify-center rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                    <div className="text-center">
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        className="mx-auto mb-3 text-white/10"
                      >
                        <path d="M6.5 12c3-6 11-6 14.5 0-3.5 6-11.5 6-14.5 0z" />
                        <circle cx="17" cy="12" r="1" fill="currentColor" />
                        <path d="M2 12s1.5-2 3-2c0 0-1.5 2 0 4-1.5 0-3-2-3-2z" />
                      </svg>
                      <p className="text-[12px] text-white/20">
                        Product image coming soon
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20 border-t border-white/[0.04] pt-16">
              <h2 className="mb-8 font-serif text-[28px] font-bold text-brand-cream">
                More {subcategory} Products
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/products/${params.category}/${params.subcategory}/${rp.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-brand-gold/20 hover:bg-white/[0.04]"
                  >
                    <div>
                      <h3 className="text-[14px] font-semibold text-brand-cream transition-colors group-hover:text-brand-gold">
                        {rp.name}
                      </h3>
                      <div className="mt-1 flex gap-2">
                        {rp.format && (
                          <span className="text-[11px] text-brand-muted">
                            {rp.format}
                          </span>
                        )}
                        {rp.origin && (
                          <span className="text-[11px] text-brand-gold">
                            {rp.origin}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowIcon className="text-brand-muted transition-colors group-hover:text-brand-gold" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Species information cards */}
          <SpeciesInfo subcategory={subcategory} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
