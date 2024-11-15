import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key is not configured. Reflection analysis will be simulated.');
}

const openai = apiKey ? new OpenAI({ 
  apiKey,
  dangerouslyAllowBrowser: true // Enable browser usage
}) : null;

export interface AnalyzeReflectionParams {
  prompt: string;
  response: string;
  context: string;
  keyTerms?: string[];
  topics?: string[];
  maxLength?: number;
}

export async function analyzeReflection({
  prompt,
  response,
  context,
  keyTerms = [],
  topics = [],
  maxLength = 500
}: AnalyzeReflectionParams) {
  if (response.length > maxLength) {
    return {
      isValid: false,
      feedback: `Your response exceeds the maximum length of ${maxLength} characters. Please shorten your response.`
    };
  }

  // If OpenAI is not configured, provide simulated feedback
  if (!openai) {
    const isValid = response.length >= 50; // Simple length-based validation
    return {
      isValid,
      feedback: isValid 
        ? 'Your reflection appears to be on topic and sufficiently detailed.'
        : 'Please provide a more detailed response (at least 2-3 sentences).'
    };
  }

  const systemPrompt = `You are an educational AI assistant evaluating student reflections for a financial literacy course. 
Evaluate the response based on:
1. Relevance to the prompt and context
2. Incorporation of key terms: ${keyTerms.join(', ')}
3. Coverage of topics: ${topics.join(', ')}
4. Depth of reflection (minimum 2-3 sentences)

Provide brief, constructive feedback in 1-2 sentences.`;

  const userPrompt = `Prompt: ${prompt}
Context: ${context}
Student Response: ${response}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 100,
      temperature: 0.7
    });

    const feedback = completion.choices[0]?.message?.content || 'Unable to analyze response.';
    const isValid = !feedback.toLowerCase().includes('improve') && 
                   !feedback.toLowerCase().includes('consider') &&
                   !feedback.toLowerCase().includes('try');

    return {
      isValid,
      feedback
    };
  } catch (error) {
    console.error('Error analyzing reflection:', error);
    return {
      isValid: false,
      feedback: 'Unable to analyze response. Please try again later.'
    };
  }
}