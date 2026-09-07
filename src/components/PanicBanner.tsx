import { Flame } from "lucide-react";
import { getPanicModeState } from "../lib/panicMode";

export function PanicBanner() {
  const panic = getPanicModeState();

  if (!panic.active) {
    return null;
  }

  return (
    <aside className="panic-banner" role="status">
      <Flame size={20} />
      <span>{panic.message}</span>
    </aside>
  );
}
