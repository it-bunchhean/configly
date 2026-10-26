import { ExternalLink } from "lucide-react";
import { resources } from "../../data/reference";

export default function ReferenceSection() {
  return (
    <section className="mt-12">
      <div className=" border p-6">
        <div>
          <h3 className="text-lg font-medium">
            Official Resources
          </h3>

          <p className="mt-1 text-sm text-muted">
            Learn more about each configuration format, including its syntax, structure, and common use cases.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border p-4 transition-colors duration-200 hover:bg-primary/5"
            >
              <div>
                <p className="text-sm font-medium group-hover:text-primary">
                  {resource.name}
                </p>

                <p className="mt-1 text-xs text-muted">
                  {resource.description}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="shrink-0 text-muted transition-colors group-hover:text-primary"
                id="resource-link"
              />
            </a>
          ))}
        </div>
      </div>
        <div className="mt-4">
          <p className="mt-2 flex items-center gap-1 text-xs text-muted sm:text-sm">
            Have a suggestion or feedback?{" "}Feel free to open a
            <a
              href="https://github.com/it-chhean/configly"
              rel="noopener noreferrer"
              title="github.com/it-chhean/configly"
              className="text-primary underline"
            >
            Pull Request.
            </a>
          </p>
        </div>
    </section>
  );
}
