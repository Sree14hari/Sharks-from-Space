import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sharkFacts } from "@/lib/data";

export function SharkFacts() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Shark Knowledge Base</CardTitle>
        <CardDescription>
          Learn more about sharks and the technology used to study them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {sharkFacts.map((fact) => (
            <AccordionItem value={fact.id} key={fact.id}>
              <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
                {fact.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {fact.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
