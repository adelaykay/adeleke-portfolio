"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_CHIPS = [
  "What is Adeleke's tech stack?",
  "Tell me about BizDocx",
  "Is Adeleke available for hire?",
  "What's the Boredom app?",
];

export function AIChatGuide() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there 👋 I'm Adeleke's AI portfolio guide. Ask me anything about his projects, skills, or experience building AI-powered products.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = text ?? input.trim();
    if (!content || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiContent = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        aiContent += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: aiContent },
        ]);
      }

      // Flush any remaining bytes from the decoder
      aiContent += decoder.decode();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: aiContent },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I ran into an issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          }}
        >
          ✦
        </div>
        <div className="flex-1">
          <div
            className="text-sm font-semibold font-display"
            style={{ color: "var(--text)" }}
          >
            Adeleke&apos;s AI Guide
          </div>
          <div className="text-xs" style={{ color: "var(--text3)" }}>
            Ask about projects, skills, availability
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ background: "var(--live)" }}
          />
          <span className="text-xs" style={{ color: "var(--live)" }}>
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex flex-col gap-3 p-4 overflow-y-auto"
        style={{ minHeight: "200px", maxHeight: "320px" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] text-sm leading-relaxed px-3 py-2.5 rounded-xl ${
              m.role === "user" ? "self-end" : "self-start"
            }`}
            style={
              m.role === "user"
                ? { background: "var(--accent)", color: "#fff", borderRadius: "12px 12px 0 12px" }
                : {
                    background: "var(--bg3)",
                    border: "1px solid var(--border)",
                    color: "var(--text)",
                    borderRadius: "0 12px 12px 12px",
                  }
            }
          >
            {m.content || (
              <span style={{ color: "var(--text3)" }}>Thinking…</span>
            )}
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div
            className="self-start text-sm px-3 py-2.5 rounded-xl"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              color: "var(--text3)",
              borderRadius: "0 12px 12px 12px",
            }}
          >
            <span className="animate-pulse">Thinking…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick chips */}
      <div
        className="flex flex-wrap gap-2 px-4 pb-3"
      >
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => send(chip)}
            disabled={loading}
            className="text-[11px] px-3 py-1 rounded-full border transition-colors disabled:opacity-40"
            style={{
              background: "var(--bg3)",
              borderColor: "var(--border)",
              color: "var(--text2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text2)";
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="flex border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <input
          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
          style={{ color: "var(--text)" }}
          placeholder="Ask about Adeleke's work…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />
        <button
          onClick={() => send()}
          disabled={loading || !input.trim()}
          className="px-4 text-white text-base transition-opacity disabled:opacity-30"
          style={{ background: "var(--accent)" }}
        >
          →
        </button>
      </div>
    </div>
  );
}
