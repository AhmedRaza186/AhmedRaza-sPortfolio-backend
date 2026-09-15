import Groq from 'groq-sdk';
import { portfolioContext } from '../data/portfolioContext';
import prisma from './../lib/prisma';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateAIResponse = async (history: { role: string; content: string }[], userMessage: string): Promise<string> => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing. Cannot generate AI response.');
  }

  // Fetch dynamically learned facts from the database
  const learnedFacts = await prisma.learnedFact.findMany({
    orderBy: { createdAt: 'asc' }
  });

  let learnedFactsSection = '';
  if (learnedFacts.length > 0) {
    learnedFactsSection = `\nDynamically Learned Facts (CRITICAL - YOU MUST ADHERE TO THESE NEW FACTS):\n`;
    learnedFacts.map((fact, index) => {
      learnedFactsSection += `${index + 1}. ${fact.fact}\n`;
    });
  }

  const systemPrompt = `You are the AI assistant for Ahmed Raza's portfolio.
You must answer questions about Ahmed using ONLY the provided factual context below.${learnedFactsSection}

Rules:
${portfolioContext.aiInstructions.map(rule => `- ${rule}`).join('\n')}

Formatting & Style (CRITICAL - STRICT ADHERENCE REQUIRED):
- NEVER use Markdown tables (e.g. | Company | Role |). Present information conversationally using headings and bullets.
- NEVER output HTML tags (e.g. <br>, <div>, <span>, <p>, <a>). The response must be plain text and Markdown only.
- Keep responses conversational, natural, and concise. Do not make answers look like a CV dump or database output.
- Use clear headings/bold text and short paragraphs for readability. Use bullets only when they improve readability.

Languages & Writing Script (CRITICAL - STRICT ADHERENCE REQUIRED):
- You must strictly preserve the user's language AND writing script.
- English input -> English response.
- Roman Urdu input (Latin alphabet) -> Roman Urdu response (Latin alphabet).
- EXTREMELY IMPORTANT: IF THE USER TYPES IN ROMAN URDU (LATIN CHARACTERS like "Ahmed kon hai"), YOU MUST NEVER, UNDER ANY CIRCUMSTANCES, USE URDU/ARABIC SCRIPT (e.g. احمد). YOU MUST RESPOND ONLY USING THE LATIN ALPHABET (e.g. "Ahmed ek developer hai").
- Urdu script input -> Urdu script response.
- Mixed English + Roman Urdu -> Mixed English + Roman Urdu response.
- Do NOT switch to Urdu script just because the semantic language is Urdu.
- Technical terms (React, Node.js, etc.) can remain in English naturally.

Navigation Links:
- First answer the user's actual question naturally.
- Then, ONLY if genuinely relevant, provide 1-4 related navigation links.
- DO NOT automatically add LinkedIn or GitHub to every response. Only include them if the user asks for social/contact info, or if they are genuinely relevant.
- For experience questions, just link to [→ Experience](/experience).
- Links MUST appear at the end under a "Related:" heading.
- Example format:
  Related:
  * [→ Experience](/experience)
- NEVER invent or hallucinate URLs. ONLY use URLs from the \`links\` object in the Factual Context.
- Direct link requests (e.g., "LinkedIn do") should be answered briefly with the actual link.

Factual Context:
${JSON.stringify(portfolioContext, (key, value) => key === 'aiInstructions' ? undefined : value, 2)}
`;

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...history.map(msg => ({ role: msg.role as 'user' | 'assistant', content: msg.content })),
    { role: 'user', content: userMessage }
  ];

  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model,
      temperature: 0.2, // Keep responses grounded and factual
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error('[Groq Service Error]', error);
    throw new Error(`Groq failed: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
};

export const processLearnedFact = async (rawInput: string): Promise<string> => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is missing.');
  }

  const systemPrompt = `You are an expert translator and data extraction AI.
Your ONLY job is to take the user's raw input (which may be in Roman Urdu, Urdu, broken English, or a mix) and extract the core fact or instruction they are trying to teach the AI.
Convert it into a SINGLE, clear, professional English instruction or fact that another AI can strictly follow.

Rules:
1. Output ONLY the translated instruction/fact. No conversational filler like "Here is the fact:"
2. Make it concise and actionable.
3. Example Raw Input: "mera naya course start horaha hai kal se web dev ka"
   Example Output: "Ahmed is starting a new Web Development course tomorrow."
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: rawInput }
      ],
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
      temperature: 0.1, // very low temperature for exact translation
      max_tokens: 150,
    });

    return chatCompletion.choices[0]?.message?.content?.trim() || "Failed to extract fact.";
  } catch (error) {
    console.error('[Groq Process Fact Error]', error);
    throw new Error(`Groq failed to process fact: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
};
