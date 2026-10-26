import InputField from "../feature/InputField";
import type { FormatLanguage } from "@/lib/converter";

interface OutputAndInputSectionProps {
  initialFrom?: FormatLanguage;
  initialTo?: FormatLanguage;
}

const OutputAndInputSection = ({
  initialFrom,
  initialTo,
}: OutputAndInputSectionProps) => {
  return (
    <section id="converter" className="scroll-mt-24 mb-14">
      <div className="mb-8 ">
        <h3 className="text-lg font-medium font-bold ">Convert Your Configuration</h3>
        <p className="mt-2 text-sm text-muted">
          Past your configuration file below, choose the output format, and
          convert in instantly in your browser.
        </p>
      </div>
      <InputField initialFrom={initialFrom} initialTo={initialTo} />
      <div className="w-full flex flex-col sm:flex-row bg-white py-3">
        <p className="text-xs text-muted sm:text-sm">
          Want to learn more about configuration file formats?
        </p>
        <p>
          <a
            href="/documents#resource-link"
            rel="noopener noreferrer"
            className="ml-0 text-xs text-primary hover:underline sm:ml-1 sm:text-sm"
          >
            You can find official resources.
          </a>
        </p>
      </div>
    </section>
  );
};

export default OutputAndInputSection;
