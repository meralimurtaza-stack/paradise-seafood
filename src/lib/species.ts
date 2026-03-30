import speciesData from "../../species-data.json";

export interface SpeciesStat {
  stat: string;
  label: string;
}

export interface SpeciesInfo {
  name: string;
  about: string;
  chefs: string[];
  stats: SpeciesStat[];
  health: string[];
}

const species: Record<string, SpeciesInfo> = speciesData.species;

/**
 * Get species data by subcategory name.
 * Converts "Sea Bass" to "sea-bass" for lookup.
 */
export function getSpeciesData(subcategory: string): SpeciesInfo | null {
  const key = subcategory
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return species[key] || null;
}
