'use server';

/**
 * @fileOverview Predicts shark foraging habitats based on integrated NASA satellite data and environmental variables.
 *
 * - predictForagingHabitats - A function that initiates the habitat prediction process.
 * - PredictForagingHabitatsInput - The input type for the predictForagingHabitats function.
 * - PredictForagingHabitatsOutput - The return type for the predictForagingHabitats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictForagingHabitatsInputSchema = z.object({
  satelliteData: z
    .string()
    .describe('NASA satellite data including SWOT and PACE data.'),
  environmentalVariables: z
    .string()
    .describe(
      'Environmental variables such as sea surface temperature, salinity, and chlorophyll levels.'
    ),
});
export type PredictForagingHabitatsInput = z.infer<
  typeof PredictForagingHabitatsInputSchema
>;

const PredictForagingHabitatsOutputSchema = z.object({
  foragingHabitatsMap: z
    .string()
    .describe(
      'A global map of potential shark activity hotspots, represented as a data URI of an image.'
    ),
  explanation: z
    .string()
    .describe(
      'An explanation of the factors contributing to the predicted foraging habitats.'
    ),
});
export type PredictForagingHabitatsOutput = z.infer<
  typeof PredictForagingHabitatsOutputSchema
>;

export async function predictForagingHabitats(
  input: PredictForagingHabitatsInput
): Promise<PredictForagingHabitatsOutput> {
  return predictForagingHabitatsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictForagingHabitatsPrompt',
  input: {schema: PredictForagingHabitatsInputSchema},
  output: {schema: PredictForagingHabitatsOutputSchema},
  prompt: `You are an expert marine biologist specializing in shark behavior and habitat prediction.

  Based on the integrated NASA satellite data (SWOT, PACE) and environmental variables, predict potential shark foraging habitats and create a global map of shark activity hotspots.

  Consider the following data:

  Satellite Data: {{{satelliteData}}}
  Environmental Variables: {{{environmentalVariables}}}

  Provide a global map visualization of predicted shark foraging hotspots, outputting the map as a data URI for an image. Also, explain the key factors influencing these predictions.
  `,
});

const predictForagingHabitatsFlow = ai.defineFlow(
  {
    name: 'predictForagingHabitatsFlow',
    inputSchema: PredictForagingHabitatsInputSchema,
    outputSchema: PredictForagingHabitatsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
