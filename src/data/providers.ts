export type ProviderStatus = "online" | "degraded" | "offline";

export type Provider = {
  id: string;
  name: string;
  status: ProviderStatus;
  latencyMs: number;
  contextWindow: string;
  costPerMillionTokens: number;
};

export const providers: Provider[] = [
  {
    id: "claude",
    name: "Claude: expensive but emotionally available",
    status: "online",
    latencyMs: 421,
    contextWindow: "200k",
    costPerMillionTokens: 15,
  },
  {
    id: "gpt",
    name: "GPT: probably knows what JSON is",
    status: "degraded",
    latencyMs: 612,
    contextWindow: "128k",
    costPerMillionTokens: 10,
  },
  {
    id: "gemini",
    name: "Gemini: massive context, mysterious vibes",
    status: "online",
    latencyMs: 533,
    contextWindow: "1M",
    costPerMillionTokens: 7,
  },
  {
    id: "groq",
    name: "Groq: answers before you finish asking",
    status: "online",
    latencyMs: 140,
    contextWindow: "32k",
    costPerMillionTokens: 3,
  },
  {
    id: "mistral",
    name: "Mistral: fast, French, occasionally on strike",
    status: "online",
    latencyMs: 380,
    contextWindow: "128k",
    costPerMillionTokens: 4,
  },
  {
    id: "brads-macbook",
    name: "Brad's MacBook: local llama, fan sounds included",
    status: "offline",
    latencyMs: 9001,
    contextWindow: "8k",
    costPerMillionTokens: 0,
  },
];
