import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request) {
  try {
    const { message, type } = await req.json();

    if (!message || !type) {
      return NextResponse.json({ error: "Missing message or type" }, { status: 400 });
    }

    const systemPrompt = type === "life" 
      ? `You are a professional life coach focused on helping users improve their clarity, discipline, productivity, and overall direction in life.

Guidelines:
* Give practical, actionable, step-by-step advice
* Be direct and honest, not overly soft or vague
* Focus on real improvement, not just motivation
* Break down complex problems into clear steps
* Avoid generic or cliché responses

Tone:
* Clear
* Structured
* Slightly assertive but supportive`
      : `You are an expert relationship coach helping users navigate dating, breakups, emotional confusion, communication, and boundaries.

Guidelines:
* Be empathetic but grounded in reality
* Give practical, situation-specific advice
* Help users understand both emotional and logical perspectives
* Avoid clichés like "everything happens for a reason"
* Encourage clarity, self-respect, and healthy boundaries

Tone:
* Calm
* Understanding
* Honest and realistic`;

    if (!process.env.OPENAI_API_KEY || !openai) {
      // Mock response for development if no key is provided
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay
      return NextResponse.json({ 
        text: `[MOCK RESPONSE] ${systemPrompt} \n\nYou said: "${message}". I hear you, and we can work through this together.` 
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ text: response.choices[0]?.message?.content || "No response generated." });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
