'use server';

/**
 * @fileOverview An AI agent that suggests related but non-obvious sea surface variables that might correlate with shark activity.
 *
 * - suggestRelatedVariables - A function that suggests related sea surface variables.
 * - SuggestRelatedVariablesInput - The input type for the suggestRelatedVariables function.
 * - SuggestRelatedVariablesOutput - The return type for the suggestRelatedVariables function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedVariablesInputSchema = z.object({
  variable: z.string().describe('The sea surface variable to find related variables for.'),
});
export type SuggestRelatedVariablesInput = z.infer<typeof SuggestRelatedVariablesInputSchema>;

const SuggestRelatedVariablesOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of related sea surface variables.'),
});
export type SuggestRelatedVariablesOutput = z.infer<typeof SuggestRelatedVariablesOutputSchema>;

export async function suggestRelatedVariables(input: SuggestRelatedVariablesInput): Promise<SuggestRelatedVariablesOutput> {
  return suggestRelatedVariablesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedVariablesPrompt',
  input: {schema: SuggestRelatedVariablesInputSchema},
  output: {schema: SuggestRelatedVariablesOutputSchema},
  prompt: `You are an expert in oceanography and marine biology. Your task is to suggest related but non-obvious sea surface variables that might correlate with shark activity, given a specific variable.

Variable: {{{variable}}}

Suggestions:`,
});

const suggestRelatedVariablesFlow = ai.defineFlow(
  {
    name: 'suggestRelatedVariablesFlow',
    inputSchema: SuggestRelatedVariablesInputSchema,
    outputSchema: SuggestRelatedVariablesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
