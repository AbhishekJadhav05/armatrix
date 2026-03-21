"use client";

interface SkillPillProps {
  label: string;
}

export default function SkillPill({ label }: SkillPillProps): JSX.Element {
  return (
    <span
      style={{
        border: "1px solid var(--bg-border)",
        background: "var(--bg-primary)",
        padding: "2px 8px",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
