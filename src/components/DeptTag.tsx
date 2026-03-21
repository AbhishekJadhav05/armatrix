"use client";

import { DEPT_COLORS } from "_constants/ui";
import type { Department } from "_enums/department";

interface DeptTagProps {
  department: Department;
}

export default function DeptTag({ department }: DeptTagProps): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "6px",
        alignItems: "center",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: DEPT_COLORS[department],
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
          letterSpacing: "0.05em",
        }}
      >
        {department}
      </span>
    </div>
  );
}
