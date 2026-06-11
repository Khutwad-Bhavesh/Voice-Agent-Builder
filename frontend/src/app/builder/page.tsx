"use client";

import { useState } from "react";
import { AgentBuilder } from "@/components/AgentBuilder";
import { ChatInterface } from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";

export default function BuilderPage() {
  const [agentReady, setAgentReady] = useState(false);
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    language: "Hinglish",
    tone: "Professional",
  });
  const [systemPrompt, setSystemPrompt] = useState("");

  return (
    <main className="min-h-screen bg-[#030303] text-white flex flex-col items-center py-10 px-4 sm:px-6 md:py-20 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2 mb-4 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90">
            Voice AI Agent Builder
          </h1>
          <p className="text-white/40 text-sm md:text-base font-light">
            Configure your agent, generate the prompt, and test it in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 w-full">
            <AgentBuilder
              onAgentReady={(config, prompt) => {
                setAgentConfig(config);
                setSystemPrompt(prompt);
                setAgentReady(true);
              }}
            />
          </div>

          {/* Right Column: Chat Interface or Empty State */}
          <div className="lg:col-span-7 w-full h-[600px] flex flex-col">
            {agentReady ? (
              <ChatInterface
                agentConfig={agentConfig}
                systemPrompt={systemPrompt}
              />
            ) : (
              <Card className="flex-1 flex flex-col items-center justify-center bg-white/[0.02] border-white/[0.06] backdrop-blur-sm text-center p-8">
                <div className="h-16 w-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-indigo-400"
                  >
                    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="9" y1="22" x2="15" y2="22" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white/80 mb-2">
                  No Agent Configured
                </h3>
                <p className="text-sm text-white/40 max-w-sm font-light">
                  Fill out the form to generate a system prompt with your backend LLM provider and
                  start testing your voice agent.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
