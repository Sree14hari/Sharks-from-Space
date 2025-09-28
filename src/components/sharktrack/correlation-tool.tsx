"use client";

import { useState, useMemo } from "react";
import {
  suggestRelatedVariables,
  type SuggestRelatedVariablesOutput,
} from "@/ai/flows/suggest-related-variables";
import { seaSurfaceVariables } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Wand2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const chartConfig = {
  correlation: {
    label: "Correlation",
  },
  "temp": { label: "Temperature", color: "hsl(var(--chart-1))" },
  "salinity": { label: "Salinity", color: "hsl(var(--chart-2))" },
  "chlorophyll": { label: "Chlorophyll", color: "hsl(var(--chart-3))" },
  "height": { label: "Sea Height", color: "hsl(var(--chart-4))" },
  "currents": { label: "Currents", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export function CorrelationTool() {
  const [selectedVariable, setSelectedVariable] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelect = async (value: string) => {
    if (!value) return;
    setSelectedVariable(value);
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const result: SuggestRelatedVariablesOutput = await suggestRelatedVariables({
        variable: value,
      });
      setSuggestions(result.suggestions);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: "Could not fetch related variables. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const chartData = useMemo(() => {
    // Generate mock data based on selected variable
    if (!selectedVariable) return [];
    const base = Math.random();
    return [
      { month: "Jan", temp: (base * 0.8 + Math.random() * 0.2).toFixed(2), salinity: (base * 0.5 + Math.random() * 0.5).toFixed(2), chlorophyll: (base * 0.2 + Math.random() * 0.8).toFixed(2), height: (base * 0.9 + Math.random() * 0.1).toFixed(2), currents: (base * 0.4 + Math.random() * 0.6).toFixed(2) },
      { month: "Feb", temp: (base * 0.82 + Math.random() * 0.2).toFixed(2), salinity: (base * 0.52 + Math.random() * 0.5).toFixed(2), chlorophyll: (base * 0.22 + Math.random() * 0.8).toFixed(2), height: (base * 0.88 + Math.random() * 0.1).toFixed(2), currents: (base * 0.42 + Math.random() * 0.6).toFixed(2) },
      { month: "Mar", temp: (base * 0.85 + Math.random() * 0.2).toFixed(2), salinity: (base * 0.55 + Math.random() * 0.5).toFixed(2), chlorophyll: (base * 0.25 + Math.random() * 0.8).toFixed(2), height: (base * 0.85 + Math.random() * 0.1).toFixed(2), currents: (base * 0.45 + Math.random() * 0.6).toFixed(2) },
      { month: "Apr", temp: (base * 0.87 + Math.random() * 0.2).toFixed(2), salinity: (base * 0.57 + Math.random() * 0.5).toFixed(2), chlorophyll: (base * 0.27 + Math.random() * 0.8).toFixed(2), height: (base * 0.82 + Math.random() * 0.1).toFixed(2), currents: (base * 0.47 + Math.random() * 0.6).toFixed(2) },
      { month: "May", temp: (base * 0.9 + Math.random() * 0.2).toFixed(2), salinity: (base * 0.6 + Math.random() * 0.5).toFixed(2), chlorophyll: (base * 0.3 + Math.random() * 0.8).toFixed(2), height: (base * 0.8 + Math.random() * 0.1).toFixed(2), currents: (base * 0.5 + Math.random() * 0.6).toFixed(2) },
    ];
  }, [selectedVariable]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Variable Selector</CardTitle>
          <CardDescription>
            Choose a variable to see correlations and get AI suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Select onValueChange={handleSelect} value={selectedVariable}>
            <SelectTrigger id="variable-selector" aria-label="Select a sea surface variable">
              <SelectValue placeholder="Select a variable..." />
            </SelectTrigger>
            <SelectContent>
              {seaSurfaceVariables.map((variable) => (
                <SelectItem key={variable} value={variable}>
                  {variable}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-4">
            <h3 className="flex items-center font-semibold">
              <Wand2 className="mr-2 h-5 w-5 text-primary neon-glow" />
              AI-Suggested Correlations
            </h3>
            <div className="flex min-h-[8rem] flex-wrap gap-2 rounded-lg border border-dashed bg-muted/50 p-4">
              {isLoading && (
                <>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-40" />
                </>
              )}
              {!isLoading && !error && suggestions.length > 0 && (
                suggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="secondary"
                    className="border-primary/50 text-base"
                  >
                    {suggestion}
                  </Badge>
                ))
              )}
              {!isLoading && !error && suggestions.length === 0 && selectedVariable && (
                 <p className="w-full text-center text-muted-foreground">No suggestions found.</p>
              )}
               {!isLoading && !error && !selectedVariable && (
                 <p className="w-full text-center text-sm text-muted-foreground">Select a variable to see suggestions.</p>
              )}
              {error && (
                <Alert variant="destructive" className="w-full">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Could not load AI suggestions.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Correlation Visualization</CardTitle>
          <CardDescription>
            Monthly correlation trends for {selectedVariable || "..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedVariable ? (
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={[0, 1]}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="temp" fill="var(--color-temp)" radius={4} />
                <Bar dataKey="salinity" fill="var(--color-salinity)" radius={4} />
                <Bar dataKey="chlorophyll" fill="var(--color-chlorophyll)" radius={4} />
                <Bar dataKey="height" fill="var(--color-height)" radius={4} />
                 <Bar dataKey="currents" fill="var(--color-currents)" radius={4} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="flex h-[250px] w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
              <p className="text-muted-foreground">
                Select a variable to view the chart.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
