import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        <li>
          <Link
            href="/"
            className="text-brand-muted transition-colors hover:text-brand-gold"
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-white/20">/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="text-brand-muted transition-colors hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-cream">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
