import { cn } from "@/lib/utils";
import type { StageDef } from "./stages";

type NodeState = "done" | "running" | "pending";

export type SpineFlags = {
  /** stage numbers (1-indexed) where the firewall caught an injection attempt */
  injectionStages: Set<number>;
  /** stage numbers where an auto-rollback occurred */
  rollbackStages: Set<number>;
  /** stage numbers currently blocked awaiting human approval */
  awaitingStages: Set<number>;
};

const BANDS: Array<{ label: string; range: [number, number] }> = [
  { label: "Input", range: [1, 1] },
  { label: "Research", range: [2, 3] },
  { label: "Idea & Formulation", range: [4, 9] },
  { label: "Execution", range: [10, 13] },
  { label: "Output", range: [14, 17] },
];

function stateFor(index1: number, currentStage: number): NodeState {
  if (index1 < currentStage) return "done";
  if (index1 === currentStage) return "running";
  return "pending";
}

export function Spine({
  stages,
  currentStage,
  flags,
  onNavigate,
  activeStage,
}: {
  stages: StageDef[];
  currentStage: number;
  flags: SpineFlags;
  onNavigate: (index1: number) => void;
  activeStage?: number;
}) {
  return (
    <nav className="mode-console h-full overflow-y-auto border-r border-border px-2 py-4 text-[13px]">
      {BANDS.map((band) => {
        const inBand = stages
          .map((s, i) => ({ s, i: i + 1 }))
          .filter(({ i }) => i >= band.range[0] && i <= band.range[1]);
        if (!inBand.length) return null;
        return (
          <div key={band.label} className="mb-4">
            <p className="rule-label px-2 pb-1.5 pt-3 !text-[10px] text-muted-foreground/70">{band.label}</p>
            <div className="relative ml-3 border-l border-border pl-3">
              {inBand.map(({ s, i }) => {
                const state = stateFor(i, currentStage);
                const awaiting = flags.awaitingStages.has(i);
                const flagged = flags.injectionStages.has(i);
                const rolledBack = flags.rollbackStages.has(i);
                const isActive = activeStage === i;

                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => onNavigate(i)}
                    className={cn(
                      "group relative mb-0.5 flex w-full items-start gap-2 rounded-sm px-2 py-1.5 text-left transition-colors hover:bg-white/5",
                      isActive && "bg-white/10",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[9px] leading-none",
                        state === "done" && "border-[var(--signal-green)] bg-[var(--signal-green)] text-[var(--ink-900,#14171C)]",
                        state === "running" && "spine-pulse border-[var(--trace-blue)] bg-[var(--trace-blue)]/40",
                        state === "pending" && "border-muted-foreground/40 bg-transparent",
                        awaiting && "border-[var(--flag-amber)] bg-[var(--flag-amber)]",
                        rolledBack && "border-[var(--signal-red)]",
                      )}
                      aria-hidden
                    >
                      {state === "done" && !awaiting ? "✓" : ""}
                      {awaiting ? "✋" : ""}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate",
                          state === "pending" ? "text-muted-foreground" : "text-foreground",
                          awaiting && "font-medium text-[var(--flag-amber)]",
                        )}
                      >
                        {s.name}
                      </span>
                      {(flagged || rolledBack) && (
                        <span className="mt-0.5 flex gap-1">
                          {flagged && (
                            <span className="rounded-sm border border-[var(--flag-amber)]/50 px-1 text-[9px] text-[var(--flag-amber)]">
                              ⚠ injection logged
                            </span>
                          )}
                          {rolledBack && (
                            <span className="rounded-sm border border-[var(--signal-red)]/50 px-1 text-[9px] text-[var(--signal-red)]">
                              ↺ rollback
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
