/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first, then WebP: smaller files at the same quality, which is most of
    // the win on a hero image and a 50-photo gallery.
    formats: ["image/avif", "image/webp"],
    // One quality setting, referenced by every <Image>, so the numbers can be
    // tuned in one place instead of drifting across a dozen components.
    qualities: [60, 75, 90],
    // Largest image on the site is the 4032px-wide hero source.
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920, 2560, 3840],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  async headers() {
    return [
      {
        // Long-lived immutable caching for the fingerprinted image optimiser
        // output and the build assets.
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security headers. No CSP here: the Sanity Studio and the contact form
        // both need inline and third-party script, and a half-finished CSP is
        // worse than none. Add one with a report-only policy once the real
        // source list is known.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // The Studio is a CMS, not part of the public site.
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    return [
      // Post URLs moved to /blog/[slug]; that route issues its own
      // permanentRedirect per slug so it resolves to the real article rather
      // than to this index. This catches the bare /posts index.
      { source: "/posts", destination: "/blog", permanent: true },
      { source: "/posts/", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;