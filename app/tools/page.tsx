import type { Metadata } from "next";
import OutputAndInputSection from "@/components/sections/OutputAndInputSection";
import InputField from "@/components/feature/InputField";

export const metadata: Metadata = {
  title: "Online Configuration File Converter",
  description:
    "Convert YAML, JSON, TOML, ENV, Properties, and XML configuration files online for free. Fast browser-based conversion with no uploads.",
  alternates: {
    canonical: "/tools",
  },
};

const page = () => {
  return (
    <section className="mx-auto w-full max-w-5xl my-10 flex-1 px-6">
      <OutputAndInputSection />
    </section>
  );
};

export default page;
