import { features } from "@/data/feature";
import FeatureCard from "../feature/FeatureCard";

export default function FeaturesSection() {
  return (
    <section className="mb-30">
      <div className="mb-8">
          <h3 className="text-lg font-medium">
            Why Choose Configly? 
          </h3>
          <p className="mt-2 text-sm text-muted">
            Convert config file formats fast and securely.
          </p>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l ">
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} Icon={feature.icon} />
      ))}
    </div>
    </section>
  );
}
