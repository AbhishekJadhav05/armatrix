"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, Linkedin, Github } from "lucide-react";
import DeptTag from "_components/DeptTag";
import SkillPill from "_components/SkillPill";
import { formatJoinedDate } from "_utils/format";
import type { TeamMember } from "_types/team";

interface MemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function MemberModal({
  member,
  onClose,
}: MemberModalProps): JSX.Element | null {
  // Escape key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--bg-border)",
          maxWidth: "720px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
        }}
        className="modal-panel"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            zIndex: 2,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          <X size={20} />
        </button>

        {/* Left photo */}
        <div
          style={{ position: "relative", minHeight: "400px" }}
          className="modal-photo"
        >
          <Image
            src={member.photo_url}
            alt={member.name}
            fill
            sizes="260px"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right content */}
        <div style={{ padding: "28px" }} className="modal-content">
          <DeptTag department={member.department} />

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "28px",
              marginTop: "12px",
              marginBottom: "0",
              letterSpacing: "-0.02em",
            }}
          >
            {member.name}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "12px",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginTop: "4px",
              marginBottom: "0",
            }}
          >
            {member.role}
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              marginTop: "4px",
              marginBottom: "0",
            }}
          >
            Joined {formatJoinedDate(member.joined_date)}
          </p>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--bg-border)",
              margin: "16px 0",
            }}
          />

          {/* Bio */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "14px",
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              margin: 0,
            }}
          >
            {member.bio}
          </p>

          {/* Skills grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px",
              marginTop: "16px",
            }}
          >
            {member.skills.map((skill) => (
              <SkillPill key={skill} label={skill} />
            ))}
          </div>

          {/* Fun fact */}
          {member.fun_fact && (
            <div style={{ marginTop: "20px" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                }}
              >
                / FUN FACT
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginTop: "6px",
                  marginBottom: "0",
                }}
              >
                {member.fun_fact}
              </p>
            </div>
          )}

          {/* Social links */}
          <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-muted)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <Linkedin size={18} />
              </a>
            )}
            {member.github_url && (
              <a
                href={member.github_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-muted)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile override styles */}
      <style jsx global>{`
        @media (max-width: 640px) {
          .modal-panel {
            grid-template-columns: 1fr !important;
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            max-width: 100% !important;
            max-height: 85vh !important;
            border-bottom: none !important;
          }
          .modal-photo {
            height: 200px !important;
            min-height: 200px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
