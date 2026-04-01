import Link from "next/link";

const CATEGORIES = [
  {
    name: "Fresh Fish",
    slug: "fresh-fish",
    desc: "Locally sourced and globally imported morning catch, delivered within hours of landing.",
    span: "col-span-1 md:col-span-2",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Shellfish",
    slug: "shellfish",
    desc: "Pristine lobsters, oysters, and scallops from the world's most reputable waters.",
    span: "col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Frozen",
    slug: "frozen-seafood",
    desc: "IQF technology preserving texture and flavor at the peak of freshness.",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    name: "Smoked",
    slug: "smoked-fish",
    desc: "Traditionally cured and smoked using sustainable oak and beech woods.",
    span: "col-span-1",
    aspect: "aspect-square",
  },
  {
    name: "Deli",
    slug: "deli",
    desc: "Complementary ingredients and prepared delicacies for the modern kitchen.",
    span: "col-span-1",
    aspect: "aspect-square",
  },
];

export default function Categories() {
  return (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="text-primary font-label tracking-[0.2em] uppercase text-xs">The Collection</span>
          <h2 className="text-5xl font-headline mt-4">
            Premium Seafood, <span className="italic">Every Category</span>
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-on-surface-variant leading-relaxed">
            From the morning catch to global imports, we curate the finest marine selection for discerning executive chefs across the capital.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/products/${cat.slug}`}
            className={`group relative ${cat.aspect} overflow-hidden rounded-xl bg-surface-container-highest ${cat.span}`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent z-10" />

            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 35%, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 p-8 md:p-10 z-20">
              <h3 className={`font-headline text-on-surface mb-3 ${cat.span.includes("col-span-2") ? "text-3xl" : "text-2xl"}`}>
                {cat.name}
              </h3>
              <p className="text-on-surface-variant text-sm max-w-sm mb-6">{cat.desc}</p>
              <span className="inline-flex items-center text-primary font-label uppercase tracking-widest text-xs border-b border-primary/30 pb-1 group-hover:border-primary transition-all">
                Explore Range
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
