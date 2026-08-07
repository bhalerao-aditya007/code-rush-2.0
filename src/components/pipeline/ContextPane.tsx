import { useState } from "react";
import { Empty, ProvenanceChip, QuarantineCard } from "./primitives";

type Tab = "reasoning" | "sources" | "safety";

type LogRow = {
  id: string;
  created_at: string;
  actor: string;
  stage: number | null;
  event: string;
  severity: string;
};

type SourceRow = {
  id: string;
  title: string;
  retrieval_method: string;
  injection_flag: boolean;
  injection_detail: string | null;
};

export function ContextPane({
  logs,
  sources,
  currentStage,
}: {
  logs: LogRow[];
  sources: SourceRow[];
  currentStage: number;
}) {
  const [tab, setTab] = useState<Tab>("safety");
  const flaggedSources = sources.filter((s) => s.injection_flag);
  const stageReasoning = logs.filter((l) => l.stage === currentStage).slice(0, 12);

  return (
    <aside className="mode-console flex h-full flex-col border-l border-border">
      <div className="flex border-b border-border font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em]">
        {(["reasoning", "sources", "safety"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 px-3 py-2.5 transition-colors ${
              tab === t ? "border-b-2 border-[var(--trace-blue)] text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3 text-xs">
        {tab === "reasoning" &&
          (stageReasoning.length === 0 ? (
            <Empty>No agent activity logged for this stage yet.</Empty>
          ) : (
            stageReasoning.map((l) => (
              <div key={l.id} className="border-l-2 border-[var(--trace-blue)]/40 pl-2">
                <p className="font-[family-name:var(--font-mono)] text-[10px] text-muted-foreground">
                  {new Date(l.created_at).toLocaleTimeString()} · {l.actor}
                </p>
                <p className="leading-snug">{l.event}</p>
              </div>
            ))
          ))}

        {tab === "sources" &&
          (sources.length === 0 ? (
            <Empty>No sources retrieved yet.</Empty>
          ) : (
            sources.slice(0, 40).map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-2 rounded-sm border border-border px-2 py-1.5">
                <span className="truncate text-foreground/90">{s.title}</span>
                <ProvenanceChip label={s.retrieval_method} />
              </div>
            ))
          ))}

        {tab === "safety" && (
          <>
            <p className="rule-label !text-[10px]">Injection attempts</p>
            {flaggedSources.length === 0 ? (
              <Empty>None detected. Every retrieved source is still treated as untrusted data.</Empty>
            ) : (
              flaggedSources.map((s) => (
                <QuarantineCard key={s.id}>
                  <p className="font-medium text-foreground/90">{s.title.slice(0, 80)}</p>
                  <p className="mt-1 text-[var(--flag-amber)]/90">{s.injection_detail}</p>
                </QuarantineCard>
              ))
            )}
            <p className="rule-label mt-4 !text-[10px]">Recent events</p>
            {logs
              .filter((l) => l.severity === "gate" || l.severity === "warn" || l.severity === "error")
              .slice(0, 15)
              .map((l) => (
                <div
                  key={l.id}
                  className={`border-l-2 pl-2 ${
                    l.severity === "gate"
                      ? "border-[var(--signal-green)]"
                      : l.severity === "error"
                        ? "border-[var(--signal-red)]"
                        : "border-[var(--flag-amber)]"
                  }`}
                >
                  <p className="font-[family-name:var(--font-mono)] text-[10px] text-muted-foreground">
                    {new Date(l.created_at).toLocaleTimeString()} · stage {l.stage}
                  </p>
                  <p className="leading-snug">{l.event}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </aside>
  );
}
