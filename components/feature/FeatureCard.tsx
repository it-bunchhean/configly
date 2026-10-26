import { Feature } from "@/types";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
  Icon: LucideIcon;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;
  return (
    <div className="w-full border-r border-b p-6 -mr-px -mb-px">
      <Icon className="mb-2 h-4 w-4 " />
      <h3 className="text-sm font-medium">{feature.title}</h3>
      <p className="mt-2 text-sm text-muted">{feature.description}</p>
    </div>
  );
}