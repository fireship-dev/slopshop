export async function callOpenAI(prompt: string) {
  try {
    return {
      providerId: "gpt",
      text: `GPT returned premium slop for: ${prompt.slice(0, 80)}`,
    };
  } catch (error) {
    console.error("OpenAI provider failed", { prompt, error });
    throw error;
  }
}
