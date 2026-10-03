import type { Metadata, Viewport } from "next";
import { Jost, Marcellus } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { academy, guru, siteUrl } from "@/lib/content";
import { structuredData } from "@/lib/structured-data";
import "./globals.css";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const pageTitle = `${academy.name} — Odissi Dance Academy, Puri`;
const description = `${academy.name} is an Odissi dance academy in ${academy.city}, led by Guru ${guru.name}. Classical Odissi training for students in Puri, Odisha.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s · ${academy.name}`,
  },
  description,
  keywords: [
    "Odissi dance",
    "Odissi academy Puri",
    "Sukumari Kalakendra",
    "Itishree Pattnaik",
    "dance classes Puri",
    "Odisha classical dance",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: academy.name,
    title: pageTitle,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dancers of Sukumari Kalakendra performing Odissi on stage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1a1410",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${jost.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-ivory text-ink">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
