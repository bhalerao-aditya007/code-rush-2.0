import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TONE_BORDER, TONE_TEXT, type Tone } from "./tone";

type Mode = "console" | "paper" | "inherit";

const modeClass: Record<Mode, string> = {
  console: "mode-console",
  paper: "mode-paper",
  inherit: "",
};

export function StageCard({
  index,
  title,
  blurb,
  gate,
  guard,
  active,
  mode = "paper",
  children,
  actions,
}: {
  index: number;
  title: string;
  blurb: string;
  gate?: boolean | undefined;
  guard?: boolean | undefined;
  active?: boolean | undefined;
  mode?: Mode;
  children?: ReactNode | undefined;
  actions?: ReactNode | undefined;
}) {
  return (
    <section
      id={`stage-${index}`}
      className={cn(
        modeClass[mode],
        "paper scroll-mt-24 p-6",
        active && "shadow-[var(--shadow-lift)] ring-1 ring-primary/40",
      )}
    >
      <div className="flex flex-wrap items-start gap-3">
        <span className="font-[family-name:var(--font-mono)] text-xs text-muted-foreground">
          {String(index).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl leading-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{blurb}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {gate && <Chip tone="signal-green">Human gate</Chip>}
          {guard && <Chip tone="flag">Guardrail</Chip>}
        </div>
      </div>
      {children && <div className="mt-5">{children}</div>}
      {actions && <div className="mt-5 flex flex-wrap gap-2">{actions}</div>}
    </section>
  );
}

export function Chip({ children, tone = "muted" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em]",
        TONE_BORDER[tone],
        TONE_TEXT[tone],
      )}
    >
      {children}
    </span>
  );
}

export function Mono({ children }: { children: ReactNode }) {
  return (
    <pre className="max-h-[420px] overflow-auto rounded-sm border border-border bg-secondary/60 p-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed whitespace-pre-wrap">
      {children}
    </pre>
  );
}

export function Prose({ text }: { text: string }) {
  return (
    <div className="read-serif max-h-[420px] overflow-auto text-sm whitespace-pre-wrap text-foreground/90">
      {text}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground italic">{children}</p>;
}

/** Small provenance pill — source, retrieval method, a confidence-ish signal. */
export function ProvenanceChip({
  label,
  detail,
}: {
  label: string;
  detail?: string;
}) {
  return (
    <span
      title={detail}
      className="inline-flex max-w-[220px] items-center gap-1 truncate rounded-sm border border-[var(--provenance-violet)]/40 bg-[var(--provenance-violet)]/10 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--provenance-violet)]"
    >
      {label}
    </span>
  );
}

export function QuarantineCard({ children }: { children: ReactNode }) {
  return (
    <div className="quarantine-card flag-pulse-once px-3 py-2 text-xs">
      <div className="mb-1 flex items-center gap-1.5 text-[var(--flag-amber)]">
        <span aria-hidden>🛡</span>
        <span className="rule-label !text-[var(--flag-amber)]">Detected inside source — not executed</span>
      </div>
      {children}
    </div>
  );
}
