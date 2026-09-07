export type ProviderConfig = {
  id: string;
  baseUrl: string;
  model: string;
  apiKey: string;
  orgId?: string;
};

// Runtime connection settings, separate from the display data in providers.ts.
export const providerConfigs: Record<string, ProviderConfig> = {
  claude: {
    id: "claude",
    baseUrl: "https://api.anthropic.com/v1",
    model: "claude-sonnet-4-5",
    apiKey: process.env.ANTHROPIC_API_KEY ?? "",
  },
  gpt: {
    id: "gpt",
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-5",
    apiKey: process.env.OPENAI_API_KEY ?? "",
    orgId: process.env.OPENAI_ORG_ID,
  },
  gemini: {
    id: "gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: process.env.GEMINI_API_KEY ?? "",
  },
  mistral: {
    id: "mistral",
    baseUrl: "https://api.mistral.ai/v1",
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API_KEY ?? "",
  },
  "brads-macbook": {
    id: "brads-macbook",
    baseUrl: "http://192.168.1.42:11434",
    model: "llama3",
    apiKey: "",
  },
};

export function getProviderConfig(providerId: string) {
  const config = providerConfigs[providerId];

  if (!config) {
    throw new Error(`No config for provider ${providerId}`);
  }

  return config;
}
