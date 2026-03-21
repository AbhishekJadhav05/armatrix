"use client";

export default function LoadingGrid(): JSX.Element {
  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "clamp(64px, 8vw, 120px) clamp(16px, 4vw, 64px) 0",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--bg-border)",
            }}
          >
            {/* Photo skeleton */}
            <div className="skeleton" style={{ height: "260px", width: "100%" }} />
            {/* Content area */}
            <div style={{ padding: "16px" }}>
              {/* Dept tag */}
              <div
                className="skeleton"
                style={{ width: "60px", height: "10px" }}
              />
              {/* Name */}
              <div
                className="skeleton"
                style={{ width: "140px", height: "20px", marginTop: "8px" }}
              />
              {/* Role */}
              <div
                className="skeleton"
                style={{ width: "100px", height: "12px", marginTop: "6px" }}
              />
              {/* Bio lines */}
              <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div className="skeleton" style={{ width: "100%", height: "10px" }} />
                <div className="skeleton" style={{ width: "100%", height: "10px" }} />
                <div className="skeleton" style={{ width: "70%", height: "10px" }} />
              </div>
              {/* Skills */}
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  marginTop: "12px",
                }}
              >
                <div className="skeleton" style={{ width: "60px", height: "20px" }} />
                <div className="skeleton" style={{ width: "60px", height: "20px" }} />
                <div className="skeleton" style={{ width: "60px", height: "20px" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
