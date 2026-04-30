import type { Metadata } from "next";
import { DM_Sans, Rajdhani } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ekas.adaptivefactory.net";
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

const HOME_TITLE = "EKAS by AdaptiveFactory — Manufacturing AI That Refuses to Guess";
const HOME_DESCRIPTION =
  "EKAS turns production data into traceable manufacturing intelligence for SME precision manufacturers — stamping, fabrication, and metalforming shops. OEE, downtime root cause, cost variance, and document intelligence grounded in ISO 22400-2 and IATF 16949 standards.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s — EKAS by AdaptiveFactory",
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: "AdaptiveFactory AI Solutions" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "EKAS by AdaptiveFactory",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${rajdhani.variable}`}>
      <body className="antialiased">
        {children}
        {HUBSPOT_PORTAL_ID && (
          <Script
            id="hubspot-tracking"
            src={`//js-na2.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
