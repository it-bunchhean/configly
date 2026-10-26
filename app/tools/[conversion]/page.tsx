import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OutputAndInputSection from "@/components/sections/OutputAndInputSection";
import type { FormatLanguage } from "@/lib/converter";

const formats: Record<string, FormatLanguage> = {
  properties: "Property",
  yaml: "Yaml",
  xml: "Xml",
  json: "Json",
  toml: "Toml",
  env: "Env",
};

const formatNames: Record<FormatLanguage, string> = {
  Property: "Properties",
  Yaml: "YAML",
  Xml: "XML",
  Json: "JSON",
  Toml: "TOML",
  Env: "ENV",
};

interface ConversionPageProps {
  params: Promise<{ conversion: string }>;
}

export function generateStaticParams() {
  return Object.keys(formats).flatMap((from) =>
    Object.keys(formats)
      .filter((to) => to !== from)
      .map((to) => ({ conversion: `${from}-to-${to}` })),
  );
}

export async function generateMetadata({
  params,
}: ConversionPageProps): Promise<Metadata> {
  const { conversion } = await params;
  const [fromSlug, toSlug] = conversion.split("-to-");
  const from = formats[fromSlug];
  const to = formats[toSlug];

  if (!from || !to || from === to) {
    return {};
  }

  const fromName = formatNames[from];
  const toName = formatNames[to];
  const title = `Convert ${fromName} to ${toName} Online`;
  const description = `Convert ${fromName} configuration files to ${toName} online for free. Fast, private, browser-based ${fromName} to ${toName} conversion with no uploads.`;

  return {
    title,
    description,
    keywords: [
      `${fromName} to ${toName} converter`,
      `convert ${fromName} to ${toName}`,
      `online ${fromName} converter`,
    ],
    alternates: {
      canonical: `/tools/${conversion}`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/tools/${conversion}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ConversionPage({ params }: ConversionPageProps) {
  const { conversion } = await params;
  const [fromSlug, toSlug] = conversion.split("-to-");

  if (!fromSlug || !toSlug) {
    notFound();
  }

  const initialFrom = formats[fromSlug];
  const initialTo = formats[toSlug];

  if (!initialFrom || !initialTo || initialFrom === initialTo) {
    notFound();
  }

  return (
    <section className="mx-auto my-10 w-full max-w-5xl flex-1 px-6">
      <OutputAndInputSection initialFrom={initialFrom} initialTo={initialTo} />
    </section>
  );
}
