"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import {
  Mic,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  MessageSquare,
  Volume2,
  Cpu,
  ChevronRight,
  Plug,
} from "lucide-react";

/* ─── Fade-up animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

/* ─── Feature cards data ─── */
const features = [
  {
    icon: MessageSquare,
    title: "Prompt Engineering",
    description:
      "Auto-generate production-grade system prompts for any role, language, and tone using your backend LLM provider.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Build agents in Hindi, English, Hinglish, Marathi, and Tamil with culturally aware conversational styles.",
  },
  {
    icon: Volume2,
    title: "Real-Time Voice",
    description:
      "Every response is synthesised to natural speech via gTTS. Play, download, and share audio instantly.",
  },
  {
    icon: Zap,
    title: "Flexible Provider Stack",
    description:
      "Use Groq, OpenRouter, OpenAI, or another OpenAI-compatible endpoint behind the same secure backend.",
  },
  {
    icon: Shield,
    title: "Prompt Injection Guard",
    description:
      "Built-in sandboxing wraps user input in safe tags and injects a re-anchoring system message.",
  },
  {
    icon: Cpu,
    title: "FastAPI Backend",
    description:
      "Async Python backend with streaming TTS, health checks, and multi-source API key resolution.",
  },
];

/* ─── Upcoming features data ─── */
const upcomingFeatures = [
  {
    icon: Mic,
    title: "Voice-to-Voice Communication",
    description:
      "Speak naturally with agents in real time, with faster turn-taking from speech input to spoken response.",
  },
  {
    icon: Plug,
    title: "Custom API Ecosystem",
    description:
      "Connect agents to your own tools, workflows, and business systems through secure custom API actions.",
  },
];

/* ─── Preset templates data ─── */
const presets = [
  {
    name: "Restaurant",
    agent: "SpiceHub",
    desc: "Table bookings, menu queries, and order modifications for a mid-tier Indian eatery.",
    lang: "Hinglish",
    tone: "Friendly",
  },
  {
    name: "Medical Clinic",
    agent: "ArogyaCare",
    desc: "Schedule appointments, provide basic health info, and collect patient details.",
    lang: "Hindi",
    tone: "Professional",
  },
  {
    name: "Retail Shop",
    agent: "BazaarBuddy",
    desc: "Help customers find products, check stock, and process simple returns.",
    lang: "English",
    tone: "Casual",
  },
];

export default function Home() {
  return (
    <div className="bg-[#030303] text-white selection:bg-indigo-500/30 selection:text-white">
      {/* ════════════════════════════════════════════════
          SECTION 1 — Hero with Geometric Shapes
         ════════════════════════════════════════════════ */}
      <HeroGeometric
        badge="Voice AI Platform"
        title1="Build Conversational"
        title2="Voice Agents"
      />

      {/* ════════════════════════════════════════════════
          SECTION 2 — Feature Grid
         ════════════════════════════════════════════════ */}
      <section className="relative z-10 py-28 md:py-36">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-semibold tracking-[3px] uppercase text-indigo-400 mb-4"
            >
              Capabilities
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                Everything you need to ship
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                production voice agents
              </span>
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-white/40 max-w-lg mx-auto text-base md:text-lg font-light leading-relaxed"
            >
              From prompt generation to multilingual TTS — an end-to-end
              platform built on open-source tools.
            </motion.p>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] cursor-pointer"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
                  <f.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="text-[15px] font-semibold text-white/90 mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 3 — Preset Templates
         ════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 border-t border-white/[0.04]">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-semibold tracking-[3px] uppercase text-rose-400 mb-4"
            >
              Quick Start
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white/90"
            >
              Ready-made agent templates
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-white/40 max-w-md mx-auto mt-4 text-base font-light"
            >
              One-click presets to get started in seconds.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {presets.map((p, i) => {
              const params = new URLSearchParams({
                name: p.agent,
                role: p.desc,
                lang: p.lang,
                tone: p.tone,
              });
              return (
                <motion.a
                  key={p.name}
                  href={`/builder?${params.toString()}`}
                  custom={i}
                  variants={fadeUp}
                  className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:border-indigo-500/30 hover:bg-white/[0.04] cursor-pointer block"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white/90">
                      {p.name}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed mb-5 font-light">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                      {p.agent}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/50">
                      {p.lang}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/50">
                      {p.tone}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 4 — Upcoming Features
         ════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 border-t border-white/[0.04]">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-semibold tracking-[3px] uppercase text-emerald-400 mb-4"
            >
              Upcoming Features
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white/90"
            >
              More natural conversations are next
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-white/40 max-w-xl mx-auto mt-4 text-base font-light"
            >
              The roadmap is focused on richer voice loops and safer integrations for real-world agent deployments.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {upcomingFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-300 hover:border-emerald-400/25 hover:bg-white/[0.04]"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <feature.icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 5 — Aurora CTA
         ════════════════════════════════════════════════ */}
      <AuroraBackground className="!h-auto py-32 md:py-40 !bg-[#030303]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        >
          <p className="text-xs font-semibold tracking-[3px] uppercase text-indigo-400 mb-5">
            Get Started
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold dark:text-white mb-6 tracking-tight max-w-3xl leading-tight">
            Start building your voice agent{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
              in minutes
            </span>
          </h2>
          <p className="text-base md:text-lg dark:text-neutral-400 max-w-xl mb-10 font-light leading-relaxed">
            Clone the repo, set your backend LLM provider key, and launch both servers with
            a single command. No credit card required.
          </p>

          {/* Terminal-style code block */}
          <div className="rounded-xl border border-white/[0.08] bg-black/40 backdrop-blur-sm p-5 mb-8 w-full max-w-lg text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <code className="text-sm text-white/70 font-mono leading-relaxed">
              <span className="text-emerald-400">$</span> python
              run_project.py
              <br />
              <span className="text-white/30">
                # Backend on :8000 · Frontend on :8501
              </span>
            </code>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/builder"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3.5 text-sm font-semibold transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
            >
              Text to Voice Chat
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] text-white/80 px-8 py-3.5 text-sm font-medium transition-all hover:bg-white/[0.08] hover:border-white/[0.2] cursor-pointer"
            >
              API Docs
            </a>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* ════════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/[0.04] py-10">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center">
              <Mic className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-white/70 tracking-tight">
              VoiceAI
            </span>
          </div>
          <p className="text-xs text-white/25 font-light">
            Open-source voice agent platform. Built with provider-flexible LLM chat, gTTS, FastAPI &amp; Next.js.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="http://localhost:8000/docs"
              className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
            >
              API
            </a>
            <a
              href="/builder"
              className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
            >
              Builder
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
