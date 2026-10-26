import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import { FaqItem, faqItems } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
  className?: string;
}

const FAQSection = ({items = faqItems,className,}: Faq1Props) => {
  return (
    <section className={cn("mb-30", className)}>
      <div className="container">
        <div>
         <div className="mb-8">
            <h3 className="text-lg font-medium">
                Frequently asked questions 
            </h3>
            <p className="mt-2 text-sm text-muted">
              Everything you need to know to get started.
            </p>
         </div>
          <Accordion multiple={false}>
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className=" font-medium hover:underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
