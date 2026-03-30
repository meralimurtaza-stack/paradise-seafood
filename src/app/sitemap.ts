import type { MetadataRoute } from "next";
import {
  getAllProducts,
  getCategories,
  getSubcategories,
  slugify,
} from "@/lib/products";

const BASE_URL = "https://www.paradiseseafood.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/delivery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/delivery/central-london`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/delivery/greater-london`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/delivery/birmingham`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/delivery/outside-m25`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Category pages
  const categories = getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/products/${slugify(cat)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Subcategory pages
  const subcategoryPages: MetadataRoute.Sitemap = categories.flatMap((cat) => {
    const subs = getSubcategories(cat);
    return subs.map((sub) => ({
      url: `${BASE_URL}/products/${slugify(cat)}/${slugify(sub)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  });

  // Individual product pages
  const allProducts = getAllProducts();
  const productPages: MetadataRoute.Sitemap = allProducts.map((p) => ({
    url: `${BASE_URL}/products/${slugify(p.category)}/${slugify(p.subcategory)}/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...subcategoryPages,
    ...productPages,
  ];
}
