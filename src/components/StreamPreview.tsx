import { useState } from "react";

// TODO: wire this to /api/generate/stream once the handler exists
export function StreamPreview() {
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);

  async function start() {
    setStreaming(true);
    setOutput("");

    // placeholder until the SSE endpoint is up
    for (const word of "streaming is coming soon to a dashboard near you".split(" ")) {
      await new Promise((resolve) => setTimeout(resolve, 80));
      setOutput((current) => `${current}${word} `);
    }

    setStreaming(false);
  }

  return (
    <div className="stream-preview">
      <button type="button" onClick={start} disabled={streaming}>
        {streaming ? "Streaming..." : "Stream a test prompt"}
      </button>
      <pre>{output}</pre>
    </div>
  );
}
