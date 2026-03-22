"use client";

import { useState } from "react";
import { UserCog } from "lucide-react";

interface NavbarProps {
  onAdminToggle: () => void;
}

export default function Navbar({ onAdminToggle }: NavbarProps): JSX.Element {
  const [isAdminHovered, setIsAdminHovered] = useState(false);

  return (
    <nav className="sticky top-0 w-full h-[56px] z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#242424] flex justify-between items-center px-6">
      <a
        href="https://armatrix.in"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-extrabold tracking-tighter text-white font-syne uppercase no-underline hover:text-primary transition-colors duration-200"
        style={{ textDecoration: "none" }}
      >
        ARMATRIX
      </a>

      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {/* Admin Toggle */}
        <button
          onClick={onAdminToggle}
          onMouseEnter={() => setIsAdminHovered(true)}
          onMouseLeave={() => setIsAdminHovered(false)}
          className="flex items-center gap-2"
          style={{
            background: "transparent",
            border: "none",
            color: isAdminHovered ? "var(--accent)" : "var(--text-muted)",
            transition: "color 0.2s",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            padding: 0,
          }}
          aria-label="Toggle Admin Panel"
        >
          <UserCog size={16} />
          <span className="hidden sm:inline">Admin</span>
        </button>
      </div>
    </nav>
  );
}
