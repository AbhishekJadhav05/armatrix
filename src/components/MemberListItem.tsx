"use client";

import { useState } from "react";
import type { TeamMember } from "_types/team";

interface MemberListItemProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

export default function MemberListItem({
  member,
  onEdit,
  onDelete,
}: MemberListItemProps): JSX.Element {
  const [confirming, setConfirming] = useState<boolean>(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--bg-border)",
        padding: "10px 0",
        gap: "8px",
      }}
    >
      {/* Name / role block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {member.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {member.role}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        {!confirming ? (
          <>
            <button
              onClick={() => onEdit(member)}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Edit
            </button>
            <button
              onClick={() => setConfirming(true)}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FF4747";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
              }}
            >
              Sure?
            </span>
            <button
              onClick={() => {
                onDelete(member.id);
                setConfirming(false);
              }}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "#FF4747",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setConfirming(false)}
              style={{
                background: "transparent",
                border: "none",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </>
        )}
      </div>
    </div>
  );
}
