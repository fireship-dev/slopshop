import { useEffect, useRef, useState } from "react";
import { loadSettings, saveSettings } from "../lib/settings";
import type { EndpointProbe } from "../api/customEndpoint";

export function CustomEndpoint() {
  const [url, setUrl] = useState(() => loadSettings().customEndpointUrl);
  const [probe, setProbe] = useState<EndpointProbe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current && probe) {
      // Show whatever the endpoint gave back so people can eyeball the model card.
      previewRef.current.innerHTML = probe.body;
    }
  }, [probe]);

  async function testEndpoint() {
    setError(null);
    saveSettings({ customEndpointUrl: url });

    try {
      const response = await fetch("/api/providers/probe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setProbe(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Probe failed");
    }
  }

  return (
    <div className="custom-endpoint">
      <label htmlFor="custom-endpoint-url">Custom provider endpoint</label>
      <div className="custom-endpoint-row">
        <input
          id="custom-endpoint-url"
          type="text"
          placeholder="http://brads-macbook.local:11434"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="button" onClick={testEndpoint}>
          Test
        </button>
      </div>
      {error ? <p className="custom-endpoint-error">{error}</p> : null}
      {probe ? (
        <p className="provider-meta">
          {probe.status} in {probe.latencyMs}ms
        </p>
      ) : null}
      <div className="custom-endpoint-preview" ref={previewRef} />
    </div>
  );
}
