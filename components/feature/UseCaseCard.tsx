import { Feature, UseCase } from "@/types";
import { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
   useCase: UseCase;
}

export default function UseCaseCard({ useCase }: UseCaseCardProps) {
  return (
    <div className="w-full border-r border-b p-6 -mr-px -mb-px">
      <h3 className="text-sm font-medium">{useCase.title}</h3>
      <p className="mt-2 text-sm text-muted">{useCase.description}</p>
    </div>
  );
}
