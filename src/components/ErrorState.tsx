"use client";

interface ErrorStateProps {
  message: string;
  onRetry: () => Promise<void>;
}

export default function ErrorState({
  message,
  onRetry,
}: ErrorStateProps): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--accent)",
          marginBottom: "16px",
        }}
      >
        / ERROR
      </span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          maxWidth: "400px",
          marginBottom: "24px",
        }}
      >
        {message}
      </p>
      <button
        onClick={() => void onRetry()}
        style={{
          border: "1px solid var(--bg-border)",
          background: "transparent",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "8px 20px",
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.color = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--bg-border)";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        Retry
      </button>
    </div>
  );
}
