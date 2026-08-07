export type Tone = "muted" | "trace" | "flag" | "signal-green" | "signal-red" | "provenance";

export const TONE_TEXT: Record<Tone, string> = {
  muted: "text-muted-foreground",
  trace: "text-[var(--trace-blue)]",
  flag: "text-[var(--flag-amber)]",
  "signal-green": "text-[var(--signal-green)]",
  "signal-red": "text-[var(--signal-red)]",
  provenance: "text-[var(--provenance-violet)]",
};

export const TONE_BORDER: Record<Tone, string> = {
  muted: "border-border",
  trace: "border-[color-mix(in_oklab,var(--trace-blue)_45%,transparent)]",
  flag: "border-[color-mix(in_oklab,var(--flag-amber)_45%,transparent)]",
  "signal-green": "border-[color-mix(in_oklab,var(--signal-green)_45%,transparent)]",
  "signal-red": "border-[color-mix(in_oklab,var(--signal-red)_45%,transparent)]",
  provenance: "border-[color-mix(in_oklab,var(--provenance-violet)_45%,transparent)]",
};
