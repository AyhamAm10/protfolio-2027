import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { getContent } from "@/content";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const content = getContent();

export const metadata: Metadata = {
  metadataBase: new URL(content.meta.url),
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: content.meta.url,
    siteName: "Ayham Ashram",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
  alternates: { canonical: "/" },
  authors: [{ name: "Ayham Ashram", url: content.meta.url }],
};

export const viewport: Viewport = {
  themeColor: "#0e0b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={content.locale}
      dir={content.dir}
      className={`${bodoni.variable} ${schibsted.variable} ${plexMono.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
