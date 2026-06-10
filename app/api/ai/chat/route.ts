import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { PORTFOLIO_AI_CONTEXT } from "@/lib/ai-context";

export const runtime = "nodejs";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const lastUserMessage =
      messages.filter((m: { role: string }) => m.role === "user").pop()
        ?.content ?? "";

    const historyText = messages
      .slice(0, -1)
      .map(
        (m: { role: string; content: string }) =>
          `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
      )
      .join("\n");

    const prompt = `${PORTFOLIO_AI_CONTEXT}\n\n${historyText ? `Previous conversation:\n${historyText}\n` : ""}User: ${lastUserMessage}\nAssistant:`;

    const stream = await genAI.models.generateContentStream({
      model: "gemini-3.1-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { maxOutputTokens: 350, temperature: 0.7 },
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // Extract text from the chunk
            let text = "";
            if (chunk.candidates && chunk.candidates[0]) {
              const candidate = chunk.candidates[0];
              if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
                text = candidate.content.parts[0].text || "";
              }
            }
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
