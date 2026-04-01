import type { Metadata } from "next";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const SITE_URL = "https://www.paradiseseafood.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paradise Seafood | London's Premium Seafood Wholesaler",
    template: "%s | Paradise Seafood",
  },
  description:
    "London's leading fresh & frozen seafood wholesaler since 2007. 500+ premium products, daily deliveries Mon-Sat. Trusted by Michelin-starred restaurants, luxury hotels & Premier League training grounds.",
  keywords: [
    "seafood wholesaler London",
    "fresh fish supplier London",
    "frozen seafood wholesale London",
    "premium seafood London",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "Paradise Seafood",
    title: "Paradise Seafood | London's Premium Seafood Wholesaler",
    description:
      "London's leading fresh & frozen seafood wholesaler since 2007. 500+ premium products delivered Mon-Sat.",
    images: [
      {
        url: "/images/paradise_seafood_dark_logo.svg",
        width: 1200,
        height: 700,
        alt: "Paradise Seafood — London's Premium Seafood Wholesaler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradise Seafood | London's Premium Seafood Wholesaler",
    description:
      "London's leading fresh & frozen seafood wholesaler since 2007. 500+ premium products delivered Mon-Sat.",
    images: ["/images/paradise_seafood_dark_logo.svg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Paradise Seafood",
  description:
    "London's premium fresh & frozen seafood wholesaler since 2007. Supplying Michelin-starred restaurants, luxury hotels, and London's finest kitchens.",
  url: SITE_URL,
  telephone: "+442078594099",
  email: "inquiries@paradiseseafood.co.uk",
  image: `${SITE_URL}/images/paradise_seafood_dark_logo.svg`,
  logo: `${SITE_URL}/images/paradise_seafood_dark_logo.svg`,
  foundingDate: "2007",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 17, Fishers Industrial Estate, Wiggenhall Road",
    addressLocality: "Watford",
    addressRegion: "Hertfordshire",
    postalCode: "WD18 0FN",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.6565,
    longitude: -0.3964,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "04:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "04:00",
      closes: "12:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "City", name: "Birmingham" },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Noto+Serif:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-primary/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
