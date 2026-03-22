"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
      <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
        {!confirming ? (
          <>
            <button
              onClick={() => onEdit(member)}
              aria-label="Edit member"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "color 0.2s",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => setConfirming(true)}
              aria-label="Delete member"
              style={{
                background: "transparent",
                border: "none",
                color: "#FF4747",
                cursor: "pointer",
                transition: "opacity 0.2s",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <Trash2 size={14} />
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
