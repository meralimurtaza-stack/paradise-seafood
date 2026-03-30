/**
 * Maps subcategory names (lowercase, hyphenated) to product images.
 * Some products have format-specific images (e.g. "cod-fillet").
 * Falls back to the base species image, then null.
 */

const IMAGES: Record<string, string> = {
  // Base species images
  "cod": "/images/products/cod.png",
  "salmon": "/images/products/salmon.png",
  "halibut": "/images/products/halibut.png",
  "dover-sole": "/images/products/dover-sole.png",
  "john-dory": "/images/products/john-dory.png",
  "monkfish": "/images/products/monkfish.png",
  "sea-bass": "/images/products/sea-bass.png",
  "sea-bream": "/images/products/sea-bream.png",
  "swordfish": "/images/products/swordfish.png",
  "tuna": "/images/products/tuna.png",
};

// Format-specific overrides (product slug → image)
const PRODUCT_IMAGES: Record<string, string> = {
  "cod-fillet": "/images/products/cod-fillet.png",
  "cod-loin": "/images/products/cod-loin.png",
  "halibut-supreme": "/images/products/halibut-supreme.png",
  "salmon-fillet": "/images/products/salmon-fillet.png",
  "salmon-supreme": "/images/products/salmon-supreme.png",
  "sea-bass-fillet": "/images/products/sea-bass-fillet.png",
};

/**
 * Get the image for a specific product by its slug and subcategory.
 * Tries: exact product slug match → subcategory base image → null
 */
export function getProductImage(
  productSlug: string,
  subcategorySlug: string
): string | null {
  // Check for format-specific match (e.g. slug contains "cod-fillet")
  for (const [key, img] of Object.entries(PRODUCT_IMAGES)) {
    if (productSlug.includes(key)) return img;
  }

  // Fall back to subcategory/species image
  return IMAGES[subcategorySlug] || null;
}

/**
 * Get the image for a subcategory page.
 */
export function getSubcategoryImage(subcategorySlug: string): string | null {
  return IMAGES[subcategorySlug] || null;
}

/**
 * Get all available subcategory slugs that have images.
 */
export function getImagedSubcategories(): string[] {
  return Object.keys(IMAGES);
}
