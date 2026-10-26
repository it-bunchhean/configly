import { useCase } from "@/data/usecase";
import UseCaseCard from "../feature/UseCaseCard";


export default function CommonUseCases() {
  return (
    <section className="mb-30">
      <div className="mb-8">
          <h3 className="text-lg font-medium">
            Common Use Cases For Config File Conversion
          </h3>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 border-t border-l ">
      {useCase.map((useCase: { id: number; title: string; description: string; }) => (
      <UseCaseCard key={useCase.id} useCase={useCase} />
      ))}
    </div>
    </section>
  );
}