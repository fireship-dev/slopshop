import type { Provider } from "../data/providers";

type ProviderStatusProps = {
  provider: Provider;
};

export function ProviderStatus({ provider }: ProviderStatusProps) {
  return (
    <article className="provider-row">
      <div>
        <div className="provider-name">{provider.name}</div>
        <div className="provider-meta">
          {provider.latencyMs}ms p50 · {provider.contextWindow} context
        </div>
      </div>
      <span className={`status-pill ${provider.status}`}>{provider.status}</span>
      <span className="cost">${provider.costPerMillionTokens}/M tokens</span>
      <span className="fallback-rank">
        fallback #{provider.costPerMillionTokens === 0 ? "panic" : provider.costPerMillionTokens}
      </span>
    </article>
  );
}
