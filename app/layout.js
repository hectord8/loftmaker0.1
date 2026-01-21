import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Loft Maker London",
  description: "Loft conversions and construction services in London",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <h1 className="display">Loft Maker London</h1>
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Loft Maker London logo"
            />
        </header>
        <main>{children}</main>
        <footer >
            <div className="top">
              <div>
                <h3>Contact</h3>
                <address>
                  <ul>
                    <li>Craig Darrach</li>
                    <li>Loftmaker@live.co.uk</li>
                    <li>07736777527</li>
                    <li>
                      <a href="https://www.instagram.com/instagram/?hl=en">
                        @Loft Maker
                      </a>
                    </li>
                  </ul>
                </address>
              </div>
              <div>
                <h3>Office hours </h3>
                <ul>
                  <li>Mon -Fri 8:00 - 18:00</li>
                  <li> Sat: 10:00 - 15:00</li>
                  <li> Sunday CLOSED</li>
                </ul>
              </div>
              <div>
                <h3>Loft Maker London</h3>
                <p>High quality, reliable, personal contracting and construction services throughout the London and wider Essex region.</p>
              </div>
            </div>
            <div className="bottom">
              <Image
                src="/logo.png"
                width={120}
                height={120}
                alt="Loft Maker London logo"
              />
            <p>Website made by Hector Darrach</p>
               </div>
        </footer>
      </body>
    </html>
  );
}
