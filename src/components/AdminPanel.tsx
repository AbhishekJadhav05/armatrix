"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import MemberListItem from "_components/MemberListItem";
import MemberForm from "_components/MemberForm";
import type {
  TeamMember,
  TeamMemberCreate,
  TeamMemberUpdate,
  AdminView,
} from "_types/team";

interface AdminPanelProps {
  isOpen: boolean;
  members: TeamMember[];
  onClose: () => void;
  onAdd: (data: TeamMemberCreate) => Promise<void>;
  onEdit: (id: string, data: TeamMemberUpdate) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function AdminPanel({
  isOpen,
  members,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}: AdminPanelProps): JSX.Element | null {
  const [view, setView] = useState<AdminView>("list");

  if (!isOpen) return null;

  const handleAdd = async (data: TeamMemberCreate): Promise<void> => {
    await onAdd(data);
    setView("list");
  };

  const handleEdit = async (data: TeamMemberCreate): Promise<void> => {
    if (typeof view === "object" && "editing" in view) {
      await onEdit(view.editing.id, data);
      setView("list");
    }
  };

  const handleDelete = (id: string): void => {
    void onDelete(id);
  };

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "400px",
        maxWidth: "100vw",
        background: "var(--bg-elevated)",
        borderLeft: "1px solid var(--bg-border)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: "1px solid var(--bg-border)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--accent)",
          }}
        >
          / ADMIN
        </span>
        <button
          onClick={onClose}
          aria-label="Close admin panel"
          style={{
            background: "transparent",
            border: "none",
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
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 20px",
        }}
      >
        {view === "list" && (
          <>
            {members.map((m) => (
              <MemberListItem
                key={m.id}
                member={m}
                onEdit={(member) => setView({ editing: member })}
                onDelete={handleDelete}
              />
            ))}
            <button
              onClick={() => setView("add")}
              style={{
                width: "100%",
                marginTop: "16px",
                padding: "10px",
                background: "transparent",
                border: "1px solid var(--bg-border)",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--bg-border)";
              }}
            >
              + ADD MEMBER
            </button>
          </>
        )}

        {view === "add" && (
          <MemberForm
            mode="add"
            onSubmit={handleAdd}
            onCancel={() => setView("list")}
          />
        )}

        {typeof view === "object" && "editing" in view && (
          <MemberForm
            mode="edit"
            initial={view.editing}
            onSubmit={handleEdit}
            onCancel={() => setView("list")}
          />
        )}
      </div>
    </motion.div>
  );
}
