"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

type ChatStep =
  | "greeting"
  | "ask_name"
  | "ask_knowledge"
  | "show_info"
  | "ask_time"
  | "ask_expertise"
  | "open_chat";

type MessageRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  isVideo?: boolean;
  videoUrl?: string;
  videoTitle?: string;
  suggestions?: string[];
  isCard?: boolean;
  cardTitle?: string;
  cardDescription?: string;
  cardLink?: string;
  cardType?: "event" | "job";
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState<ChatStep>("greeting");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState<string | null>(null);
  const [hasInit, setHasInit] = useState(false);
  const [locationShown, setLocationShown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-vivian", handler);
    return () => window.removeEventListener("open-vivian", handler);
  }, []);

  // Show location message whenever it resolves and the chat is open
  useEffect(() => {
    if (location && isOpen && hasInit && !locationShown) {
      setLocationShown(true);
      setMessages((prev) => [
        {
          id: generateId(),
          role: "assistant",
          content: `${t.chat.locationText} **${location}**`,
        },
        ...prev,
      ]);
    }
  }, [location, isOpen, hasInit]); // eslint-disable-line react-hooks/exhaustive-deps

  // Detect user location
  useEffect(() => {
    if (typeof window === "undefined") return;

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city) {
          setLocation(data.city);
        }
      })
      .catch(() => {
        // Location detection failed silently
      });
  }, []);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && !hasInit) {
      setHasInit(true);
      setLocationShown(false);
      initChat();
    }
  }, [isOpen, hasInit]); // eslint-disable-line react-hooks/exhaustive-deps

  const addMessage = useCallback((msg: Omit<ChatMessage, "id">, delay = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { ...msg, id: generateId() }]);
        resolve();
      }, delay);
    });
  }, []);

  const simulateTyping = useCallback(
    async (action: () => void, delay = 800) => {
      setIsTyping(true);
      await new Promise((r) => setTimeout(r, delay));
      setIsTyping(false);
      action();
    },
    [],
  );

  const initChat = useCallback(async () => {
    // Greeting
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsTyping(false);
    await addMessage({ role: "assistant", content: t.chat.greeting });

    // Ask name
    await new Promise((r) => setTimeout(r, 600));
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsTyping(false);
    await addMessage({ role: "assistant", content: t.chat.askName });
    setStep("ask_name");
  }, [location, t, addMessage]);

  // Re-init when language changes if chat is open
  useEffect(() => {
    if (isOpen && hasInit) {
      setMessages([]);
      setStep("greeting");
      setUserName("");
      setHasInit(false);
    }
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuggestion = useCallback(
    async (suggestion: string) => {
      await addMessage({ role: "user", content: suggestion });
      await processUserInput(suggestion, true);
    },
    [step, userName, t, language], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    await addMessage({ role: "user", content: text });
    await processUserInput(text, false);
  }, [input, step, userName, t]); // eslint-disable-line react-hooks/exhaustive-deps

  const processUserInput = useCallback(
    async (text: string, isSuggestion: boolean) => {
      if (step === "ask_name") {
        const name = text.trim() || "vriend";
        setUserName(name);

        await simulateTyping(async () => {
          addMessage({
            role: "assistant",
            content: t.chat.nameResponse(name),
          });
        });

        await new Promise((r) => setTimeout(r, 700));
        await simulateTyping(async () => {
          addMessage({
            role: "assistant",
            content: t.chat.askKnowledge,
            suggestions: [t.chat.optionYes, t.chat.optionNo],
          });
        });
        setStep("ask_knowledge");
      } else if (step === "ask_knowledge") {
        const isYes = isSuggestion
          ? text === t.chat.optionYes
          : text.toLowerCase().startsWith("j") ||
            text.toLowerCase().startsWith("y");

        if (isYes) {
          await simulateTyping(() => {
            addMessage({
              role: "assistant",
              content: t.chat.knowledgeYesResponse,
            });
          });
          await new Promise((r) => setTimeout(r, 600));
          await simulateTyping(() => {
            addMessage({
              role: "assistant",
              content: t.chat.askTime,
              suggestions: [t.chat.time1, t.chat.time2, t.chat.time3],
            });
          });
          setStep("ask_time");
        } else {
          await simulateTyping(() => {
            addMessage({
              role: "assistant",
              content: t.chat.knowledgeNoResponse,
            });
          });
          await new Promise((r) => setTimeout(r, 600));
          await simulateTyping(() => {
            addMessage({
              role: "assistant",
              content: t.chat.knowledgeInfo,
              isVideo: true,
              videoUrl: t.chat.videoUrl,
              videoTitle: t.chat.videoTitle,
            });
          });
          await new Promise((r) => setTimeout(r, 700));
          await simulateTyping(() => {
            addMessage({
              role: "assistant",
              content: t.chat.afterVideo,
            });
          });
          await new Promise((r) => setTimeout(r, 600));
          await simulateTyping(() => {
            addMessage({
              role: "assistant",
              content: t.chat.askTime,
              suggestions: [t.chat.time1, t.chat.time2, t.chat.time3],
            });
          });
          setStep("ask_time");
        }
      } else if (step === "ask_time") {
        await simulateTyping(() => {
          addMessage({
            role: "assistant",
            content: t.chat.timeResponse(text),
          });
        });
        await new Promise((r) => setTimeout(r, 700));
        await simulateTyping(() => {
          addMessage({
            role: "assistant",
            content: t.chat.askExpertise,
            suggestions: [
              t.chat.expertise1,
              t.chat.expertise2,
              t.chat.expertise3,
              t.chat.expertise4,
            ],
          });
        });
        setStep("ask_expertise");
      } else if (step === "ask_expertise") {
        await simulateTyping(() => {
          addMessage({
            role: "assistant",
            content: t.chat.expertiseResponse(text),
          });
        });
        await new Promise((r) => setTimeout(r, 600));

        // Map expertise to a relevant event or job card
        const isComm =
          text === t.chat.expertise1 ||
          text.toLowerCase().includes("comm") ||
          text.toLowerCase().includes("media");
        const isLegal =
          text === t.chat.expertise2 ||
          text.toLowerCase().includes("jur") ||
          text.toLowerCase().includes("recht") ||
          text.toLowerCase().includes("law") ||
          text.toLowerCase().includes("legal");
        const isSport =
          text === t.chat.expertise3 ||
          text.toLowerCase().includes("sport") ||
          text.toLowerCase().includes("activ");

        // Candidates per expertise: [{location, title, description, link, type}]
        type CardCandidate = {
          location: string;
          title: string;
          description: string;
          link: string;
          type: "job" | "event";
        };

        const candidates: CardCandidate[] = isComm
          ? [
              {
                location: language === "nl" ? "Den Haag" : "The Hague",
                title:
                  language === "nl"
                    ? "Communicatiemedewerker"
                    : "Communications Officer",
                description:
                  language === "nl"
                    ? "24 uur/week · Den Haag · Communicatie"
                    : "24 hrs/week · The Hague · Communications",
                link: "/vacatures",
                type: "job",
              },
              {
                location: "Amsterdam",
                title:
                  language === "nl"
                    ? "Coördinator Vrijwilligers"
                    : "Volunteer Coordinator",
                description:
                  language === "nl"
                    ? "32 uur/week · Amsterdam · Vrijwilligerswerk"
                    : "32 hrs/week · Amsterdam · Volunteering",
                link: "/vacatures",
                type: "job",
              },
            ]
          : isLegal
            ? [
                {
                  location: "Rotterdam",
                  title:
                    language === "nl"
                      ? "Juridisch Medewerker"
                      : "Legal Officer",
                  description:
                    language === "nl"
                      ? "40 uur/week · Rotterdam · Juridische Begeleiding"
                      : "40 hrs/week · Rotterdam · Legal Support",
                  link: "/vacatures",
                  type: "job",
                },
                {
                  location: "Amsterdam",
                  title:
                    language === "nl"
                      ? "Introductiedag Vrijwilligers"
                      : "Introduction Day Volunteers",
                  description:
                    language === "nl"
                      ? "15 maart 2026 · Amsterdam · Training"
                      : "March 15, 2026 · Amsterdam · Training",
                  link: "/evenementen",
                  type: "event",
                },
              ]
            : isSport
              ? [
                  {
                    location: "Utrecht",
                    title:
                      language === "nl"
                        ? "Sportdag voor Vluchtelingen"
                        : "Sports Day for Refugees",
                    description:
                      language === "nl"
                        ? "5 april 2026 · Utrecht · Activiteit"
                        : "April 5, 2026 · Utrecht · Activity",
                    link: "/evenementen",
                    type: "event",
                  },
                  {
                    location: "Amsterdam",
                    title:
                      language === "nl"
                        ? "Introductiedag Vrijwilligers"
                        : "Introduction Day Volunteers",
                    description:
                      language === "nl"
                        ? "15 maart 2026 · Amsterdam · Training"
                        : "March 15, 2026 · Amsterdam · Training",
                    link: "/evenementen",
                    type: "event",
                  },
                ]
              : [
                  {
                    location: language === "nl" ? "Den Haag" : "The Hague",
                    title:
                      language === "nl"
                        ? "Training Taalbuddy"
                        : "Language Buddy Training",
                    description:
                      language === "nl"
                        ? "12 april 2026 · Den Haag · Training"
                        : "April 12, 2026 · The Hague · Training",
                    link: "/evenementen",
                    type: "event",
                  },
                  {
                    location: "Amsterdam",
                    title:
                      language === "nl"
                        ? "Introductiedag Vrijwilligers"
                        : "Introduction Day Volunteers",
                    description:
                      language === "nl"
                        ? "15 maart 2026 · Amsterdam · Training"
                        : "March 15, 2026 · Amsterdam · Training",
                    link: "/evenementen",
                    type: "event",
                  },
                ];

        // Pick the candidate whose location best matches the detected city
        const userCity = location?.toLowerCase() ?? "";
        const best =
          candidates.find(
            (c) => userCity && c.location.toLowerCase().includes(userCity),
          ) ?? candidates[0];

        const suggestLabel =
          best.type === "event"
            ? t.chat.expertiseSuggestEvent
            : t.chat.expertiseSuggestJob;

        await simulateTyping(() => {
          addMessage({ role: "assistant", content: suggestLabel });
        });
        await new Promise((r) => setTimeout(r, 400));
        addMessage({
          role: "assistant",
          content: "",
          isCard: true,
          cardType: best.type,
          cardTitle: best.title,
          cardDescription: best.description,
          cardLink: best.link,
        });

        await new Promise((r) => setTimeout(r, 800));
        await simulateTyping(() => {
          addMessage({ role: "assistant", content: t.chat.finalMessage });
        });
        setStep("open_chat");
      } else if (step === "open_chat") {
        // Use OpenAI for open-ended chat
        setIsTyping(true);
        try {
          const conversationMessages = messages
            .filter((m) => !m.isVideo)
            .map((m) => ({
              role: m.role as "assistant" | "user",
              content: m.content,
            }));
          conversationMessages.push({ role: "user", content: text });

          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: conversationMessages,
              language,
            }),
          });

          const data = await res.json();
          setIsTyping(false);

          if (data.message) {
            addMessage({ role: "assistant", content: data.message });
          } else {
            addMessage({
              role: "assistant",
              content: t.chat.errorMessage,
            });
          }
        } catch {
          setIsTyping(false);
          addMessage({ role: "assistant", content: t.chat.errorMessage });
        }
      }
    },
    [step, messages, t, language, addMessage, simulateTyping, userName],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setStep("greeting");
    setUserName("");
    setHasInit(false);
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full text-white font-bold text-base shadow-2xl transition-all duration-200 hover:scale-105 focus:outline-none cursor-pointer"
          style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
          aria-label={t.chat.open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span className="hidden sm:inline">{t.chat.title}</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-full sm:w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          role="dialog"
          aria-label={t.chat.title}
          aria-modal="true"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 text-white"
            style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/vivian.png"
                  alt="Vivian"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">
                  {t.chat.title}
                </h2>
                <p className="text-white/80 text-sm leading-tight">
                  {t.chat.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetChat}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                aria-label="Herstart gesprek"
                title="Herstart gesprek"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                aria-label={t.chat.close}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50"
            aria-live="polite"
            aria-label="Chatberichten"
          >
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onSuggestion={handleSuggestion}
              />
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 chat-message">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                  aria-hidden="true"
                >
                  <Image
                    src="/vivian.png"
                    alt="Vivian"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-xs">
                  <div
                    className="flex gap-1.5 items-center"
                    aria-label={t.chat.thinking}
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "rgb(248 79 55 / 90%)",
                        animationDelay: "0ms",
                      }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "rgb(248 79 55 / 90%)",
                        animationDelay: "150ms",
                      }}
                    />
                    <span
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "rgb(248 79 55 / 90%)",
                        animationDelay: "300ms",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <label htmlFor="chat-input" className="sr-only">
                {t.chat.inputPlaceholder}
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.inputPlaceholder}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-base focus:outline-none focus:border-orange-400 bg-gray-50"
                style={{ fontSize: "1rem" }}
                disabled={isTyping}
                aria-disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="px-4 py-3 rounded-xl text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none cursor-pointer"
                style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
                aria-label={t.chat.send}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              {t.chat.poweredBy}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function MessageBubble({
  message,
  onSuggestion,
}: {
  message: ChatMessage;
  onSuggestion: (s: string) => void;
}) {
  const isAssistant = message.role === "assistant";

  // Parse bold text
  const renderContent = (content: string) => {
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-bold">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };

  return (
    <div
      className={`flex chat-message ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div
          className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2 self-end"
          aria-hidden="true"
        >
          <Image
            src="/vivian.png"
            alt="Vivian"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className={`flex flex-col gap-2 max-w-[85%] ${isAssistant ? "" : "items-end"}`}
      >
        {message.content && (
          <div
            className={`px-4 py-3 rounded-2xl text-base leading-relaxed ${
              isAssistant
                ? "bg-white text-gray-900 rounded-tl-sm shadow-sm"
                : "text-white rounded-tr-sm"
            }`}
            style={
              !isAssistant
                ? { backgroundColor: "rgb(248 79 55 / 90%)" }
                : undefined
            }
          >
            {renderContent(message.content)}
          </div>
        )}

        {/* Video embed */}
        {message.isVideo && message.videoUrl && (
          <div className="w-full rounded-xl overflow-hidden shadow-md">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={message.videoUrl}
                title={message.videoTitle ?? "Video"}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        )}

        {/* Suggestion card (event or job) */}
        {message.isCard && message.cardTitle && (
          <a
            href={message.cardLink ?? "#"}
            className="block rounded-xl overflow-hidden border-2 shadow-sm hover:shadow-md transition-shadow duration-200 no-underline"
            style={{ borderColor: "rgb(248 79 55 / 90%)" }}
          >
            <div
              className="px-3 py-1.5 text-white text-xs font-bold uppercase tracking-wide"
              style={{ backgroundColor: "rgb(248 79 55 / 90%)" }}
            >
              {message.cardType === "event" ? "📅 Evenement" : "💼 Vacature"}
            </div>
            <div className="px-4 py-3 bg-white">
              <p className="font-bold text-gray-900 text-base leading-snug">
                {message.cardTitle}
              </p>
              {message.cardDescription && (
                <p className="text-gray-500 text-sm mt-1">
                  {message.cardDescription}
                </p>
              )}
              <p
                className="text-sm font-semibold mt-2"
                style={{ color: "rgb(248 79 55 / 90%)" }}
              >
                Bekijk →
              </p>
            </div>
          </a>
        )}

        {/* Suggestion buttons */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => onSuggestion(s)}
                className="px-4 py-2 rounded-full border-2 text-base font-semibold transition-all duration-200 hover:text-white focus:outline-none cursor-pointer"
                style={{
                  borderColor: "rgb(248 79 55 / 90%)",
                  color: "rgb(248 79 55 / 90%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgb(248 79 55 / 90%)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "rgb(248 79 55 / 90%)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
