import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://configly.site";
const siteName = "Configly";
const siteDescription =
  "Convert yaml, json, toml, env, properties, and xml configuration files instantly. Fast, simple, and browser-based — your data stays on your device.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Config File Converter - Convert YAML, JSON, TOML, ENV & Properties | Configly`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    // Main intent
    "configuration file converter",
    "config file converter",
    "configuration converter",
    "config converter",
    "online configuration file converter",
    "online config converter",
    "free configuration file converter",
    "configuration format converter",
    "configuration file conversion",
    "convert configuration files",
    "convert config files online",

    // YAML
    "YAML converter",
    "YAML file converter",
    "YAML configuration converter",
    "YAML to JSON converter",
    "YAML to Properties converter",
    "YAML to TOML converter",
    "YAML to XML converter",
    "YAML to ENV converter",
    "YAML to INI converter",

    // JSON
    "JSON converter",
    "JSON file converter",
    "JSON configuration converter",
    "JSON to YAML converter",
    "JSON to TOML converter",
    "JSON to XML converter",
    "JSON to ENV converter",
    "JSON to Properties converter",
    "JSON to INI converter",

    // TOML
    "toml",
    "TOML converter",
    "TOML file converter",
    "TOML configuration converter",
    "TOML to YAML converter",
    "TOML to JSON converter",
    "TOML to XML converter",
    "TOML to ENV converter",
    "TOML to Properties converter",

    // ENV
    "env",
    "ENV file converter",
    "ENV converter",
    "environment file converter",
    "environment variable file converter",
    "ENV to YAML converter",
    "ENV to JSON converter",
    "ENV to TOML converter",
    "ENV to XML converter",
    "ENV to Properties converter",

    // Java Properties
    "Java properties converter",
    "Java properties file converter",
    "properties file converter",
    "application.properties converter",
    "Spring Boot properties converter",
    "Properties to YAML converter",
    "Properties to JSON converter",
    "Properties to TOML converter",
    "Properties to XML converter",
    "Properties to ENV converter",

    // XML
    "xml",
    "XML converter",
    "XML file converter",
    "XML configuration converter",
    "XML to YAML converter",
    "XML to JSON converter",
    "XML to TOML converter",
    "XML to ENV converter",
    "XML to Properties converter",

    // Developer intent
    "convert tools",
    "developer tools",
    "online developer tools",
    "developer configuration tools",
    "configuration tools for developers",
    "online configuration tools",
    "free developer tools",
  ],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
    title: `${siteName} - The Configuration File Converter`,
    description: siteDescription,
    images: [
      {
        url: "/assets/image/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: `${siteName} — The Configuration File Converter`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - The Configuration File Converter`,
    description: siteDescription,
    images: ["/assets/image/og-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Configly",
    url: "https://configly.site",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Online configuration file converter for YAML, JSON, TOML, ENV, Properties and XML.",
  };
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen scroll-smooth">
        <Navbar />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}
