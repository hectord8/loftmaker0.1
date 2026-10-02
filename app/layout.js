import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { site } from "@/data/site";

const googleSansFlex = localFont({
  src: "./fonts/GoogleSansFlex-latin.woff2",
  variable: "--font-google-sans-flex",
  weight: "100 1000",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata = {
  metadataBase: new URL(site.url),
  // Pages export a short title; the template appends the brand name.
  title: {
    default: "Loft Conversions London & Essex | Loft Maker London",
    template: "%s | Loft Maker London",
  },
  description: site.description,
  applicationName: site.name,
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: true },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Loft Conversions London & Essex | Loft Maker London",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: site.defaultOgImage,
        width: 1200,
        height: 630,
        alt: site.defaultOgImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loft Conversions London & Essex | Loft Maker London",
    description: site.description,
    images: [site.defaultOgImage],
  },
  // The favicon used to be the full 900x900 /logo.png. next/image never
  // touches favicons, so every visit pulled 144 KiB of image data just to draw a
  // 16px square - it showed up as a 144 KiB request in the Lighthouse trace.
  // These are real, correctly sized PNGs (787 B to 9 KB).
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION once Search Console gives you the
  // token. Left unset rather than guessed at.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e2e2e2",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en-GB">
      <head>
        {/*
          Scroll-reveal animations start from opacity: 0 and are unblocked by
          IntersectionObserver. Without JavaScript that would leave the content
          permanently invisible, so reveal it as a progressive enhancement.
        */}
        <noscript>
          <style>{`
            .reveal, .motionReveal, .stagger > *, .stagger li, .heroItem {
              opacity: 1 !important;
              transform: none !important;
              animation: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className={googleSansFlex.variable}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
