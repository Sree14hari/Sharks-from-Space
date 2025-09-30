
'use server';
/**
 * @fileOverview An AI flow for identifying shark species from images.
 *
 * - identifyShark - A function that handles the shark identification process.
 * - IdentifySharkInput - The input type for the identifyShark function.
 * - IdentifySharkOutput - The return type for the identifyShark function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifySharkInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a shark, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().optional().describe('An optional user-provided description of the shark or context.'),
});
export type IdentifySharkInput = z.infer<typeof IdentifySharkInputSchema>;

const IdentifySharkOutputSchema = z.object({
  identification: z.object({
    isShark: z.boolean().describe('Whether or not the image contains a shark.'),
    speciesName: z.string().describe('The common name of the identified shark species. Responds with "Unknown" if not a shark or unidentifiable.'),
    confidence: z.number().min(0).max(1).describe('A confidence score from 0.0 to 1.0 for the identification.'),
  }),
  facts: z.array(z.string()).describe('A list of 3-4 interesting, brief facts about the identified shark species.'),
  conservationStatus: z.string().describe('The official IUCN conservation status of the species (e.g., "Vulnerable", "Near Threatened", "Least Concern").'),
});
export type IdentifySharkOutput = z.infer<typeof IdentifySharkOutputSchema>;

export async function identifyShark(input: IdentifySharkInput): Promise<IdentifySharkOutput> {
  return identifySharkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifySharkPrompt',
  input: {schema: IdentifySharkInputSchema},
  output: {schema: IdentifySharkOutputSchema},
  prompt: `You are a world-renowned marine biologist and shark expert. Your task is to identify a shark species from an image and optional description.

You MUST follow these instructions:
1.  Analyze the provided image and description.
2.  Determine if the image contains a shark. Set the 'isShark' field accordingly.
3.  If it is a shark, identify the species and provide its common name. If you cannot identify the species with reasonable confidence, or if it is not a shark, set the speciesName to "Unknown".
4.  Provide a confidence score for your identification between 0.0 (no confidence) and 1.0 (certainty).
5.  List 3-4 interesting, brief, and distinct facts about the identified species.
6.  State the official IUCN conservation status for the species.

User-provided context:
Description: {{{description}}}
Shark Image: {{media url=photoDataUri}}`,
});

const identifySharkFlow = ai.defineFlow(
  {
    name: 'identifySharkFlow',
    inputSchema: IdentifySharkInputSchema,
    outputSchema: IdentifySharkOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
