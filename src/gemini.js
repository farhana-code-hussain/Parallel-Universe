import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function generateCareerAnalysis(
  decision,
  goal,
  context
) {
  const prompt = `
You are a career mentor.

Decision:
${decision}

Goal:
${goal}

Context:
${context}

Generate ONLY valid JSON in this format:

{
  "universeA": {
    "focus": "",
    "pros": ["", ""],
    "risk": ""
  },
  "universeB": {
    "focus": "",
    "pros": ["", ""],
    "risk": ""
  },
  "suggestedPath": ""
}

Do not include markdown.
Do not include explanation.
Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}