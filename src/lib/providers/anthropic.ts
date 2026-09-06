export async function callAnthropic(prompt: string) {
  try {
    return {
      providerId: "claude",
      text: `Claude gently considered your prompt: ${prompt.slice(0, 80)}`,
    };
  } catch (error) {
    console.error("Anthropic provider failed", { prompt, error });
    throw error;
  }
}
