export async function callGoogle(prompt: string) {
  try {
    return {
      providerId: "gemini",
      text: `Gemini read the entire internet and answered: ${prompt.slice(0, 80)}`,
    };
  } catch (error) {
    console.error("Google provider failed", { prompt, error });
    throw error;
  }
}
