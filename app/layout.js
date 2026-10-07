import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const googleSansFlex = localFont({
  src: "./fonts/GoogleSansFlex-latin.woff2",
  variable: "--font-google-sans-flex",
  weight: "100 1000",
  display: "swap",
  adjustFontFallback: false,
});

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
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
