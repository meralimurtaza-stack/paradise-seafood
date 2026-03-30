import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import {
  getCategories,
  findCategoryBySlug,
  getSubcategories,
  getProductsBySubcategory,
  slugify,
} from "@/lib/products";

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return getCategories().map((cat) => ({ category: slugify(cat) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = findCategoryBySlug(params.category);
  if (!category) return {};
  return {
    title: `${category} | Paradise Seafood — London's Premium Seafood Wholesaler`,
    description: `Browse our ${category.toLowerCase()} range. Premium wholesale seafood delivered fresh across London, Birmingham, and beyond. Paradise Seafood — est. 2007.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = findCategoryBySlug(params.category);
  if (!category) notFound();

  const subcategories = getSubcategories(category);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <section className="px-6 pb-[100px] pt-12">
        <div className="mx-auto max-w-[1200px]">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: category },
            ]}
          />

          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[5px] text-brand-gold">
            {category}
          </p>
          <h1 className="mb-4 font-serif text-[clamp(34px,5vw,56px)] font-bold text-brand-cream">
            {category}
          </h1>
          <p className="mb-12 max-w-[600px] text-[17px] leading-[1.7] text-brand-muted">
            {subcategories.length} subcategories available. Select a species or
            type to view all products.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((sub) => {
              const count = getProductsBySubcategory(category, sub).length;
              return (
                <Link
                  key={sub}
                  href={`/products/${params.category}/${slugify(sub)}`}
                  className="group rounded-[14px] border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                >
                  <h3 className="mb-1.5 font-serif text-[22px] font-bold text-brand-cream transition-colors group-hover:text-brand-gold">
                    {sub}
                  </h3>
                  <p className="text-[13px] text-brand-muted">
                    {count} {count === 1 ? "product" : "products"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
