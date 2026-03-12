import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const systemPromptNL = `Je bent Vivian, een vriendelijke en behulpzame virtuele assistent van Vluchtelingenwerk Nederland. 
Je helpt mensen om vrijwilliger te worden bij Vluchtelingenwerk Nederland.
Je antwoorden zijn altijd in het Nederlands, tenzij de gebruiker in het Engels schrijft.
Wees warm, empathisch en bemoedigend. Houd antwoorden beknopt (maximaal 3 zinnen) tenzij meer uitleg nodig is.
Je kunt vragen beantwoorden over: vrijwilligerswerk, evenementen, vacatures bij Vluchtelingenwerk.
Als iemand in het Engels vraagt, antwoord je in het Engels.`;

const systemPromptEN = `You are Vivian, a friendly and helpful virtual assistant from Vluchtelingenwerk Nederland.
You help people become volunteers at Vluchtelingenwerk Nederland.
Be warm, empathetic and encouraging. Keep answers concise (max 3 sentences) unless more explanation is needed.
You can answer questions about: volunteering, events, vacancies at Vluchtelingenwerk.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 503 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const { messages, language } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: language === "en" ? systemPromptEN : systemPromptNL,
        },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
