import type { Metadata } from "next";
import { archivo, sourceSerif } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.mottoShort}`,
    template: `%s | ${site.name}`,
  },
  description: site.mission,
  // Drawn directly from the seven units' real offerings — not a fabricated
  // or generic list. Modern search engines don't weight this field, but it
  // costs nothing to include accurately.
  keywords: [
    "Afrihope Group",
    "Cameroon multi-sector holding group",
    "business consulting Cameroon",
    "technology solutions Africa",
    "public contracts Cameroon",
    "brand identity design",
    "car rental Cameroon",
    "natural food production",
    "real estate Cameroon",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-teal"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
