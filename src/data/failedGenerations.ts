export type FailedGeneration = {
  id: string;
  providerId: string;
  prompt: string;
  error: string;
  createdAt: string;
};

export const failedGenerations: FailedGeneration[] = [
  {
    id: "fail_001",
    providerId: "gpt",
    prompt: "Rewrite this React component as YAML but keep the vibes.",
    error: "429: premium thoughts temporarily unavailable",
    createdAt: "2026-05-15T00:17:00.000Z",
  },
  {
    id: "fail_002",
    providerId: "brads-macbook",
    prompt: "Generate a SOC 2 policy for a startup called SlopShop.",
    error: "ECONNREFUSED: Brad closed the lid",
    createdAt: "2026-05-15T01:03:00.000Z",
  },
];
