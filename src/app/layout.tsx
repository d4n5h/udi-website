import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { site } from "@/data/site-content";
import { assetPath } from "@/lib/asset-path";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Udi Shlomo",
    template: "%s · Udi Shlomo",
  },
  description: site.description,
  icons: {
    icon: assetPath("/images/favicon-square.jpg"),
    apple: assetPath("/images/favicon-square.jpg"),
  },
  openGraph: {
    title: "Udi Shlomo",
    description: site.description,
    url: site.url,
    siteName: "Udi Shlomo",
    images: [{ url: new URL(assetPath("/images/hero-udi-wide.jpg"), site.url).href, width: 2560, height: 1440 }],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
