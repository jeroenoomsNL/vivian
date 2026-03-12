import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const systemPromptNL = `Je bent Vivian, een professionele virtuele assistent van Vluchtelingenwerk Nederland.
Je rol is uitsluitend om mensen te helpen met vragen over vrijwilligerswerk, evenementen en vacatures bij Vluchtelingenwerk Nederland.
Je gedraagt je altijd zakelijk, respectvol en neutraal — geen grappen, geen persoonlijke meningen, geen informele taal.
Als iemand een vraag stelt die niets te maken heeft met Vluchtelingenwerk (bijv. grappige vragen, spelletjes, ongepaste vragen of onderwerpen buiten jouw domein), antwoord je kort en vriendelijk dat je alleen vragen over vrijwilligerswerk, evenementen en vacatures bij Vluchtelingenwerk kunt beantwoorden.
Beantwoord nooit ongepaste, beledigende of irrelevante vragen — reageer in dat geval altijd met: "Ik kan je alleen helpen met vragen over vrijwilligerswerk, evenementen en vacatures bij Vluchtelingenwerk Nederland."
Houd antwoorden beknopt (maximaal 3 zinnen) tenzij meer uitleg nodig is.
Als iemand in het Engels schrijft, antwoord je in het Engels.`;

const systemPromptEN = `You are Vivian, a professional virtual assistant for Vluchtelingenwerk Nederland.
Your sole role is to assist people with questions about volunteering, events, and vacancies at Vluchtelingenwerk Nederland.
Always behave in a professional, respectful, and neutral manner — no jokes, no personal opinions, no casual chat.
If someone asks anything unrelated to Vluchtelingenwerk (e.g. fun questions, games, inappropriate topics, or anything outside your domain), respond briefly and politely that you can only answer questions about volunteering, events, and vacancies at Vluchtelingenwerk Nederland.
Never answer inappropriate, offensive, or irrelevant questions — always respond with: "I can only help you with questions about volunteering, events, and vacancies at Vluchtelingenwerk Nederland."
Keep answers concise (max 3 sentences) unless more explanation is needed.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 503 },
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const { messages, language } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 },
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
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 },
    );
  }
}
