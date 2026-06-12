"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Wand2 } from "lucide-react";

interface AgentConfig {
  name: string;
  language: string;
  tone: string;
}

interface AgentBuilderProps {
  initialName?: string;
  initialRole?: string;
  initialLang?: string;
  initialTone?: string;
  onAgentReady: (config: AgentConfig, systemPrompt: string) => void;
}

const LANGUAGES = ["Hinglish", "Hindi", "English", "Marathi", "Tamil"];
const TONES = ["Professional", "Friendly", "Casual"];

export function AgentBuilder({ initialName, initialRole, initialLang, initialTone, onAgentReady }: AgentBuilderProps) {
  const [name, setName] = useState(initialName || "");
  const [role, setRole] = useState(initialRole || "");
  const [language, setLanguage] = useState(initialLang || "Hinglish");
  const [tone, setTone] = useState(initialTone || "Professional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim()) {
      setError("Name and Role are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          language,
          tone,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `Backend error: ${res.status}`);
      }

      const data = await res.json();
      onAgentReady({ name, language, tone }, data.system_prompt);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to connect to backend on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/[0.02] border-white/[0.06] backdrop-blur-sm p-6 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white/90 flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-indigo-400" />
          Configuration
        </h2>
        <p className="text-sm text-white/40 mt-1 font-light">
          Define the agent&apos;s persona and let the LLM engineer the perfect prompt.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-5">
        <div className="space-y-2">
          <Label className="text-white/70 text-xs uppercase tracking-wider">
            Agent Name
          </Label>
          <Input
            placeholder="e.g. Bharat Support"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black/20 border-white/[0.08] focus-visible:ring-indigo-500/50 text-white placeholder:text-white/20"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/70 text-xs uppercase tracking-wider">
            Role / Purpose
          </Label>
          <Textarea
            placeholder="Describe what this agent does, who it serves, and the tasks it handles."
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-black/20 border-white/[0.08] focus-visible:ring-indigo-500/50 text-white placeholder:text-white/20 min-h-[100px] resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white/70 text-xs uppercase tracking-wider">
              Language
            </Label>
            <Select value={language} onValueChange={(val) => setLanguage(val || "Hinglish")}>
              <SelectTrigger className="bg-black/20 border-white/[0.08] focus:ring-indigo-500/50 text-white">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f13] border-white/[0.08] text-white">
                {LANGUAGES.map((l) => (
                  <SelectItem key={l} value={l} className="focus:bg-white/10">
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-xs uppercase tracking-wider">
              Tone
            </Label>
            <Select value={tone} onValueChange={(val) => setTone(val || "Professional")}>
              <SelectTrigger className="bg-black/20 border-white/[0.08] focus:ring-indigo-500/50 text-white">
                <SelectValue placeholder="Select Tone" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f13] border-white/[0.08] text-white">
                {TONES.map((t) => (
                  <SelectItem key={t} value={t} className="focus:bg-white/10">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-rose-500/10 border border-rose-500/20 p-3">
            <p className="text-sm text-rose-400 font-medium">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Prompt...
            </>
          ) : (
            "Generate Agent"
          )}
        </Button>
      </form>
    </Card>
  );
}
