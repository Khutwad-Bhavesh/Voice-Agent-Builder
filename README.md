# Voice AI Agent Builder

A FastAPI and Next.js app for creating Indian-market voice AI agents with provider-flexible LLM chat and gTTS.

## Features

- Agent form for name, role, target language, and tone
- System prompt generation using Groq, OpenRouter, OpenAI, or another OpenAI-compatible chat provider
- Immediate chat with the generated agent
- Agent replies follow the selected role, tone, and language
- gTTS voice output button for every assistant response
- Sidebar with live agent details

## Setup & Running

This project runs with a FastAPI backend (`main.py`) on port 8000 and a Next.js frontend in `frontend/` on port 3000.

### 1. Install Dependencies
Create a virtual environment and install the updated requirements:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Start the Backend API (FastAPI)
Run the Uvicorn server in a separate terminal:

```bash
venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`. You can test the endpoints directly or browse the auto-generated documentation at `http://localhost:8000/docs`.

### 3. Start the Frontend UI
Run Next.js in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## LLM Provider Keys

Keep API keys on the backend only. The frontend does not expose a key input.

### Groq

```bash
export LLM_PROVIDER=groq
export GROQ_API_KEY="your_groq_api_key"
```

Groq defaults to `llama-3.3-70b-versatile`.

### OpenRouter

```bash
export LLM_PROVIDER=openrouter
export OPENROUTER_API_KEY="your_openrouter_api_key"
export LLM_MODEL="openai/gpt-5.2"
export OPENROUTER_SITE_URL="http://localhost:3000"
export OPENROUTER_APP_NAME="Voice AI Agent Builder"
```

`LLM_MODEL` is optional for OpenRouter if your OpenRouter account has a default model configured.

### Other OpenAI-Compatible Providers

Use this for providers that expose a `/chat/completions` endpoint:

```bash
export LLM_PROVIDER=custom
export LLM_API_KEY="your_provider_api_key"
export LLM_BASE_URL="https://provider.example.com/v1"
export LLM_MODEL="provider-model-name"
```

Optional model overrides:

```bash
export LLM_PROMPT_MODEL="model-for-prompt-generation"
export LLM_CHAT_MODEL="model-for-agent-chat"
```

## Security Demo

A security demonstration script is provided to show prompt injection and DoS protections in action. Ensure the backend is running (`uvicorn main:app --host 0.0.0.0 --port 8000`), export your provider API key in your terminal, and run:

```bash
venv/bin/python demo_security.py
```
# Voice-Agent-Builder
# Voice-Agent-Builder
