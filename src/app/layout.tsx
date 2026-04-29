import type { Metadata } from "next";
import { DM_Sans, Rajdhani } from "next/font/google";
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

export const metadata: Metadata = {
  title: "EKAS by AdaptiveFactory — Manufacturing AI That Refuses to Guess",
  description:
    "EKAS turns production data into traceable manufacturing intelligence for SME precision manufacturers — stamping, fabrication, and metalforming shops. OEE, downtime root cause, cost variance, and document intelligence grounded in ISO 22400-2 and IATF 16949 standards.",
  authors: [{ name: "AdaptiveFactory AI Solutions" }],
  openGraph: {
    type: "website",
    title: "EKAS by AdaptiveFactory — Manufacturing AI That Refuses to Guess",
    description:
      "EKAS turns production data into traceable manufacturing intelligence for SME precision manufacturers — stamping, fabrication, and metalforming shops. OEE, downtime root cause, cost variance, and document intelligence grounded in ISO 22400-2 and IATF 16949 standards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${rajdhani.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
