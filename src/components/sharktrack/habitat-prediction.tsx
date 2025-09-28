import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Lightbulb } from "lucide-react";

export function HabitatPrediction() {
  const mapImage = PlaceHolderImages.find((img) => img.id === "habitat_map");

  const aiExplanation = `Based on integrated SWOT and PACE satellite data, this map highlights key foraging hotspots for several shark species. High-probability areas (in red and yellow) correlate with dynamic sea surface height anomalies and high chlorophyll-a concentrations, indicating nutrient-rich upwellings that attract prey. Specifically, the coast of California, the Gulf Stream, and the Coral Triangle show significant activity, driven by eddy currents and phytoplankton blooms detected by our models.`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Global Foraging Habitat Prediction</CardTitle>
        <CardDescription>
          AI-predicted shark activity hotspots based on NASA satellite data.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border">
          {mapImage && (
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              fill
              className="object-cover"
              data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
        </div>
        <Card className="bg-muted/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <Lightbulb className="h-6 w-6 text-primary neon-glow" />
            <CardTitle className="text-lg">AI-Generated Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{aiExplanation}</p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
