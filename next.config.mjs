/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  async redirects() {
    return [
      {
        source: "/our-products",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/our-products/",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/why-paradise",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/why-paradise/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact-us/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/open-an-account",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/open-an-account/",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/paradise4home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/paradise4home/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
