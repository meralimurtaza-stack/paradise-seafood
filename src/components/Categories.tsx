import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { PROTO_IMAGES } from "@/lib/protoImages";

const CATEGORIES = [
  {
    name: "Fresh Fish",
    slug: "fresh-fish",
    desc: "Locally sourced and globally imported morning catch, delivered within hours of landing.",
    span: "col-span-1 md:col-span-2",
    aspect: "aspect-[4/5]",
    image: PROTO_IMAGES.freshFish,
    big: true,
  },
  {
    name: "Shellfish",
    slug: "shellfish",
    desc: "Pristine lobsters, oysters, and scallops from the world's most reputable waters.",
    span: "col-span-1",
    aspect: "aspect-[4/5]",
    image: PROTO_IMAGES.shellfish,
    big: false,
  },
  {
    name: "Frozen",
    slug: "frozen-seafood",
    desc: "IQF technology preserving texture and flavor at the peak of freshness.",
    span: "col-span-1",
    aspect: "aspect-square",
    image: "/images/frozen_pic.webp",
    big: false,
  },
  {
    name: "Smoked",
    slug: "smoked-fish",
    desc: "Traditionally cured and smoked using sustainable oak and beech woods.",
    span: "col-span-1",
    aspect: "aspect-square",
    image: PROTO_IMAGES.smoked,
    big: false,
  },
  {
    name: "Deli",
    slug: "deli",
    desc: "Complementary ingredients and prepared delicacies for the modern kitchen.",
    span: "col-span-1",
    aspect: "aspect-square",
    image: PROTO_IMAGES.deli,
    big: false,
  },
];

export default function Categories() {
  return (
    <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
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
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <ScrollReveal
            key={cat.name}
            className={`${cat.span}`}
          >
            <Link
              href={`/products/${cat.slug}`}
              className={`group relative ${cat.aspect} overflow-hidden rounded-xl bg-surface-container-highest block hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700`}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition duration-1000 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />

              {/* Content */}
              <div className={`absolute bottom-0 ${cat.big ? "p-10" : "p-8"} transition-transform duration-700 group-hover:-translate-y-2`}>
                <h3 className={`font-headline text-on-surface mb-3 ${cat.big ? "text-3xl" : "text-2xl"}`}>
                  {cat.name}
                </h3>
                <p className={`text-on-surface-variant max-w-sm mb-6 ${cat.big ? "" : "text-sm"}`}>
                  {cat.desc}
                </p>
                <span className="inline-flex items-center text-primary font-label uppercase tracking-widest text-xs border-b border-primary/30 pb-1 group-hover:border-primary transition-all">
                  Explore Range
                </span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
