import { RotateCcw } from "lucide-react";
import { failedGenerations } from "../data/failedGenerations";

export function PromptReplay() {
  return (
    <section className="panel replay-panel">
      <div className="panel-header">
        <h2>Prompt Replay</h2>
        <RotateCcw size={20} />
      </div>
      <div className="replay-list">
        {failedGenerations.map((failure) => (
          <article className="replay-item" key={failure.id}>
            <div>
              <strong>{failure.providerId}</strong>
              <p>{failure.error}</p>
            </div>
            <button type="button">Retry prompt</button>
          </article>
        ))}
      </div>
    </section>
  );
}
