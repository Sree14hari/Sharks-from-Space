import { Header } from "@/components/sharktrack/header";
import { HabitatPrediction } from "@/components/sharktrack/habitat-prediction";
import { CorrelationTool } from "@/components/sharktrack/correlation-tool";
import { TagVisualization } from "@/components/sharktrack/tag-visualization";
import { SharkFacts } from "@/components/sharktrack/shark-facts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Fish, BarChart, Cpu, Info } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Tabs defaultValue="habitats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="habitats">
              <Fish className="mr-2" />
              Habitats
            </TabsTrigger>
            <TabsTrigger value="correlation">
              <BarChart className="mr-2" />
              Correlation
            </TabsTrigger>
            <TabsTrigger value="tag-tech">
              <Cpu className="mr-2" />
              Tag Tech
            </TabsTrigger>
            <TabsTrigger value="facts">
              <Info className="mr-2" />
              Shark Facts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="habitats" className="mt-4">
            <HabitatPrediction />
          </TabsContent>
          <TabsContent value="correlation" className="mt-4">
            <CorrelationTool />
          </TabsContent>
          <TabsContent value="tag-tech" className="mt-4">
            <TagVisualization />
          </TabsContent>
          <TabsContent value="facts" className="mt-4">
            <SharkFacts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
