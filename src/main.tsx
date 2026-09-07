import React from "react";
import ReactDOM from "react-dom/client";
import { Activity, DollarSign, Gauge, Router } from "lucide-react";
import { ProviderStatus } from "./components/ProviderStatus";
import { providers } from "./data/providers";
import "./styles.css";

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Internal AI Ops</p>
          <h1>SlopShop</h1>
          <p className="lede">
            Route every prompt to the cheapest model that is still answering.
          </p>
        </div>
        <div className="hero-metrics" aria-label="Routing metrics">
          <span>
            <Router size={18} /> 7 providers
          </span>
          <span>
            <Gauge size={18} /> 342ms p50
          </span>
          <span>
            <DollarSign size={18} /> $42.69/day
          </span>
        </div>
      </section>

      <section className="dashboard">
        <div className="panel">
          <div className="panel-header">
            <h2>Provider Moshpit</h2>
            <Activity size={20} />
          </div>
          <div className="provider-list">
            {providers.map((provider) => (
              <ProviderStatus key={provider.id} provider={provider} />
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Fallback Chain</h2>
            <Router size={20} />
          </div>
          <ol className="fallback-chain">
            <li>Claude: expensive but emotionally available</li>
            <li>GPT: probably knows what JSON is</li>
            <li>Gemini: massive context, mysterious vibes</li>
            <li>Brad's MacBook: local llama, fan sounds included</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
