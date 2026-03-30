import productsData from "../../products.json";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  format: string;
  size_grade: string;
  unit: string;
  origin: string;
  certifications: string[];
  fresh_or_frozen: string;
  case_packing: string;
  keywords: string[];
}

const products: Product[] = productsData.products;

// Slugify helper
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// De-slugify for display
export function deslugify(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\band\b/g, "&")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// All products
export function getAllProducts(): Product[] {
  return products;
}

// Unique categories
export function getCategories(): string[] {
  return [...new Set(products.map((p) => p.category))];
}

// Category slug map
export function getCategorySlugMap(): Record<string, string> {
  const map: Record<string, string> = {};
  getCategories().forEach((cat) => {
    map[slugify(cat)] = cat;
  });
  return map;
}

// Products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

// Subcategories within a category
export function getSubcategories(category: string): string[] {
  return [
    ...new Set(
      products.filter((p) => p.category === category).map((p) => p.subcategory)
    ),
  ].sort();
}

// Products by category + subcategory
export function getProductsBySubcategory(
  category: string,
  subcategory: string
): Product[] {
  return products.filter(
    (p) => p.category === category && p.subcategory === subcategory
  );
}

// Single product by slug within category/subcategory
export function getProductBySlug(
  category: string,
  subcategory: string,
  slug: string
): Product | undefined {
  return products.find(
    (p) =>
      p.category === category &&
      p.subcategory === subcategory &&
      p.slug === slug
  );
}

// Find category name from slug
export function findCategoryBySlug(slug: string): string | undefined {
  const map = getCategorySlugMap();
  return map[slug];
}

// Find subcategory name from slug within a category
export function findSubcategoryBySlug(
  category: string,
  slug: string
): string | undefined {
  const subs = getSubcategories(category);
  return subs.find((s) => slugify(s) === slug);
}

// Category info for cards
export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
  subcategoryCount: number;
  gradient: string;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Fresh Fish": "linear-gradient(135deg, #0a3d62, #0e6f5c, #0a7e8c)",
  Shellfish: "linear-gradient(135deg, #4a1942, #6b2058, #8b3a62)",
  "Frozen Seafood": "linear-gradient(135deg, #0c2461, #1e3799, #4a69bd)",
  "Smoked Fish": "linear-gradient(135deg, #6d3200, #a04800, #c96b20)",
  Deli: "linear-gradient(135deg, #3d0c02, #6b1d0a, #8b3a1a)",
};

export function getCategoryInfos(): CategoryInfo[] {
  return getCategories().map((cat) => ({
    name: cat,
    slug: slugify(cat),
    count: getProductsByCategory(cat).length,
    subcategoryCount: getSubcategories(cat).length,
    gradient: CATEGORY_GRADIENTS[cat] || "linear-gradient(135deg, #1a1a2e, #333)",
  }));
}
