"use client";

import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Volume2, Loader2, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AgentConfig {
  name: string;
  language: string;
  tone: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  agentConfig: AgentConfig;
  systemPrompt: string;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export function ChatInterface({ agentConfig, systemPrompt, messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Audio state mapping message index -> audio blob URL
  const [audioCache, setAudioCache] = useState<{ [key: number]: string }>({});
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log("ChatInterface mounted");
    return () => console.log("ChatInterface unmounted");
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.closest('[data-slot="scroll-area-viewport"]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_prompt: systemPrompt,
            messages: messages,
            user_message: userMessage.content,
          }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "⚠️ Error connecting to backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = async (index: number, content: string) => {
    if (audioCache[index]) {
      playUrl(audioCache[index], index);
      return;
    }

    setPlayingId(index);
    try {
      const res = await fetch("http://localhost:8000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: content,
          language: agentConfig.language,
        }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioCache((prev) => ({ ...prev, [index]: url }));
      playUrl(url, index);
    } catch (err) {
      console.error(err);
      setPlayingId(null);
    }
  };

  const playUrl = (url: string, index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(url);
    audio.playbackRate = 1.35;
    audioRef.current = audio;
    audio.play();
    setPlayingId(index);

    audio.onended = () => {
      setPlayingId(null);
    };
  };

  return (
    <Card className="flex flex-col h-full bg-white/[0.02] border-white/[0.06] backdrop-blur-sm shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-white/[0.06] bg-black/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold uppercase">
            {agentConfig.name.substring(0, 2)}
          </div>
          <div>
            <h3 className="text-white/90 font-semibold">{agentConfig.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-white/50 font-light">Online</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-3 sm:mt-0">
          <Badge variant="outline" className="bg-white/[0.03] border-white/[0.08] text-white/60">
            {agentConfig.language}
          </Badge>
          <Badge variant="outline" className="bg-white/[0.03] border-white/[0.08] text-white/60">
            {agentConfig.tone}
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 min-h-0 p-4">
        <div className="space-y-6" ref={scrollRef}>
          {/* Welcome / System Info */}
          <div className="text-center my-4">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
              System Prompt Generated
            </span>
            <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/[0.04] text-left">
              <p
                className={cn(
                  "text-xs text-white/40 font-mono leading-relaxed",
                  !promptExpanded && "line-clamp-3"
                )}
              >
                {systemPrompt}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setPromptExpanded((current) => !current)}
                className="mt-3 h-8 px-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-white/60"
              >
                {promptExpanded ? "Hide Prompt" : "Show Prompt"}
              </Button>
            </div>
          </div>

          {messages.map((msg: ChatMessage, idx: number) => (
            <div
              key={idx}
              className={cn(
                "flex w-full",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-white/[0.05] border border-white/[0.06] text-white/90 rounded-bl-sm"
                )}
              >
                <p>{msg.content}</p>

                {/* TTS Audio Controls for Assistant Messages */}
                {msg.role === "assistant" && (
                  <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlayAudio(idx, msg.content)}
                      disabled={playingId === idx}
                      className="h-8 px-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-white/70"
                    >
                      {playingId === idx ? (
                        <Volume2 className="h-4 w-4 mr-1.5 animate-pulse text-emerald-400" />
                      ) : (
                        <Play className="h-4 w-4 mr-1.5" />
                      )}
                      {playingId === idx ? "Playing..." : "Play Audio"}
                    </Button>

                    {audioCache[idx] && (
                      <a
                        href={audioCache[idx]}
                        download={`voice-${idx}.mp3`}
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Download
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl px-5 py-4 bg-white/[0.05] border border-white/[0.06] rounded-bl-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-white/40 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-white/[0.06] bg-black/20">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 bg-black/30 border-white/[0.08] focus-visible:ring-indigo-500/50 text-white placeholder:text-white/30 rounded-full px-4"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full h-10 w-10 p-0 bg-indigo-500 hover:bg-indigo-600 text-white shrink-0"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 ml-0.5" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}
