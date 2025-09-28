import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Zap, Thermometer, Droplets, Utensils, Satellite } from "lucide-react";

type SensorPointProps = {
  top: string;
  left: string;
  name: string;
  description: string;
  children: React.ReactNode;
};

const SensorPoint = ({ top, left, name, description, children }: SensorPointProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ top, left }}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background/80 transition-all hover:scale-110 hover:bg-primary">
          <div className="h-6 w-6 animate-pulse rounded-full bg-primary/50" />
          <div className="absolute">{children}</div>
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent side="top" className="max-w-xs text-center">
      <p className="font-bold">{name}</p>
      <p>{description}</p>
    </TooltipContent>
  </Tooltip>
);

export function TagVisualization() {
  const sharkImage = PlaceHolderImages.find((img) => img.id === "shark_with_tag");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Conceptual Shark Tag Technology</CardTitle>
        <CardDescription>
          Visualizing the next generation of real-time dietary and environmental sensors.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          {sharkImage && (
            <Image
              src={sharkImage.imageUrl}
              alt={sharkImage.description}
              fill
              className="object-cover"
              data-ai-hint={sharkImage.imageHint}
            />
          )}
          <TooltipProvider delayDuration={0}>
            <SensorPoint
              top="35%"
              left="52%"
              name="Satellite Transmitter"
              description="Transmits collected data to the ARGOS satellite network whenever the shark surfaces."
            >
              <Satellite className="h-4 w-4 text-primary-foreground" />
            </SensorPoint>
            <SensorPoint
              top="48%"
              left="38%"
              name="Bio-electrical Sensor"
              description="Measures muscle contractions and electrical fields to analyze hunting activity and success."
            >
              <Zap className="h-4 w-4 text-primary-foreground" />
            </SensorPoint>
             <SensorPoint
              top="60%"
              left="58%"
              name="Dietary Intake Sensor"
              description="A conceptual sensor using isotopic analysis of tissue samples to determine recent dietary intake."
            >
              <Utensils className="h-4 w-4 text-primary-foreground" />
            </SensorPoint>
            <SensorPoint
              top="25%"
              left="65%"
              name="Environmental Sensor Suite"
              description="Measures sea surface temperature, salinity, and depth to correlate behavior with environmental conditions."
            >
              <Thermometer className="h-4 w-4 text-primary-foreground" />
            </SensorPoint>
            <SensorPoint
              top="70%"
              left="45%"
              name="Chlorophyll Sensor"
              description="Detects phytoplankton density, a key indicator for the base of the food web."
            >
              <Droplets className="h-4 w-4 text-primary-foreground" />
            </SensorPoint>
          </TooltipProvider>
        </div>
        <div className="space-y-4">
          <h3 className="font-headline text-xl">How It Works</h3>
          <p className="text-muted-foreground">
            This conceptual tag represents a leap forward in marine biology research. By combining traditional tracking with novel, real-time sensors, we can build a comprehensive picture of a shark's life.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">Real-time Data:</span>{" "}
              Sensors would continuously collect data on the shark's environment and behavior.
            </li>
            <li>
              <span className="font-semibold text-foreground">Dietary Insights:</span> A key innovation is the conceptual dietary sensor, which could analyze chemical markers to understand what the shark is eating without invasive methods.
            </li>
             <li>
              <span className="font-semibold text-foreground">AI-Powered Prediction:</span> The data collected would be fed into machine learning models, like the one on this dashboard, to refine and improve habitat predictions.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
